// file created - 2
export const ACTION_TYPE = {
  CREATE_COURSE: "CREATE_COURSE",
  LOAD_COURSES_SUCCESS: "LOAD_COURSES_SUCCESS",
  LOAD_AUTHOR_SUCCESS: "LOAD_AUTHOR_SUCCESS",
  // added code 21-apr-2020 add thunk code
  CREATE_COURSES_SUCCESS: "CREATE_COURSES_SUCCESS",
  UPDATE_COURSES_SUCCESS: "UPDATE_COURSES_SUCCESS",
  // added code 22-apr-2020
  BEGIN_API_CALL: "BEGIN_API_CALL",
  // added code 28-apr-2020
  API_CALL_ERROR: "API_CALL_ERROR",
  /**
 *    By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
      API call. But since we're doing an optimistic delete, we're hiding loading state.
      So this action name deliberately omits the "_SUCCESS" suffix.
      If it had one, our apiCallsInProgress counter would be decremented below zero
      because we're not incrementing the number of apiCallInProgress when the delete request begins.
 */
  DELETE_COURSE_OPTIMISTIC: "DELETE_COURSE_OPTIMISTIC",
};
