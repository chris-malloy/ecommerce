import axios from 'axios';

export default function(token){
    var axiosPromise = axios({
        method: "post",
        url: `${window.apiHost}/getCart`,
        data:{
            token: token,
        }
    })
}