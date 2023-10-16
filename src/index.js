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
  console.log("event : IssueCreate " );
  
  if (event['issue']['fields']['project']['projectTypeKey'] == "service_desk") {
    
    console.log("service_desk issue...");
    
    let openAikey = await storage.getSecret(utils.STORAGE_OPENAI_KEY);
    if(!openAikey && !utils.USE_MOCK_AI){
      console.log(`openAi key not found.`)
      return;
    }
    
    let processOnlyRequestType = ["Report a bug","Technical support"]
  
    let jiraIssue = await utils.getJiraIssue(event['issue']['key']);
    let eventReqType = jiraIssue['fields']['customfield_10010']['requestType']['name']
  
    if(jiraIssue && eventReqType && processOnlyRequestType.includes(eventReqType)){
      
      console.log(`JSM request type : ok`)

      let job2 = await testQueue2.push({ value: event });
      let job3 = await testQueue3.push({ value: event });

    }else{
      console.log(`JSM request type not in ${processOnlyRequestType}`)
    }
    return 1;

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
    await storage.deleteSecret(key);
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

    return await utils.deleteAllStorageKeys();
    // let job1 = await testQueue1.push("ok");
    // let job2 = await testQueue2.push({value: issue})
    // let jobProgress = await (await testQueue2.getJob(job2).getStats()).json()


    // let job2 = await testQueue3.push({ value: issue });
    // let jobProgress = await (await testQueue3.getJob(job2).getStats()).json();

    // return { msg: "ok", job: jobProgress };
  }

});
//  devTools end


resolver.define("getJiraBoards", async (req) => {
  console.log("getJiraBoards");
  let response = (await api.asApp().requestJira(route`/rest/agile/1.0/board`)).json();
  
  return response;
});

resolver.define("getConfluenceWikis", async (req) => {
  console.log("getConfluenceWikis");
  // let response = (await api.asApp().requestConfluence(route`/wiki/rest/api/content/`)).json();
  let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content?limit=50`);


  return await response.json();
  return { msg: "response" };
});

resolver.define("setSettings", async (req) => {
  console.log("setSettings");
  // set and check for confluence page change along with
  let newSettings = req.payload.value;
  await storage.set(STORAGE_SETTINGS_KEY,newSettings);
  return {msg : true}
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
  console.log("setAiIssueLocator");

  let dataToset = null;
  if ("mock" in req.payload.value) {
    dataToset = utils.MOCK_AI_LOCATOR;
    console.log("using mock data..");
  } else {
    dataToset = req.payload.value;
  }

  try {
    if (dataToset && "confluence" in dataToset) {

      const storageDataArr = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);

      storageDataArr.push(dataToset);
      await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, storageDataArr);

      await testQueue1.push({ value: dataToset });
      return { msg: 1 };
    }
    return { msg: "datatoset null" };
  }
  catch (err) {
    console.log(`error setAiIssueLocator ${err}`);
    return { error: err };
  }

});



resolver.define("getAiIssueLocator", async (req) => {
  console.log("getAiIssueLocator");

  const storageData = await storage.get(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_AUTO_AI_ISSUE_LOCATOR_KEY, []);
    await storage.set(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY, []);
    return [];
  }
  return storageData;
});

resolver.define("setHolidays", async (req) => {
  console.log("setHolidays");

  // set in diff storage key
  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  let holidayObj = req.payload.value;
  console.log(holidayObj)
  let date_ = new Date(holidayObj['date']);
  holidayObj['date_code'] = date_.toLocaleDateString("en-US");
  storageData.push(holidayObj);
  await storage.set(STORAGE_HOLIDAYS_KEY,storageData);

  return holidayObj;
});

resolver.define("getHolidays", async (req) => {
  console.log("getHolidays");

  const storageData = await storage.get(STORAGE_HOLIDAYS_KEY);
  if (storageData === undefined) {
    await storage.set(STORAGE_HOLIDAYS_KEY, []);
    return [];
  }
  return storageData;
});

resolver.define("getUsers", async (req) => {
  console.log("getUsers");

  let users = await utils.getUsers();
  return users;
});

resolver.define("createConfluenceTeamTemplate", async (req) => {
  console.log("createConfluenceTeamTemplate");

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

resolver.define("setOpenAi", async (req) => {
  console.log("setOpenAi");

  await storage.setSecret(utils.STORAGE_OPENAI_KEY, req.payload.value);

  return { exists: true };
});

resolver.define("checkOpenAi", async (req) => {
  console.log("checkOpenAi");

  let key = await storage.getSecret(utils.STORAGE_OPENAI_KEY);
  if (key) {
    return { exists: true };
  }
  return { exists: false };
});




export const handler = resolver.getDefinitions();
