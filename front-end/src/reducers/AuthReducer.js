export default function( state = [], action){
    switch (action.type) {
        case 'AUTH_ACTION':
            console.log(action.payload);
            return action.payload.data;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}