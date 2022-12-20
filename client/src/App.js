import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DogCreate from "./components/DogCreate";
import DogDetail from "./components/DogDetail";

function App() {
  return (
    <React.Fragment>
      <div>
        <Route exact path={"/"} component={LandingPage}/>
        <Route exact path={"/dogs"} component={Home}/>
        <Route exact path={"/dogs/:id"} component={DogDetail}/>
        <Route path={"/createDog"} component={DogCreate}/>
      </div>
    </React.Fragment>
  );
}

export default App;
