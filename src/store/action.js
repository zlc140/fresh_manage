

import { routerList,router } from '@/router'
export default {

    GenerateRoutes({ commit }, data) {
        console.log(router)
        return new Promise(resolve => {
            const accessRoutes = routerList.filter(v => {
                   if(JSON.stringify(data).indexOf(v.name) > 0){
                        if(v.children &&　v.children.length > 0){
                           v.children = v.children.filter(child => {
                               if(JSON.stringify(data).indexOf(child.name) >0){
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
            resolve()
        })
    }




}