import Resolver from "@forge/resolver";
import { storage } from "@forge/api";
import { testQueue } from "./asyncEvents";

import api, { route } from "@forge/api";
import Utils from "./utils";

const STORAGE_SETTINGS_KEY = "settings";
const STORAGE_HOLIDAYS_KEY = "holidays";
const STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY = "jiraboards";

const DEFAULT_SETTING_CONFIG = {
  which_data: "setting-config",
  auto_ticket_locator: {
    auto_translate_english: true,
    jira_boards: "get from api 'getAiIssueLocator'"
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
      sun: false
    }
  },
  ai_greetings_message: {
    ai_greetings_on_issue_create: true,
    greet_in_local_language: true
  }
};


// event trigger
export async function run(event, context) {
  console.log("oncreate event triggered " + JSON.stringify(context));
  // console.log("oncreate event triggered " + JSON.stringify(event));

  console.log("start");
  let delayres = await  utils.delay(66*1000);
  console.log("done");
  

  // check holiday occasional from storage
  // check holiday weekly from setting
  // check if issue is bug (get issue details?)
  // create greet comment + holiday if it is.  do promise parallel calls for language detection > ai comment + issue locator

  // get prompt or get storage call for all confluence body tokenized
  // get jira board storage
  // assign ticket 
}
// end


const resolver = new Resolver();
const utils = new Utils();

resolver.define("devInvoke", async (req) => {
  // let a = utils.getConfluenceBody(33364)
  // let a = await utils.createJiraIssue(utils.MOCK_EVENT_ISSUE, "10001","6326e30c14c6b4b221099d1f")

  // let a = await utils.createJiraIssueLink("CS-1","JSC-5");
  // let a = await utils.createIssueComment("CS-2","comment from forge api...")
  let a = await utils.getConfluenceBody("1769492");

  // console.log(a);

  return a;
  return "🔴 Hello from the backend.";
});

// dev tools
resolver.define("getStorage", async (req) => {
  const key = req.payload.key;

  let job = testQueue.getJob(key)
  let jobStatus = await job.getStats()

  return {status : await jobStatus.json()}


  console.log(`getstorage ${key}`);

  // await storage.delete(key)
  // return {msg : "deleted"};

  const storageData = await storage.get(key);

  // console.log(storageData);

  if (typeof (storageData) == "object")
    return storageData;
  return { data: storageData ? storage != undefined : `key ${key} not present` };
});

resolver.define("setStorage", async (req) => {
  const key = req.payload.key;
  const value = req.payload.value;
  // console.log(key,value);
  const storageData = await storage.set(key, value);
  return { msg: "key set done" };
});
// dev tools end


resolver.define("getJiraBoards", async (req) => {
  let response = (await api.asApp().requestJira(route`/rest/agile/1.0/board`)).json();

  return response;
});

resolver.define("getConfluenceWikis", async (req) => {
  // let response = (await api.asApp().requestConfluence(route`/wiki/rest/api/content/`)).json();
  let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content`);


  return await response.json();
  return { msg: "response" };
});

resolver.define("setSettings", async (req) => {
  // set and check for confluence page change along with
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
  // let dataToset = req.payload.value;
  let dataToset = utils.MOCK_AI_LOCATOR;
  

  const storageDataArr = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
  storageDataArr.push(dataToset);
  await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, storageDataArr);

  

  let confluencePageBody = await utils.getConfluenceBody(dataToset['confluence']['id'])
  // job-setAiIssueLocator - tokenize body + dataToset as it is + storage
  // let tokenizedPrompt =  utils.getLlamaTokenizePrompt(confluencePageBody['raw']);
  // console.log(`prompt ${tokenizedPrompt}`);

  let payload = {msg:"this is the payload for queue",time : (new Date()).toString()}


  let PushSettings = { delayInSeconds: 1 }
  const jobId = await testQueue.push(payload,PushSettings);

// Get the JobProgress object
const jobProgress = testQueue.getJob(jobId);

// Get stats of a particular job
const response = await jobProgress.getStats();
const res = await response.json();
  return {msg:"running job in background",res:res, jobId : jobId};
  
  // save new prompt in diff key
});



resolver.define("getAiIssueLocator", async (req) => {
  const storageData = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, []);
    return [];
  }
  return storageData;
});

resolver.define("setHolidays", async (req) => {
  // set in diff storage key
  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  storageData.push(req.payload.value);
});

resolver.define("getHolidays", async (req) => {
  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_HOLIDAYS_KEY, []);
    return [];
  }
  return storageData;
});

resolver.define("getUsers", async (req) => {
  let users = await utils.getUsers();
  return users;
});

resolver.define("createConfluenceTeamTemplate", async (req) => {
  let bodyData = utils.DEFAULT_CONFLUENCE_TEAM_DESC_TEMPLATE;
  let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }
  );

  return await response.json();
  return { msg: "response" };
});



export const handler = resolver.getDefinitions();
