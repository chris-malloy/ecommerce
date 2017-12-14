export default function(state = [], action){
    // console.log(action.type);
if (action.type === "GET_PRODUCTLINES"){
    return action.payload.data;
}
    return state;
}