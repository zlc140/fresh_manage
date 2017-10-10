import axios from 'axios'
import { setStore,getStore } from '@/config/storage'

export const Login = (prop) => {
    
    console.log(prop)
    return  axios({
                    method:'POST',
                    url:'/user-center/login',
                    params:prop
            }).then((res) => {
                console.log(res)
                if(res.data.state == 'SUCCESS'){
                    prop.password = ''
                    setStore('username',prop)
                    return true
                }else{
                    return res.data.messages
                }
                 
                // return true
                // if(res.data != '权限不够'){
                //     setStore('username',prop)
                //     return true
                // }else{
                //     return false
                // }
            }).catch((res) => {
               return false
            })
}
// 登录后验证权限
export const getRole  = () => {
    return axios({
        method:'post',
        url:'/fresh-member/memberInfo/findMyRole',
    }).then(res => {
        console.log(res)
    }) 
}