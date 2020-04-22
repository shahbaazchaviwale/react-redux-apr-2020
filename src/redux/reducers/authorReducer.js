// file created - 3
import { ACTION_TYPE } from "../constant/constant-type";

let authorInitialState = [];
export default function authorReducer(state = authorInitialState, action) {
    switch (action.type) {
        case ACTION_TYPE.LOAD_AUTHOR_SUCCESS:
            return action.payload;
        default: return state;
    }
}