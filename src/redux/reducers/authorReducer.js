// file created - 3
import { ACTION_TYPE } from "../constant/constant-type";

export default function authorReducer(state = [], action) {
    switch (action.type) {
        case ACTION_TYPE.LOAD_AUTHOR_SUCCESS:
            return action.payload;
        default: return state;
    }
}