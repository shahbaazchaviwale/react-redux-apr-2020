// added code 22-apr-2020
import { ACTION_TYPE } from "../constant/constant-type";

let loadingStatus = false;

// logic for get last string from "string_data " mention character length
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = loadingStatus, action) {
  if (action.type === ACTION_TYPE.BEGIN_API_CALL) {
    return (state = true);
  } else if (
    action.type === ACTION_TYPE.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return (state = false);
  }
  return state;
}
