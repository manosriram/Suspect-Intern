import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import "./components/Basic.css";

class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">
        <canvas id="can" />
        <div className="create">
          <Create />
        </div>
      </div>
    );
  }
}

export default App;
