import axios from 'axios'
import { setStore,getStore } from '@/config/storage'

export const Login = (prop) => {
     
    setStore('username',prop)
    return new Promise((resolve,reject) => {
        resolve([200])
    })
    // return  axios({
    //                 methods:'get',
    //                 url:'/login',
    //                 params:prop
    //         }).then((res) => {
    //             if(res.data != '权限不够'){
    //                 setStore('username',prop)
    //                 return true
    //             }else{
    //                 return false
    //             }
    //         }).catch(() => {

    //         })
}