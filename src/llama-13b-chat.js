import axios from 'axios';
import webSocket from "ws";

class HuggingFace {

    generateSession_hash = () => {
        return Math.random().toString(36).substring(2);
    };

    question = "what is 2 + 8? give only the answer.";
    fn_index = [6, 7, 8, 9];
    session_hash = this.generateSession_hash();

    /////////////////
    //predict API payload
    json_data_predict_api_fn_index0 = { "data": [this.question], "event_data": null, "fn_index": this.fn_index[0], "session_hash": this.session_hash };

    json_data_predict_api_fn_index1 = { "data": [null, []], "event_data": null, "fn_index": this.fn_index[1], "session_hash": this.session_hash };

    json_data_predict_api_fn_index2 = { "data": [null, [[this.question, ""]], ""], "event_data": null, "fn_index": this.fn_index[2], "session_hash": this.session_hash };


    systemPrompt="You are a helpful, respectful and honest assistant with a deep knowledge of code and software design. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."
    // wb payload
    json_data_wb_send_hash = { "fn_index": this.fn_index[3], "session_hash": this.session_hash };

    json_data_wb_send_data = { "data": [null, [[this.question, ""]], "", 1024, 0.1, 0.9, 10], "event_data": null, "fn_index": this.fn_index[3], "session_hash": this.session_hash };
    /////////////

    // predict_URI = "https://codellama-codellama-13b-chat.hf.space/run/predict";
    // ws_URI = "wss://codellama-codellama-13b-chat.hf.space/queue/join";
    predict_URI = "https://huggingface-projects-llama-2-13b-chat.hf.space/run/predict";
    ws_URI = "wss://huggingface-projects-llama-2-13b-chat.hf.space/queue/join";

    ws = (json_data_wb_send_data, json_data_wb_send_hash) => {

        let sendMessageWS = (ws, data, msg_type = "Nan") => {
            let stringy = JSON.stringify(data);
            ws.send(stringy);
            console.log(`wb: sendMessage <${msg_type}> `, stringy);
            return 1;
        };

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

    llama = () => {
        axios.post(this.predict_URI, this.json_data_predict_api_fn_index0).then(res => {
            axios.post(this.predict_URI, this.json_data_predict_api_fn_index1).then(res => {
                axios.post(this.predict_URI, this.json_data_predict_api_fn_index2).then(res => {
                    console.log("predict api completed!");
                    let wsResult = this.ws(this.json_data_wb_send_data, this.json_data_wb_send_hash);
                    return wsResult;
                });
            });
        });

    };

    wsPromise = (json_data_wb_send_data, json_data_wb_send_hash) => {

        let sendMessageWS = (ws, data, msg_type = "Nan") => {
            let stringy = JSON.stringify(data);
            ws.send(stringy);
            console.log(`wb: sendMessage <${msg_type}> `, stringy);
            return 1;
        };

       return new Promise((resolve, reject) => {

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
                        resolve(stringyData)
                        // return stringyData;
                }
            };

        });

       
    };

    llamaPromise = new Promise((resolve, reject) => {
        axios.post(this.predict_URI, this.json_data_predict_api_fn_index0).then(res => {
            axios.post(this.predict_URI, this.json_data_predict_api_fn_index1).then(res => {
                axios.post(this.predict_URI, this.json_data_predict_api_fn_index2).then(res => {
                    console.log("predict api completed!");
                    // let wsResult = this.ws(this.json_data_wb_send_data, this.json_data_wb_send_hash);
                    this.wsPromise(this.json_data_wb_send_data,this.json_data_wb_send_hash).then
                    (res=>{
                        resolve(res);
                    })
                });
            });
        });

    });

}

export default HuggingFace;
