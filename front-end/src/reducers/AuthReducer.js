export default function( state = [], action){
    if (action.type === 'AUTH_ACTION') {
        return action.payload.data;
    } else {
        return state
    }
}