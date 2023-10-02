import logo from './logo.svg';
import './App.css';

import { invoke } from "@forge/bridge";
import Devtools from './dev/Devtools';


function App() {

  const test = () => {
    invoke('test', { msg: "hello from the other side" }).then((data) => { console.log(`Data > ${data}`); });

  };
  return (
    <div className="App">
      <Devtools />
      <header className="App-header">
        <button onClick={test}>click to test</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
