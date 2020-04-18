// added code 15-apr-2020
import { ACTION_TYPE } from '../constant/constant-type';
import * as authorAPI from '../../api/authorApi';

export const loadAuthorSuccess = (authors) => {
    return { type: ACTION_TYPE.LOAD_AUTHOR_SUCCESS, payload: authors }
}
// thunk
export const loadAuthorApi = () => {
    return (dispatch) => {
        return authorAPI.getAuthors()
            .then((eachAuthor) => {
                dispatch(loadAuthorSuccess(eachAuthor))
            }).catch((error) => { throw error; })
    }
}