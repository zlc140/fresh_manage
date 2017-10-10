
import axios from 'axios'
import { router } from '@/router'
export default {

    GenerateRoutes({ commit }, prop) {

        return axios({
                    method:'post',
                    url:'/fresh-member/memberInfo/findMyRole',
            }).then((res) => {
                let role = { name:'' ,roleCode:''}
                //    复制全部路由
                let rout = []
                router.options.routes.forEach((item) => {
                    if(item.children && item.children.length>0){
                        rout.push({
                            name:item.name,
                            path:item.path,
                            children:item.children?item.children:[]
                        })
                    }
                    
                })
                
                console.log('getRouters',res)
                // 判断是否可以登录后台
                if(res.data.state != 200){
                    return res.data.messages
                }else if( res.data.content.role.roleCode.indexOf('ADMIN:SUPER')>0){// 判断是否分配了权限
                    role.name = res.data.content.role.name;
                    role.roleCode = res.data.content.role.roleCode;
                    let prop = {
                        routs:rout,
                        roleName:role
                    }
                    commit('SET_ROUTES',prop);
                    return true
                }else if(res.data.content.permission && res.data.content.permission.length>0){
                        // 有权限列表时
                        let datas = JSON.stringify(res.data.content.permission)
                        const accessRoutes = rout.filter(v => {
                            let inum = 0
                                v.children = v.children.filter(child => {
                                    if(datas.indexOf(child.name) >0 ){
                                        inum += 1
                                        return child
                                    }
                                    return false
                                })
                                if(inum == 0){
                                    return false
                                }else{
                                    return v
                                }
                        })
                        console.log('getRouters',accessRoutes)
                        role.name = res.data.content.role.name
                        role.roleCode = res.data.content.role.roleCode;
                        let prop = {
                            routs:accessRoutes,
                            roleName:role
                        }
                        commit('SET_ROUTES',prop);
                        return true
                }else{
                    return '账号还没有被分配权限，无权登录！'
                }
            }).catch(() => {
                return '服务器出错，请重新登录'
            })

       
    },
    Logout( { commit } ) {
        return axios({
            method:'post',
            url:'/user-center/logout'
        }).then((res) => {
            commit('LOGOUT')
            return true
        })
           
    }




}