import "./App.css";
// Need it to invoke API
// import { invoke } from "@forge/bridge";
import Devtools from "./dev/Devtools";
import HolidaysSection from "./sections/holidays";
import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import GreetingsSection from "./sections/greetings";
import IssueLocatorSection from "./sections/issueLocatorSection";


const App = () => {
  const [settingsData, setSettingsData] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    invoke("getSettings").then((data) => {
      setSettingsData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <Devtools />
      <IssueLocatorSection 
        settings={settingsData}
        setSettings={setSettingsData}
        isLoading={isLoading}
      />
      <HolidaysSection
        settings={settingsData}
        setSettings={setSettingsData}
        isLoading={isLoading}
      />
      <GreetingsSection
        settings={settingsData}
        setSettings={setSettingsData}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
