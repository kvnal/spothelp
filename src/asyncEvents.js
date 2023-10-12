import { Queue } from '@forge/events';
import Resolver from "@forge/resolver";
import { storage } from "@forge/api";
import Utils from './utils';
import { encode } from 'gpt-tokenizer'

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

  // console.log(`tokenize >> ${tokenizedPrompt}`);

  let ai_response = null;
  if(utils.USE_MOCK_AI){
      ai_response = `START\n this is tokenized text > \n${confluencePageBody['raw']} \nEND`
  }else{
    // openai api get key in openai utils
  }

  // startend
  ai_response = utils.getTextBetweenStartEnd(ai_response);
  console.log(`job-1 : token count - ${encode(ai_response).length}`)
  
  let storageDataArrTokenize = await storage.get(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY);

  dataToset['confluence_token'] = ai_response;
  storageDataArrTokenize.push(dataToset);
  
  await storage.set(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY, storageDataArrTokenize);

  return 1;
  
});

asyncResolver.define("job-event-listener2", async (queueItem) => {
  console.log("asyncResovler working.. job2")
  let issueDetails = queueItem.payload.value;

  let days = ['sun','mon','tue','wed','thr', 'fri','sat']
  
  let utils = new Utils();
  // check holiday ocasional + weekly + comment
  let settingConfig = await storage.get(utils.STORAGE_SETTINGS_KEY);
  let ocasionHoliday = await storage.get(utils.STORAGE_HOLIDAYS_KEY);

  let settingHolidayWeekly = settingConfig['holidays']['weekly'];
  
  let todayDate = new Date();
  let todayDateCode = todayDate.toLocaleDateString("en-US");
  let todayDay = days[todayDate.getDay()]

  let commentPrompt = null;

  if(ocasionHoliday.length){
    for(let i = 0 ; i<ocasionHoliday.length; i++){
      if(ocasionHoliday[i]['date']==todayDateCode){
        // get prompt
        
        console.log(`today's ocasion holiday ${ocasionHoliday[i]['holiday_name']}`);
        break;
      }
    }
  }
  else if(settingHolidayWeekly[todayDay]){
    // weekly holiday
    console.log(`today's weekly holiday ${settingHolidayWeekly[todayDay]}`);
    // get prompt
  }
  else{
    commentPrompt=utils.getJiraCommentPrompt(issueDetails);
  }

  let ai_response = null;
  if(commentPrompt){
    console.log(`commentPrompt > ${commentPrompt}`);
    if(utils.USE_MOCK_AI){
      ai_response = "asdf START\nthis is ai generated text response by chatGPT. regex \nEND"
    }
    else{
      // openai
    }

    // startend regex
    ai_response = utils.getTextBetweenStartEnd(ai_response);
    let commentResponse = await utils.createIssueComment(issueDetails['issue']['key'],ai_response)
    
    return 1;
  }
  return 0;
  
});

asyncResolver.define("job-event-listener3", async (queueItem) => {
  console.log("asyncResovler working.. job3")
  // check if jiraboards empty
  return 1;
  
});

export const aiJobHandler = asyncResolver.getDefinitions();
