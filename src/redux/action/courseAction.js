// file created - 1
import { ACTION_TYPE } from "../constant/constant-type";
// added code 15-apr-2020
import * as courseApi from "../../api/courseApi";
// added code 22-apr-2020
import { beginApiCall, apiCallError } from "./apiStatusAction";

// export function createCourse(course) {
//     // debugger;
//     return { type: ACTION_TYPE.CREATE_COURSE, payload: course }
// }

// added code 15-apr-2020 add thunk code
export function loadCourseSuccess(courses) {
  return { type: ACTION_TYPE.LOAD_COURSES_SUCCESS, payload: courses };
}

// added code 21-apr-2020 add thunk code
export function createCourseSuccess(course) {
  return { type: ACTION_TYPE.CREATE_COURSES_SUCCESS, payload: course };
}
export function updateCourseSuccess(course) {
  return { type: ACTION_TYPE.UPDATE_COURSES_SUCCESS, payload: course };
}
// added code 28-apr-2020
export function deleteCourseOptismistic(course) {
  return { type: ACTION_TYPE.DELETE_COURSE_OPTIMISTIC, payload: course };
}
export const loadCourseFromApi = () => {
  return (dispatch) => {
    // added code 22-apr-2020
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((eachCourse) => {
        console.log("getCourses >>", eachCourse);
        dispatch(loadCourseSuccess(eachCourse));
      })
      .catch((error) => {
        // added code 28-apr-2020
        dispatch(apiCallError());
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  return (dispatch, getState) => {
    // added code 22-apr-2020
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((saveCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(saveCourse))
          : dispatch(createCourseSuccess(saveCourse));
      })
      .catch((error) => {
        // added code 28-apr-2020
        dispatch(apiCallError());
        throw error;
      });
  };
};
// added code 28-apr-2020
export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptismistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
