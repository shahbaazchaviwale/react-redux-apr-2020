// added code 15-apr-2020
import { ACTION_TYPE } from "../constant/constant-type";
import * as authorAPI from "../../api/authorApi";
// added code 22-apr-2020
import { beginApiCall, apiCallError } from "./apiStatusAction";

export const loadAuthorSuccess = (authors) => {
  return { type: ACTION_TYPE.LOAD_AUTHOR_SUCCESS, payload: authors };
};
// thunk
export const loadAuthorApi = () => {
  return (dispatch) => {
    //   added code 22-apr-2020
    dispatch(beginApiCall());
    return authorAPI
      .getAuthors()
      .then((eachAuthor) => {
        dispatch(loadAuthorSuccess(eachAuthor));
      })
      .catch((error) => {
        // added code 28-apr-2020
        dispatch(apiCallError());
        throw error;
      });
  };
};
