import Resolver from "@forge/resolver";
import { storage } from "@forge/api";
import { testQueue1, testQueue2, testQueue3 } from './asyncEvents';

import api, { route } from "@forge/api";
import Utils from "./utils";

const STORAGE_SETTINGS_KEY = "settings";
const STORAGE_HOLIDAYS_KEY = "holidays";
const STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY = "jiraboards";

const DEFAULT_SETTING_CONFIG = {
  which_data: "setting-config",
  auto_ticket_locator: {
    auto_translate_english: true,
    jira_boards: "get from api 'getAiIssueLocator'",
  },
  holidays: {
    occasional: "get from api 'getHolidays'",
    weekly: {
      mon: false,
      tue: false,
      wed: false,
      thr: false,
      fri: false,
      sat: false,
      sun: false,
    },
  },
  ai_greetings_message: {
    ai_greetings_on_issue_create: true,
    greet_in_local_language: true,
  },
};

function ensureArray  (arr)  {
  if(arr === ""){
    return [];
  }
  return Array.isArray(arr) ? arr : [arr];
};
// event trigger
export async function run(event, context) {
  console.log("oncreate event triggered " + JSON.stringify(context));
  // console.log("oncreate event triggered " + JSON.stringify(event));

  console.log("event : IssueCreate " + JSON.stringify(event));


  // check issue type??
  // check if issue is bug (get issue details?)

  if(event['issue']['project']['projectTypeKey']=="service_desk"){ 
    console.log("service_desk issue...")

    let job2 = await testQueue2.push({value:event})
    let job3 = await testQueue3.push({value:event})
    // check holiday weekly from setting
    
  }
  }
// end

const resolver = new Resolver();
const utils = new Utils();

// devTools
resolver.define("devInvoke", async (req) => {
  let func = req.payload.func;
  let key = req.payload.key;

  if (func == "del") {
    await storage.delete(key);
    return { msg: `deleted ${key}` };
  }
  else if (func == "get") {
    let storageItem = await storage.get(key);
    return { data: storageItem };
  }
  else if (func == "set") {
    let value = req.payload.value;
    await storage.set(key, value);
    return { msg: `stored at ${key}` };
  }
  else {
    // other function 
    // let job1 = await testQueue1.push("ok");
    let issue = {
      "issue": {
          "id": "10024",
          "key": "CS-14",
          "fields": {
              "summary": "title 1",
              "issuetype": {
                  "self": "https://nuvs.atlassian.net/rest/api/2/issuetype/10003",
                  "id": "10003",
                  "description": "For customer support issues. Created by Jira Service Desk.",
                  "iconUrl": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10553?size=medium",
                  "name": "Support",
                  "subtask": false,
                  "avatarId": 10553,
                  "hierarchyLevel": 0
              },
              "creator": {
                  "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
              },
              "created": "2023-10-12T21:04:30.248+0530",
              "project": {
                  "self": "https://nuvs.atlassian.net/rest/api/2/project/10000",
                  "id": "10000",
                  "key": "CS",
                  "name": "Customer SM",
                  "projectTypeKey": "service_desk",
                  "simplified": false,
                  "avatarUrls": {
                      "48x48": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415",
                      "24x24": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=small",
                      "16x16": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=xsmall",
                      "32x32": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=medium"
                  }
              },
              "reporter": {
                  "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
              },
              "assignee": null,
              "updated": "2023-10-12T21:04:30.248+0530",
              "status": {
                  "self": "https://nuvs.atlassian.net/rest/api/2/status/10000",
                  "description": "This was auto-generated by Jira Service Management during workflow import",
                  "iconUrl": "https://nuvs.atlassian.net/images/icons/status_generic.gif",
                  "name": "Waiting for support",
                  "id": "10000",
                  "statusCategory": {
                      "self": "https://nuvs.atlassian.net/rest/api/2/statuscategory/4",
                      "id": 4,
                      "key": "indeterminate",
                      "colorName": "yellow",
                      "name": "In Progress"
                  }
              }
          }
      },
      "atlassianId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a",
      "encryptedIpAddress": "AYABePzs1gTyyFSURffumImrpgsAAAADAAdhd3Mta21zAEthcm46YXdzOmttczp1cy13ZXN0LTI6NzA5NTg3ODM1MjQzOmtleS85N2Q0MGZlYy1kOTk3LTQxNGItOWM5Yy0wOTM1MzEzMTY1YmQAuAECA",
      "associatedUsers": [
          {
              "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
          }
      ],
      "encryptedUserAgent": "AYABeBBUNeeEyWSy+ySq2ziTetUAAAADAAdhd3Mta21zAEthcm46YXdzOmttczp1cy13ZXN0LTI6NzA5NTg3ODM1MjQzOmtleS85N2Q0MGZlYy1kOTk3LTQxNGItOWM5Yy0wOTM1MzEzMTY1YmQAuAECAgB4n4mTjS7/qqkslBfvskhZL5z4f2HmkUUfSbTHmRf1PlEqP",
      "eventType": "avi:jira:created:issue",
      "selfGenerated": false,
      "context": {
          "cloudId": "e894bd1b-eba9-4e06-adff-f0985bd90e2f",
          "moduleKey": "event-trigger"
      },
      "contextToken": "P7sc2D9DB8DvvKdhM5TpfGVeuFzTAQTtsBriY-BTuPxEwQe3WtZlmseLro8M7FemA3mi5OpFusSzakcckZMvDxEiRu1rDtbBsjDWXFeK4kixsdL9CiSlOEKwBux3I-38Oto09gaG_BawknKWUJzj_Q"
  }
    // let job2 = await testQueue2.push({value: issue})
    // let jobProgress = await (await testQueue2.getJob(job2).getStats()).json()
    
    
    let job2 = await testQueue3.push({value: issue})
    let jobProgress = await (await testQueue3.getJob(job2).getStats()).json()

    return {msg:"ok", job : jobProgress};
  }

});
//  devTools end

resolver.define("getJiraBoards", async (req) => {
  let response = (
    await api.asApp().requestJira(route`/rest/agile/1.0/board`)
  ).json();

  return response;
});

resolver.define("getConfluenceWikis", async (req) => {

  let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content`);

  return await response.json();
  return { msg: "response" };
});

resolver.define("setSettings", async (req) => {
  let dataToset = req.payload.value;
  await storage.set(STORAGE_SETTINGS_KEY, dataToset);
  return 1;
});

resolver.define("getSettings", async (req) => {
  console.log("getSettings");
  const storageData = await storage.get(STORAGE_SETTINGS_KEY);

  if (storageData == undefined) {
    await storage.set(STORAGE_SETTINGS_KEY, DEFAULT_SETTING_CONFIG);

    return DEFAULT_SETTING_CONFIG;
  }

  return storageData;
});

resolver.define("setAiIssueLocator", async (req) => {
  // set in diff storage key
  // {value : payloadVal}
  let dataToset = null;
  if ("mock" in req.payload.value) {
    dataToset = utils.MOCK_AI_LOCATOR;
    console.log("using mock data..");
  } else {
    dataToset = req.payload.value;
  }

  try {
    if(dataToset && "confluence" in dataToset){

      const storageDataArr = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
      
      storageDataArr.push(dataToset);
      await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, storageDataArr);
      
      await testQueue1.push({ value: dataToset });
      return { msg: 1 };
    }
    return {msg : "datatoset null"}
  }
  catch (err) {
    console.log(`error setAiIssueLocator ${err}`);
    return { error: err };
  }

});

resolver.define("getAiIssueLocator", async (req) => {
  const storageData = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, []);
    await storage.set(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY, []);
    return [];
  }
  return storageData;
});


resolver.define("deleteAiIssueLocator", async () => {
  await storage.delete(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
  return true;
}
resolver.define("setHolidays", async (req) => {
  // set in diff storage key
  
  // return {con: req.context, pay : req.payload, req:req}
  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  let holidayObj = req.payload.value;
  
  let date_ = new Date(holidayObj['date']);
  holidayObj['date_code'] = date_.toLocaleDateString("en-US");
  await storageData.push(holidayObj);

  return holidayObj;
});

resolver.define("getHolidays", async (req) => {
  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_HOLIDAYS_KEY, []);
    return [];
  }
  return storageData;
});


resolver.define("setHolidays", async (req) => {
  // set in diff storage key
  const storageData = ensureArray(await storage.get(STORAGE_HOLIDAYS_KEY));
  let holidayObj = req.payload.value;

  let date_ = new Date(holidayObj["date"]);
  holidayObj["date_code"] = date_.toLocaleDateString("en-US");
  await storageData.push(holidayObj);
  await storage.set(STORAGE_HOLIDAYS_KEY, storageData);
  return holidayObj;
});

resolver.define("deleteHolidays", async () => {
  await storage.delete(STORAGE_HOLIDAYS_KEY);
  return true;
});

resolver.define("getUsers", async (req) => {
  let users = await utils.getUsers();
  return users;
});

resolver.define("createConfluenceTeamTemplate", async (req) => {
  let bodyData = utils.DEFAULT_CONFLUENCE_TEAM_DESC_TEMPLATE;
  let response = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

  return await response.json();
  return { msg: "response" };
});


resolver.define("setOpenAi",async (req)=>{
  await storage.setSecret(utils.STORAGE_OPENAI_KEY,req.payload.value);

  return {exists: true};
})

resolver.define("checkOpenAi",async (req)=>{
  let key = await storage.getSecret(utils.STORAGE_OPENAI_KEY);
  if(key){
    return {exists: true}
  }
  return {exists : false}
})



export const handler = resolver.getDefinitions();
