export default function (state = [], action) {
    if (action.type === "UPDATE_CART") {
        console.log(action)
        return action.payload.data;
    } else {
        return state
    }
}