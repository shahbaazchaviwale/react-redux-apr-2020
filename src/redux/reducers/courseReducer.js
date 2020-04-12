// file created - 3
import { ACTION_TYPE } from "../constant/constant-type";

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case ACTION_TYPE.CREATE_COURSE:
            // debugger;
            return [...state, { ...action.payload }];

        default: return state;
    }
}