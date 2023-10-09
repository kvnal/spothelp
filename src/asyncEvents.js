import { Queue } from '@forge/events';
import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

export const testQueue = new Queue({ key: 'aiJobQueue' });


const asyncResolver = new Resolver();

asyncResolver.define("job-event-listener", async (queueItem) => {
  console.log("asyncResovler working..")
  console.log(`payload ${JSON.stringify(queueItem)}`)
  await storage.set("queue","ok")
  return 1;
});
export const aiJobHandler = asyncResolver.getDefinitions();
