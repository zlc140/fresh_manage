import axios from 'axios'
import { setStore,getStore } from '@/config/storage'

export const Login = (prop) => {
    return  axios({
                    methods:'get',
                    url:'/getRouter',
                    params:prop
            }).then((res) => {
                if(res.data != '权限不够'){
                    setStore('username',prop)
                    setStore('route_list',JSON.stringify(res.data))
                    return true
                }else{
                    return false
                }
            }).catch(() => {

            })
}