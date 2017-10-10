<template>
        <el-col :span="24" class="header" :class="collapsed?'':'header-dark'">
            <el-col :span="24" class="top" >
                <el-col :span="6" class="logo" >
                    <img src="../assets/logo.png" alt="">
                </el-col>
                <el-col :span="10">
                    <div class="tools">
                        <i class="el-icon-menu "  @click="collapse"></i>
                        欢迎 ( {{roleName}} - {{ userName.username }})  登录生鲜馆后台管理系统
                    </div>
                </el-col>
                <el-col :span = "8" class="userinfo">
                        <a @click="logout"> 退出 </a>
                    <a>生鲜馆首页</a>
                </el-col>
            </el-col>
            <el-col :span="24" class="breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>首页 </el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col> 
        </el-col>    
</template>

<script>
 
 import { removeStore,getStore } from '@/config/storage'
export default {
    data() {
        return {
            userName:{
                username:getStore('username')?getStore('username').username:'',
            },
            collapsed:false,
        }
    },
    computed:{
        roleName(){
            return this.$store.state.role
        }
    },
    mounted(){
        // 判断是否登录成功
        if(getStore('username') == null ){
            this.$message('请先登录！')
            this.$router.push('/login')
        } 
         this.$store.dispatch('GenerateRoutes').then(res => {  
             console.log(res)
             if(res !== true){
                 this.$message(res)
                 this.$router.push('/login')
             }else{
                 let urls = getStore('addRouters')[0].path+'/' +getStore('addRouters')[0].children[0].path
                 this.$router.push(urls)
             } 
         })
       
    },
    methods:{

        collapse() {
            this.collapsed = !this.collapsed
            this.$emit('changeCollapsed',this.collapsed)
        },
        logout(){
            this.$store.dispatch('Logout').then((res) => {
                if(res) {
                    this.$router.push('/login')
                }
            })

        }
         
    }
     
}
</script>

<style lang="scss"  >
.header.header-dark{
     background-color:#242f42;
}
.header{
    width:100%;
    height:100px;
    color:white;
}
.header{
    background-color:#20a0ff;
    height: 70px;
    width:100%;
    line-height: 70px;
}
.header{
   &>.breadcrumb{
    height: 30px;
    line-height: 30px;
    padding-left: 260px;
    background-color: white;
}
.el-breadcrumb{
    line-height: 30px;
}
}
.header .logo{
    width:231px;
    padding:0 15px;
    font-size:18px;
    font-weight: 600;
    border-right:1px solid #f0f0f0;
}
.header .logo-collapse-width{
    width:60px;
    overflow: hidden;
}
.header .userinfo{
    float: right;
    font-size: 14px;
    padding-top: 5px;
    padding-right: 50px;
    text-align: right;
    line-height: 20px;
    
}
 
.header .userinfo  a{
      color:white;
    padding: 0 10px;
    border-left:1px solid #bfcbd9;
    &:first-child{
        border-left: none;
    }
    
}
 
.header .userinfo .el-dropdown-link{
    font-size:14px;
    
    cursor: pointer;
}
.header .userinfo .el-dropdown-link img{
    display: inline-block;
    border-radius: 50%;
    width:40px;
    height:40px;
    margin-top: 10px;
    // float:right;
}
.tools{
    padding: 0 20px;
    font-size: 18px;
    text-align: left
}
.tools i{
    margin-right:20px;
    cursor: pointer;
}
</style>
