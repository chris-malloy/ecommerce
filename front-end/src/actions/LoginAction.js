import axios from 'axios';

export default function(formData){
    console.log("Login action running.")
    var loginPromise = axios({
        method: "POST",
        url: `${window.apiHost}/login`,
        data: formData,
    })
    return{
        type: "AUTH_ACTION",
        payload: loginPromise,
    }
}