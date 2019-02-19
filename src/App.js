import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import "./components/Basic.css";
import { Route, BrowserRouter } from "react-router-dom";
import Detect from "./components/Detect";

class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Create} />
            <Route exact path="/detect" component={Detect} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
