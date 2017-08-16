
import axios from 'axios'
import { router } from '@/router'
export default {

    GenerateRoutes({ commit }, prop) {

        return axios({
                    methods:'get',
                    url:'/getRouter',
                    params:prop
            }).then((res) => {
                if(res.data != '权限不够'){
                    // console.log(0)
                     
                     let datas = JSON.stringify(res.data)
                     let rout = []
                     router.options.routes.forEach((item) => {
                         rout.push({
                             name:item.name,
                             path:item.path,
                             children:item.children?item.children:[]
                         })
                     })
                   const accessRoutes = rout.filter(v => {
                       if(datas.indexOf(v.name) >0){
                            if(v.children &&　v.children.length > 0){
                                v.children = v.children.filter(child => {
                                    if(datas.indexOf('\"'+child.name+'\"') >0 ){
                                        return child
                                    }
                                    return false
                                })
                        }  
                        return v
                       }
                    return false
                   })
                 commit('SET_ROUTES',accessRoutes) 
                }else{
                    return false
                }
            }).catch(() => {

            })

        // return new Promise(resolve => {
        //     const accessRoutes = router.filter(v => {
        //            if(JSON.stringify(data).indexOf(v.name) > 0){
        //                 if(v.children &&　v.children.length > 0){
        //                    v.children = v.children.filter(child => {
        //                        if(JSON.stringify(data).indexOf(child.name) >0){
        //                            return child
        //                        }
        //                         return false
        //                    })
        //                 }  
        //              return v
        //            }
        //             return false
                        
        //     })
        //     commit('SET_ROUTES',accessRoutes)
        //     resolve()
        // })
    },
    Logout( { commit } ) {
            commit('LOGOUT')
            return true
    }




}