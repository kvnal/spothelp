// wss://team-language-detector-languagedetector.hf.space/queue/join
import webSocket from "ws";

class HuggingFaceLanguage {

    generateSession_hash = () => {
        return Math.random().toString(36).substring(2);
    };

    question = "vamos amigo!";
    fn_index = [0];
    session_hash = this.generateSession_hash();


    json_data_wb_send_hash = { "fn_index": this.fn_index[0], "session_hash": this.session_hash };

    json_data_wb_send_data = { "data": [this.question], "event_data": null, "fn_index": this.fn_index[0], "session_hash": this.session_hash };
    /////////////

    ws_URI = "wss://team-language-detector-languagedetector.hf.space/queue/join";

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
                        resolve(stringyData);
                    // return stringyData;
                }
            };

        });


    };

    llamaPromise = new Promise((resolve, reject) => {
        this.wsPromise(this.json_data_wb_send_data, this.json_data_wb_send_hash).then
            (res => {
                resolve(res);
            });
    });

}

export default HuggingFaceLanguage;
