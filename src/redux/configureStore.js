// file created - 5
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';


export default function configureStore(initialState) {
    const composeEnhancer =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add supprt for redux dev tool
    return createStore(
        rootReducer,
        initialState,
        composeEnhancer(applyMiddleware(reduxImmutableStateInvariant()))
    );
}