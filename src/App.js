import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import AboutUs from "./component/AboutUs";
import Header from "./component/Header";
import PageNotFound from "./component/PageNotFound";
import Course from "./component/Course";

import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import CourseManagePage from "./component/CourseManagePage";

const store = configureStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutUs} />
          <Route path="/courses" component={Course} />
          <Route path="/course/:slug" component={CourseManagePage} />
          <Route path="/course" component={CourseManagePage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

export default App;
