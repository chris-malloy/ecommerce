// need redux and all reducers
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProductLineReducer from './ProductLineReducer'
import CartReducer from './CartReducer';

// combineReducers takes an object as an arg
// that arg has key:value pair = stateName: reducerFunction
// the reducerFunction wil return a value
const rootReducer = combineReducers({
    auth: AuthReducer,
    pl: ProductLineReducer,
    cart: CartReducer
})

// export result of combineReducers
export default rootReducer;