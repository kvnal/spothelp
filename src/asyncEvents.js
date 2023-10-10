import { Queue } from '@forge/events';
import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

export const testQueue1 = new Queue({ key: 'aiJobQueueJob1' });
export const testQueue2 = new Queue({ key: 'aiJobQueueJob2' });
export const testQueue3 = new Queue({ key: 'aiJobQueueJob3' });


const asyncResolver = new Resolver();

asyncResolver.define("job-event-listener1", async (queueItem) => {
  console.log("asyncResovler working.. job1")
  return 1;
  
});
asyncResolver.define("job-event-listener2", async (queueItem) => {
  console.log("asyncResovler working.. job2")
  return 1;
  
});
asyncResolver.define("job-event-listener3", async (queueItem) => {
  console.log("asyncResovler working.. job3")
  return 1;
  
});

export const aiJobHandler = asyncResolver.getDefinitions();
