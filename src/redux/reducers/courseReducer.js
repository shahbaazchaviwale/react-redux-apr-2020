// added code 15-apr-2020
import { ACTION_TYPE } from "../constant/constant-type";

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case ACTION_TYPE.CREATE_COURSE:
            // debugger;
            return [...state, { ...action.payload }];
        // added code 15-apr-2020
        case ACTION_TYPE.LOAD_COURSES_SUCCESS:
            return action.payload;
        default: return state;
    }
}