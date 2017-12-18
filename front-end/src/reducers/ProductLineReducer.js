export default function(state = [], action){
    // console.log(action.type);
    if (action.type === "GET_PRODUCTLINES"){
        // console.log(action.payload)
        return action.payload.data;
    } else {
        return state;
    }
}