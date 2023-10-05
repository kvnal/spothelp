import "./App.css";
// Need it to invoke API
// import { invoke } from "@forge/bridge";
import Devtools from "./dev/Devtools";
import HolidaysSection from "./holidays-section/holidays";
import Table from "./parts/table/table";
import settingData from "./mock-data/setting_config.json";
import { useEffect, useState } from "react";
import { invoke } from '@forge/bridge';

function App() {
  // Invoke API like this
  // const test = () => {
  //   invoke('test', { msg: "hello from the other side" }).then((data) => { console.log(`Data > ${data}`); });
  // };
  const [settingsData, setSettingsData] = useState();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
      invoke('getSettings').then((data) => setSettingsData(data));
      setLoading(false)
  }, []);
  console.log(settingsData);
  const columns = [
    {
      title: "Card Title",
      accessorKey: "title",
      width: 200,
    },
    {
      title: "Card Description",
      accessorKey: "description",
      width: 300,
    },
  ];
  const data = [
    {
      title: "Jira Issue Text",
      description: (
        <div
          style={{ backgroundColor: "green", color: "white" }}
        >{`I'm a custom component`}</div>
      ),
    },
    {
      title: "Jira Issue 2 Text",
      description: "I'm text",
    },
    {
      title: "Jira Issue 3 Text",
      description: "Ab mujhe bhi peer-pressure mein kuch hona padhega kya ?",
    },
  ];

  return (
    <div className="App">
      <Devtools />
      <Table columns={columns} data={data} />
      <HolidaysSection settings={settingsData} setSettings={setSettingsData} isLoading={isLoading}/>
    </div>
  );
}

export default App;
