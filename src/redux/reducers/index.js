// file created - 4

import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
// added code 22-apr-2020
import apiStatus from "./apiStatusReducer";

// below combineReducers return object is redux stores which used in component "mapStateToProps"
const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  //   added code 22-apr-2020
  apiLoadingStatus: apiStatus,
});

export default rootReducer;
