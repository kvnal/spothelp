import { useState } from "react";
import './dev.css';
import ReactJson from 'react-json-view';
import { invoke } from "@forge/bridge";

const Devtools = () => {
    const [show, setshow] = useState(false);
    const [data, setdata] = useState(null);
    const [inputvalue, setInputvalue] = useState("");

    const onEdit = (e) => {
        setdata(e.updated_src);
        return 1;
    };

    const getStorage = () => {
        invoke("getStorage", { key: inputvalue }).then((result) => {
            console.log(result);
            setdata(result);
        });
    };

    const setStorage = () => {
        invoke("setStorage", { key: inputvalue, value: data }).then((result) => {
            console.log(result);
            setdata(result);
        });
    };

    const invokeResolver = () =>{
        invoke(inputvalue, {key: null}).then((result)=>{
            setdata(result);
        })
    }

    return (
        <>
            <button onClick={() => setshow(!show)}>Toggle Dev Tools</button>

            {
                show &&
                <div className="dev">
                    <div className="devContainer">

                        <div className="json">
                            <ReactJson
                                src={data}
                                theme={"pop"}
                                collapsed={1}
                                onEdit={onEdit}
                            />
                        </div>

                        <div className="inp">
                            <input type="text"
                                placeholder="getStorage"
                                onChange={(e) => setInputvalue(e.target.value)}
                            />
                            {/* <input type="text" placeholder="getStorage" /> */}
                            <button onClick={getStorage}>get storage</button>
                            <button onClick={setStorage}>setStorage</button>
                            <button onClick={invokeResolver}>invoke resolver</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};


export default Devtools;