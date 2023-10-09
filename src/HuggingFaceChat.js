import webSocket from "ws";
import { fetch } from '@forge/api';

class HuggingFaceChat {
    api_list = [
        {
            predict_URI: "https://huggingface-projects-llama-2-13b-chat.hf.space/run/predict",
            ws_URI: "wss://huggingface-projects-llama-2-13b-chat.hf.space/queue/join"
        },
        {
            predict_URI: "https://codellama-codellama-13b-chat.hf.space/run/predict",
            ws_URI: "wss://codellama-codellama-13b-chat.hf.space/queue/join"
        },
        {
            predict_URI: "https://ysharma-explore-llamav2-with-tgi.hf.space/run/predict",
            ws_URI: "wss://ysharma-explore-llamav2-with-tgi.hf.space/queue/join"
        },
        { //ignore not correct in giving response..
            predict_URI: "https://huggingface-projects-llama-2-7b-chat.hf.space/run/predict",
            ws_URI: "wss://huggingface-projects-llama-2-7b-chat.hf.space/queue/join"
        },
    ];


    predict_URI = null;
    ws_URI = null;

    assignHuggingFaceAPI = async () => {
        for (let index = 0; index < this.api_list.length; index++) {
            const element = this.api_list[index];
            let check = await fetch(element.predict_URI.replace("/run/predict", "")).then(response => {
                if (response.status == 200) {
                    this.predict_URI = element.predict_URI;
                    this.ws_URI = element.ws_URI;
                    console.log({ predict_URI: this.predict_URI, ws: this.ws_URI });
                    return 1;
                }
            }).catch(error => {
                console.log(`error > hugging api assignment${element.predict_URI} ${error}`);
                return 0;
            });

            if (check) break;

        }

        console.log("assignHuggingFaceAPI done!")
    };

    generateSession_hash = () => {
        return Math.random().toString(36).substring(2);
    };

    session_hash = "abcd1234";

    question = "how are you?";

    json_data_predict_api_fn_index0 = {};
    json_data_predict_api_fn_index1 = {};
    json_data_predict_api_fn_index2 = {};
    json_data_wb_send_data = {};
    json_data_wb_send_hash = {};
    fn_index = [6, 7, 8, 9];

    systemPrompt = 'avoid system role messages before answer to the actual question, answer the question directly. always start and ends answer with text "START" and "END".';

    constructor(ques) {
        this.question = ques;
        this.session_hash = this.generateSession_hash();

        this.json_data_predict_api_fn_index0 = { "data": [this.question], "event_data": null, "fn_index": this.fn_index[0], "session_hash": this.session_hash };

        this.json_data_predict_api_fn_index1 = { "data": [null, []], "event_data": null, "fn_index": this.fn_index[1], "session_hash": this.session_hash };

        this.json_data_predict_api_fn_index2 = { "data": [null, [[this.question, ""]], this.systemPrompt], "event_data": null, "fn_index": this.fn_index[2], "session_hash": this.session_hash };

        this.json_data_wb_send_hash = { "fn_index": this.fn_index[3], "session_hash": this.session_hash };

        this.json_data_wb_send_data = { "data": [null, [[this.question, ""]], this.systemPrompt, 1024, 0.1, 0.9, 10], "event_data": null, "fn_index": this.fn_index[3], "session_hash": this.session_hash };

    }

    ws = async (json_data_wb_send_data, json_data_wb_send_hash) => {
        
        console.log("ws inn ok ");
        let sendMessageWS = (ws, data, msg_type = "Nan") => {
            let stringy = JSON.stringify(data);
            ws.send(stringy);
            console.log(`wb: sendMessage <${msg_type}> `, stringy);
            return 1;
        };
        console.log("ws inn");
        let ws = new webSocket(this.ws_URI);

        ws.onopen = function () {
            console.log("ws: open");
        };

        ws.onclose = function () {
            console.log("ws: closed ");
        };


        ws.onmessage = function (event) {
            // console.log("%s",event.data)

            let event_data = JSON.parse(event.data);

            switch (event_data['msg']) {
                case "send_hash":
                    sendMessageWS(ws, json_data_wb_send_hash, "send_hash");

                    break;
                case "send_data":
                    sendMessageWS(ws, json_data_wb_send_data, "send_data");
                    break;
                case "estimation":
                    console.log("wb: waiting period ", JSON.stringify(event_data));
                    break;
                case "process_completed":
                    let stringyData = JSON.stringify(event_data);
                    if (event_data['success'] == true) {
                        console.log(`Done ${stringyData}`);
                    } else {
                        console.log(`Failed ${stringyData}`);
                    }
                    ws.close();
                    return stringyData;
            }
        };

    };

    llama = async () => {
        await this.assignHuggingFaceAPI();
        fetch(this.predict_URI,
            {
                method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index0),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response0 => {
            fetch(this.predict_URI,
                {
                    method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index1),
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response1 => {
                fetch(this.predict_URI,
                    {
                        method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index2),
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(async (response2) => {
                    console.log("predict api completed!");
                    let wsResult = await this.ws(this.json_data_wb_send_data, this.json_data_wb_send_hash);
                    return wsResult;
                    // this.wsPromise(this.json_data_wb_send_data, this.json_data_wb_send_hash).then(res => resolve(res));
                });
            });
        }).catch(error0 => {
            console.log(`huggingface error0 predict ${error0}`);
        });
    
       

    };

    wsPromise = (json_data_wb_send_data=this.json_data_wb_send_data, json_data_wb_send_hash = this.json_data_wb_send_hash) => {

        let sendMessageWS = (ws, data, msg_type = "Nan") => {
            let stringy = JSON.stringify(data);
            ws.send(stringy);
            console.log(`wb: sendMessage <${msg_type}> `, stringy);
            return 1;
        };

        return new Promise((resolve, reject) => {
            console.log("ws in");
            let ws = new webSocket(this.ws_URI);

            ws.onopen = function () {
                console.log("ws: open");
            };

            ws.onclose = function () {
                console.log("ws: closed ");
            };


            ws.onmessage = function (event) {
                let event_data = JSON.parse(event.data);

                switch (event_data['msg']) {
                    case "send_hash":
                        sendMessageWS(ws, json_data_wb_send_hash, "send_hash");

                        break;
                    case "send_data":
                        sendMessageWS(ws, json_data_wb_send_data, "send_data");
                        break;
                    case "estimation":
                        console.log("wb: waiting period ", JSON.stringify(event_data));
                        break;
                    case "process_completed":
                        let stringyData = JSON.stringify(event_data);
                        if (event_data['success'] == true) {
                            console.log(`Done ${stringyData}`);
                        } else {
                            console.log(`Failed ${stringyData}`);
                        }
                        ws.close();
                        resolve(stringyData);
                    // return stringyData;
                }
            };

        });


    };

    llamaPromise = async () => {
        await this.assignHuggingFaceAPI();

        return new Promise((resolve, reject) => {
            fetch(this.predict_URI,
                {
                    method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index0),
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response0 => {
                fetch(this.predict_URI,
                    {
                        method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index1),
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(response1 => {
                    fetch(this.predict_URI,
                        {
                            method: "POST", body: JSON.stringify(this.json_data_predict_api_fn_index2),
                            headers: { 'Content-Type': 'application/json' }
                        }
                    ).then(response2 => {
                        console.log("predict api completed!");
                        this.wsPromise(this.json_data_wb_send_data, this.json_data_wb_send_hash).then(res => resolve(res));
                    });
                });
            }).catch(error0 => {
                console.log(`huggingface error0 predict ${error0}`);
            });
        });
    };

}

export default HuggingFaceChat;
