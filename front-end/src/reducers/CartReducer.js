export default function (state = [], action) {
    switch(action.type){
        case 'UPDATE_CART':
        case 'GET_CART':
            return action.payload.data;
        default:
            return state;
    }
}