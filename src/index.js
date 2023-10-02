import Resolver from "@forge/resolver";
import { api, storage } from "@forge/api";

import mock_getSettingConfig from "./mockdata/setting_config.json" 
// import mock_getConfluenceWikis from "./mockdata/dynamicConfluenceBody.json" 

// event trigger
export async function run(event, context) {
  console.log("oncreate event triggered " + JSON.stringify(context));

  // check holiday occasional from storage
  // check holiday weekly from setting
  // check if issue bug (get issue details)
  // get prompt or create storage call
  // ai call promise bug detect + greeting
  // post greeting comment..
  // get jira board storage
  // assign ticket 
}
// end

// /rest/agile/1.0/board
// /wiki/rest/api/content/
// /wiki/rest/api/content/1048851
// /wiki/rest/api/content/1048851?expand=body.dynamic

const resolver = new Resolver();

resolver.define("test", async (req) => {
  const data = req.context;
  console.log("data from front end > " + JSON.stringify(req));
  return "🔴 Hello from the backend.";
});

// dev tools
resolver.define("getStorage", async (req) => {
  const key = req.payload.key;
  console.log(key);
  const storageData = await storage.get(key)
  if(typeof(storageData)=="object")
    return storageData
  return {data : storageData ? storage!="undefined" : `key ${key} not present`}
});

resolver.define("setStorage", async (req) => {
  const key = req.payload.key;
  const value = req.payload.value;
  console.log(key,value);
  const storageData = await storage.set(key,value);
  return {msg : "key set done"}
});
// dev tools end


resolver.define("getJiraBoards", async (req) => {
  let response = await api.asApp().requestJira(route`/rest/agile/1.0/board`);

  return response;
});

resolver.define("getConfluenceWikis", async (req) => {
  let response = await api.asApp().requestJira(route`/wiki/rest/api/content/`);
  return response;
});

resolver.define("setSettingConfig", async (req) => {
  // set and check for confluence page change along with
});

resolver.define("getSettingConfig", async (req) => {
    // const storageSetting = await storage.get("settingConfig");
    // if undefined then set default.
    return mock_getSettingConfig;
    return storageSetting;
});

resolver.define("setAutoTicketLocator", async(req)=>{
    // set in diff storage key

    // save new prompt in diff key
})

resolver.define("getAutoTicketLocator", async(req)=>{
    // get
})

resolver.define("setHolidays", async(req)=>{
    // set in diff storage key
})

resolver.define("getHolidays", async(req)=>{
    // get return blank.
})


export const handler = resolver.getDefinitions();
