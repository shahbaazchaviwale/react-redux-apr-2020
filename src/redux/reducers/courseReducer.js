// added code 15-apr-2020
import { ACTION_TYPE } from "../constant/constant-type";
let courseInitialState = [];

export default function courseReducer(state = courseInitialState, action) {
  switch (action.type) {
    // added code 21-apr-2020
    case ACTION_TYPE.CREATE_COURSES_SUCCESS:
      console.log("CREATE_COURSES_SUCCESS >>", state);
      return [...state, { ...action.payload }];
    // added code 21-apr-2020
    case ACTION_TYPE.UPDATE_COURSES_SUCCESS:
      console.log("UPDATE_COURSES_SUCCESS >>", state);
      return state.map((course) => {
        return course.id === action.payload.id ? action.payload : course;
      });
    // added code 15-apr-2020
    case ACTION_TYPE.LOAD_COURSES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
