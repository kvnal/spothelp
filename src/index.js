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
  console.log("oncreate event triggered " + JSON.stringify(context));
  // console.log("oncreate event triggered " + JSON.stringify(event));  

  // job2 - check holiday + detect language + generate greetings > comment
  // job3 - get storage + generate prompt + count token + ai locate bug to team > perform action.

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
    let job1 = await testQueue1.push("ok");
    let job2 = await testQueue2.push("ok");
    let job3 = await testQueue3.push("ok");

    let jobProgress1 = await (await testQueue1.getJob(job1).getStats()).json();
    let jobProgress2 = await (await testQueue2.getJob(job2).getStats()).json();
    let jobProgress3 = await (await testQueue3.getJob(job3).getStats()).json();

    return { j1: jobProgress1, j2: jobProgress2, j3: jobProgress3 };
  }

});
//  devTools end


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
      console.log(`storageData >> ${JSON.stringify(storageDataArr)}`);
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

resolver.define("setHolidays", async (req) => {
  // set in diff storage key
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
