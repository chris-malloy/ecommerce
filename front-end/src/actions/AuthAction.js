// action is a js function that returns an object
// that object must ahvea t least a prop of "type"

import axios from 'axios';

export default function(first,last,password,email){
    console.log("Auth Action is running...")
    console.log(first)
    var registerPromise = axios({
        url: `${window.apiHost}/register`,
        method: "POST",
        data: {
            first: first,
            last: last,
            password: password,
            email: email,
        }
    })
    console.log(registerPromise);
    return{
        type: "AUTH_ACTION",
        payload: registerPromise,
    }
}

// TODO
// add in last, password, and email params