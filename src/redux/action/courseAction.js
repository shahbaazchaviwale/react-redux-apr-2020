// file created - 1
import { ACTION_TYPE } from '../constant/constant-type';
// added code 15-apr-2020
import * as courseApi from '../../api/courseApi'

export function createCourse(course) {
    // debugger;
    return { type: ACTION_TYPE.CREATE_COURSE, payload: course }
}

// added code 15-apr-2020 add thunk code
export function loadCourseSuccess(courses) {
    return { type: ACTION_TYPE.LOAD_COURSES_SUCCESS, payload: courses }
}

export const loadCourseFromApi = () => {
    return (dispatch) => {
        return courseApi.getCourses().then((eachCourse) => {
            console.log('getCourses >>', eachCourse);
            dispatch(loadCourseSuccess(eachCourse));
        }).catch((error) => { throw error; })
    }
}
