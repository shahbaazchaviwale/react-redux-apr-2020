// file created - 4

import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

// below combineReducers return object is redux stores which used in component "mapStateToProps"
const rootReducer = combineReducers({
    courses: courses,
    authors: authors

});

export default rootReducer;