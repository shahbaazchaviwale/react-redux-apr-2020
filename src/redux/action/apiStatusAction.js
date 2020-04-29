// added code 22-apr-2020
import { ACTION_TYPE } from "../constant/constant-type";

export function beginApiCall() {
  return { type: ACTION_TYPE.BEGIN_API_CALL };
}
// added code 28-apr-2020
export function apiCallError() {
  return { type: ACTION_TYPE.API_CALL_ERROR };
}
