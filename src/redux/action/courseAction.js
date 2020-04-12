// file created - 1
import { ACTION_TYPE } from '../constant/constant-type'

export function createCourse(course) {
    // debugger;
    return { type: ACTION_TYPE.CREATE_COURSE, payload: course }
}