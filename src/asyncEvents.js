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
      ai_response = `this is tokenized text > \n${confluencePageBody['raw']} `
  }else{
    // openai api get key in openai utils
  }

  console.log(`job-1 : token count - ${encode(ai_response).length}`)
  
  let storageDataArrTokenize = await storage.get(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY);

  dataToset['confluence_token'] = ai_response;
  storageDataArrTokenize.push(dataToset);
  
  console.log(`storageData job1 >> ${JSON.stringify(storageDataArrTokenize)}`);
  await storage.set(utils.STORAGE_TOKENIZED_CONFLUENCE_BODY, storageDataArrTokenize);

  return 1;
  
});

asyncResolver.define("job-event-listener2", async (queueItem) => {
  console.log("asyncResovler working.. job2")
  // check holiday + comment
  return 1;
  
});

asyncResolver.define("job-event-listener3", async (queueItem) => {
  console.log("asyncResovler working.. job3")
  return 1;
  
});

export const aiJobHandler = asyncResolver.getDefinitions();
