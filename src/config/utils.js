import qs from 'qs';
import axios from 'axios';

function getRequest(url,data){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:data})
        .then((res)=>{
            resolve(res);
        })
    })
}

function postRequest(url,data){
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(data))
        .then((res)=>{
            resolve(res);
        })
    })
}

function httpRequest(url,data,type='GET'){
    return new Promise((resolve,reject)=>{
        if(type == 'GET'){
            axios.get(url,{params:data})
            .then((res)=>{
                resolve(res);
             })
        }else if(type == 'POST'){
            axios.post(url,qs.stringify(data))
            .then((res)=>{
                resolve(res);
            })
        }
    })
}

export default{
    getRequest,
    postRequest,
    httpRequest
}