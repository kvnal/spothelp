import "./App.css";
// Need it to invoke API
// import { invoke } from "@forge/bridge";
import Devtools from "./dev/Devtools";
import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import Home from "./pages/homepage";
import CoverPage from "./pages/coverpage";
import GetKey from "./pages/get-key-page";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOpenAiKey, setIsOpenAiKey] = useState(false);
  useEffect(() => {
    // checkOpenAi
    invoke("checkOpenAi").then((data) => {
      setIsOpenAiKey(data?.exists);
      setLoading(false);
    });
  }, []);

  const refreshHome = () => {
    setLoading(true);
    invoke("checkOpenAi").then((data) => {
      setIsOpenAiKey(data?.exists);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      {isLoading ? (
        <CoverPage />
      ) : isOpenAiKey ? (
        <Home />
      ) : (
        <GetKey refreshHome={refreshHome} />
      )}
    </div>
  );
};

export default App;
