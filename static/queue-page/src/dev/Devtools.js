import { useEffect, useState } from "react";
import "./dev.css";
import ReactJson from "react-json-view";
import { invoke } from "@forge/bridge";

const Devtools = () => {
  const [show, setshow] = useState(false);
  const [data, setdata] = useState(null);
  const [inputvalue, setInputvalue] = useState("");

  useEffect(()=>{
    setdata({msg : "refreshed"})
  },[])
  const onEdit = (e) => {
    setdata(e.updated_src);
    return 1;
  };


  const getStorage = () => {
    invoke("devInvoke", { key: inputvalue, func : "get" }).then((result) => {
      console.log(result);
      setdata(result);
    });
  };

  const setStorage = () => {
    invoke("devInvoke", { key: inputvalue, func : "set", value: data }).then((result) => {
      console.log(result);
      setdata(result);
    });
  };

  const delStorage = () => {
    invoke("devInvoke", { key: inputvalue, func : "del" }).then((result) => {
      console.log(result);
      setdata(result);
    });
  };

  const invokeResolver = () => {
    invoke(inputvalue, { key: null, value : data }).then((result) => {
      setdata(result);
    });
  };

  const devInvoke = () => {
    invoke("devInvoke", { key: null, func:"other" }).then((result) => {
      setdata(result);
    });
  };

  return (
    <div>
      <button
        style={{ marginLeft: 'auto', marginRight: 'auto', width: "200px", display: "block" }}
        onClick={() => setshow(!show)}
      >
        Toggle Dev Tools
      </button>
      {show && (
        <div className="dev">
          <div className="devContainer">
            <div className="json">
              <ReactJson
                src={data}
                theme={"pop"}
                collapsed={1}
                onEdit={onEdit}
                onAdd = {onEdit}
              />
            </div>

            <div className="inp">
              <input
                type="text"
                placeholder="getStorage"
                onChange={(e) => setInputvalue(e.target.value)}
              />
              {/* <input type="text" placeholder="getStorage" /> */}
              <button onClick={getStorage}>get storage</button>
              <button onClick={setStorage}>set Storage</button>
              <button onClick={delStorage}>del Storage</button>
              <button onClick={invokeResolver}>invoke resolver</button>
              <button onClick={devInvoke}>devInvoke other</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devtools;
