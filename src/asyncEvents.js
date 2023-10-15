import { Queue } from '@forge/events';
import Resolver from "@forge/resolver";
import { storage } from "@forge/api";
import Utils from './utils';
import { encode } from 'gpt-tokenizer'
import OpenAiUtil from "./openAiUtil";

export const testQueue1 = new Queue({ key: 'aiJobQueueJob1' });
export const testQueue2 = new Queue({ key: 'aiJobQueueJob2' });
export const testQueue3 = new Queue({ key: 'aiJobQueueJob3' });


const asyncResolver = new Resolver();

asyncResolver.define("job-event-listener1", async (queueItem) => {
  console.log("job1 : tokenized confluence")
  
  let dataToset = queueItem.payload.value;
  if(!dataToset){
    console.log("job1 error - dataToset null");
    return 0;
  }
  let utils = new Utils()
  let confluencePageBody = await utils.getConfluenceBody(dataToset['confluence']['id'],true);
  let tokenizedPrompt =  utils.getLlamaTokenizePrompt(confluencePageBody['raw']);

  console.log(`tokenize >> ${tokenizedPrompt}`);

  let ai_response = null;
  if(utils.USE_MOCK_AI){
      ai_response = `START\n this is tokenized text > \n${confluencePageBody['raw']} \nEND`
  }else{
    // openai api get key in openai utils
    let openai_response = await OpenAiUtil.postChatCompletion(tokenizedPrompt)
    
    if(openai_response.status==-1){
      console.log(`error openAI ${openai_response.message}`)
      return 0;
    }
    ai_response = openai_response.message;
    console.log(`openai response >> ${ai_response}`)
  }

  // startend
  ai_response = utils.getTextBetweenStartEnd(ai_response);
  console.log(`job-1 : token count - ${encode(ai_response).length}`)
  
  let storageDataArrTokenize = await storage.get(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY);

  if(!storageDataArrTokenize){
    storageDataArrTokenize = [];
  }

  dataToset['confluence_token'] = ai_response;
  storageDataArrTokenize.push(dataToset);
  
  await storage.set(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY, storageDataArrTokenize);

  return 1;
  
});

asyncResolver.define("job-event-listener2", async (queueItem) => {
  console.log("asyncResovler working.. job2")
  let issueDetails = queueItem.payload.value;

  let days = {
    "0": {
      "day_name": "Sunday",
      "day": "sun"
    },
    "1": {
      "day_name": "Monday",
      "day": "mon"
    },
    "2": {
      "day_name": "Tuesday",
      "day": "tue"
    },
    "3": {
      "day_name": "Wednesday",
      "day": "wed"
    },
    "4": {
      "day_name": "Thursday",
      "day": "thu"
    },
    "5": {
      "day_name": "Friday",
      "day": "fri"
    },
    "6": {
      "day_name": "Saturday",
      "day": "sat"
    }
  }
  
  
  let utils = new Utils();
  // check holiday ocasional + weekly + comment
  let settingConfig = await storage.get(utils.STORAGE_SETTINGS_KEY);
  let ocasionHoliday = await storage.get(utils.STORAGE_HOLIDAYS_KEY);

  let settingHolidayWeekly = settingConfig['holidays']['weekly'];
  
  let todayDate = new Date(issueDetails['issue']['fields']['created']);
  let todayDateCode = todayDate.toLocaleDateString("en-US");
  let todayDay = days[`${todayDate.getDay()}`]['day']
  let todayDayFull = days[`${todayDate.getDay()}`]['day_name']
  
  let commentPrompt = null;
  
  if(ocasionHoliday.length && !commentPrompt){
    for(let i = 0 ; i<ocasionHoliday.length; i++){
      if(ocasionHoliday[i]['date_code']==todayDateCode){
        // get prompt
        commentPrompt = utils.getJiraCommentPrompt(issueDetails,ocasionHoliday[i]['holiday_name'],"ocasional")
        console.log(`today's ocasion holiday ${ocasionHoliday[i]['holiday_name']}`);
        break;
      }
    }
  }
  
  if(!commentPrompt && settingHolidayWeekly[todayDay]){
    // weekly holiday
    commentPrompt = utils.getJiraCommentPrompt(issueDetails,todayDayFull,"weekly")
    console.log(`today's weekly holiday ${todayDay}`);
    // get prompt
  }

  if(!commentPrompt){
    commentPrompt=utils.getJiraCommentPrompt(issueDetails);
  }

  console.log(`commentPrompt > ${commentPrompt}`)
  
  let ai_response = null;
  if(commentPrompt){
    if(utils.USE_MOCK_AI){
      ai_response = "asdf START\nthis is ai generated text response by chatGPT. regex \nEND"
    }
    else{
      // openai
      let openai_response = await OpenAiUtil.postChatCompletion(commentPrompt)
    
      if(openai_response.status==-1){
        console.log(`error openAI ${openai_response.message}`)
        return 0;
      }
      ai_response = openai_response.message;
      console.log(`openai response >> ${ai_response}`)
    }

    // startend regex
    ai_response = utils.getTextBetweenStartEnd(ai_response);
    let commentResponse = await utils.createIssueComment(issueDetails['issue']['key'],ai_response)
    console.log(`comment created ${commentResponse}`);
    return 1;
  }
  console.log("no comment created on issue")
  return 0;
  
});

asyncResolver.define("job-event-listener3", async (queueItem) => {
  console.log("asyncResovler working.. job3")
  let issueDetails = queueItem.payload.value;
  // check if jiraboards empty
  let utils = new Utils();
  let jiraboards = await storage.get(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY);
  
  if(jiraboards && issueDetails){
    let issueDescription = await utils.getJiraIssueBodyDescription(issueDetails['issue']['key'])

    let issueSummaryDescObj = {
      summary : issueDetails['issue']['fields']['summary'],
      description : issueDescription
    }

    let bugPrompt = utils.getBugTeamPrompt(issueSummaryDescObj, jiraboards);

    
    if(bugPrompt){
      let ai_response = null;
      
      if(utils.USE_MOCK_AI){
        ai_response = `team name is \nSTART\n${jiraboards[0]['team_name']}\nEND`;
        
      }
      else{
        // open ai    
        let openai_response = await OpenAiUtil.postChatCompletion(bugPrompt)
        if(openai_response.status==-1){
          console.log(`error openAI ${openai_response.message}`)
          return 0;
        }
        ai_response = openai_response.message;
        console.log(`openai response >> ${ai_response}`)
      }
      
      let teamName = utils.getTextBetweenStartEnd(ai_response);
      console.log(`teamname > ${teamName}`);
      
      let teamNameData = jiraboards.filter(e=> e['team_name']==teamName);
      if(teamNameData){
        let newJiraIssue = await utils.createJiraIssue(issueDetails,teamNameData[0]['jira']['location']['projectId'],teamNameData[0]['assignee']['accountId']);

        
        if(newJiraIssue && "key" in newJiraIssue){
            let jiraLink = await utils.createJiraIssueLink(issueDetails['issue']['key'],newJiraIssue['key'])

            if(jiraLink && "msg" in jiraLink && jiraLink['msg']=="linked"){
                console.log(`issueLinked ${issueDetails['issue']['key']} ${newJiraIssue['key']}`)
                console.log(`bug prompt > ${bugPrompt}`)
                
                return 1;
            }else{
              console.log("error : issue not linked")
            }
        }
        else{
          console.log(`error :newJiraIssue not created ${JSON.stringify(newJiraIssue)}`)
        }
      }
      
    }

  }else{
    console.log(`job3 no jiraboards added : ${jiraboards} or no issueDetails`)
  }

  return 1;
  
});

export const aiJobHandler = asyncResolver.getDefinitions();
