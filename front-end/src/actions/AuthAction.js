// action is a js function that returns an object
// that object must have at least a prop of "type"

import axios from 'axios';

export default function(formData){
    var registerPromise = axios({
        url: `${window.apiHost}/register`,
        method: "POST",
        data: formData
    })
    return{
        type: "AUTH_ACTION",
        payload: registerPromise,
    }
}

// TODO