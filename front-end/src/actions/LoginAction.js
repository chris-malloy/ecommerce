import axios from 'axios';

export default function(formData){
    // dev tool, remove in prod
    if(formData === "fake"){
        console.log("Fake login action;")
        var loginPromise = axios({
            method: "POST",
            url: `${window.apiHost}/fakelogin`,
            data: formData
        })
    } else {
        // console.log("Login action running.")
        loginPromise = axios({
            method: "POST",
            url: `${window.apiHost}/login`,
            data: formData,
        })
    } 

    return{
        type: "AUTH_ACTION",
        payload: loginPromise,
    }
}