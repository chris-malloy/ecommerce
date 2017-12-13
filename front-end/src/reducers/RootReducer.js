// need redux and all reducers
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

// combineReducers takes an object as an arg
// that arg has key:value pair = stateName: reducerFunction
// the reducerFunction wil return a value
const rootReducer = combineReducers({
    auth: AuthReducer,
})

// export result of combineReducers
export default rootReducer;