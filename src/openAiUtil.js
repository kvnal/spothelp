import { fetch, storage } from '@forge/api';



class OpenAiUtil {
  STORAGE_OPENAI_KEY = "openai";
  postChatCompletion = async (prompt)=> {

    let openAiKey = await storage.getSecret(this.STORAGE_OPENAI_KEY);

    if(!openAiKey){
      return {
        status: -1,
        message: "API key not found"
      }
    }

    const startTime = new Date().getTime();
    const choiceCount = 1;
    const url = `https://api.openai.com/v1/chat/completions`;
    const payload = {
      model: "gpt-3.5-turbo",
      n: choiceCount,
      messages: [{
        role: 'system',
        content: `You are a helpful assistant.`
      }, {
        role: 'user',
        content: prompt
      }]
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(payload)
    };
    const response = await fetch(url, options);
    const endTime = new Date().getTime();
    const durationSeconds = (endTime - startTime) / 1000.0;
    console.log(`ChatGPT API request duration: ${durationSeconds}`);
    console.log(`response.status: ${response.status}`);
    const result = {
      status: response.status,
      message: ''
    }
    if (response.status === 200) {
      const chatCompletion = await response.json();
      console.log(`response chatCompletion: ${JSON.stringify(chatCompletion, null, 2)}`);
      // The information should all be in a single ChatCompletionChoice object because the 
      // request specified this (see the n attribute in the payload above).
      const firstChoice = this._findFirstAssistantCompletionChoice(chatCompletion.choices);
      if (firstChoice) {
        result.message = firstChoice.message.content;
      } else {
        console.warn(`Chat completion response did not include any assistance choices.`);
        result.message = `AI response did not include any choices.`;
      }
    } else {
      const text = await response.text();
      console.log(`Chat completion response text: ${text} (length ${text.length})`);
      result.message = text;
    }
    return result;
  }

  _findFirstAssistantCompletionChoice = (choices)=> {
    for (const choice of choices) {
      if (choice.message.role === 'assistant') {
        return choice;
      }
    }
    return undefined;
  }

}

export default new OpenAiUtil();
