// Need it to invoke API
// import { invoke } from "@forge/bridge";
import HolidaysSection from "../sections/holidays";
import React, { useEffect, useState, useCallback } from "react";
import { invoke } from "@forge/bridge";
import GreetingsSection from "../sections/greetings";
import IssueLocatorSection from "../sections/issueLocatorSection";
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import { LoadingButton } from "@atlaskit/button";

const Home = () => {
  const [settingsData, setSettingsData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isSettingsLoading, setSettingsLoading] = useState(false);
  const [isFailed, setFailed] = useState(false);
  useEffect(() => {
    invoke("getSettings").then((data) => {
      setSettingsData(data);
      setLoading(false);
    });
  }, []);

  const [selected, setSelected] = useState(0);

  const handleUpdate = useCallback(
    (index) => setSelected(index),
    [setSelected]
  );

  return (
    <>
      <Tabs onChange={handleUpdate} selected={selected}>
        <TabList>
          <Tab>Issue Locator</Tab>
          <Tab>Holidays</Tab>
          <Tab>A.I. Greetings</Tab>
        </TabList>
        <TabPanel>
          <IssueLocatorSection
            settings={settingsData}
            setSettings={setSettingsData}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel>
          <HolidaysSection
            settings={settingsData}
            setSettings={setSettingsData}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel>
          <GreetingsSection
            settings={settingsData}
            setSettings={setSettingsData}
            isLoading={isLoading}
          />
        </TabPanel>
      </Tabs>
      <div className="d-flex mt-4 justify-content-start">
        <LoadingButton
          isLoading={isSettingsLoading}
          appearance={isFailed ? "danger" : "primary"}
          className=""
          onClick={() => {
            setFailed(false);
            setSettingsLoading(true);
            invoke("setSettings", { value: settingsData })
              .then(() => {
                setSettingsLoading(false);
              })
              .catch(() => {
                console.error("Unable to set Settings!");
                setSettingsLoading(false);
                setFailed(true);
              });
          }}
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
};

export default Home;
