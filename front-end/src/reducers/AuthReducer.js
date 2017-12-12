export default function( state = [], action){
    if (action.type === 'AUTH_ACTION') {
        return action.payload
    } else {
        return state
    }
    return state;
}