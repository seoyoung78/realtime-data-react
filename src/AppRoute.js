import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Mqtt from "./views/Mqtt";
import Redis from "./views/Redis";

const AppRoute = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/redis" exact component={Redis}/>
      <Route path="/mqtt" exact component={Mqtt}/>
      <Redirect to="/"/>
    </Switch> 
  );
};

export default AppRoute;

