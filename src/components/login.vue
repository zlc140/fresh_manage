<template>
        <div class="" id="auth" :style="bg">
             <star-flow></star-flow> 
            <div class="form_box">
              <h2>生鲜馆后台管理系统</h2>
            <el-form :model="user" :rules="rules" ref="ruleForm" label-position="center" v-loading="loginLoading" class="demo-ruleForm login-container" >
                
                 <el-form-item prop="username">
                <el-input placeholder = "请输入用户名" v-model="user.username" @keyup.enter.native="check">
                    <template slot="prepend">
                       <i class="el-icon-edit"></i>
                    </template>    
                </el-input>
                 </el-form-item>
                  <el-form-item prop="password">
                <el-input placeholder="请输入密码" type="password" v-model="user.password" @keyup.enter.native="check">
                     <template slot="prepend">
                       <i class="el-icon-message"></i>
                    </template>  
                </el-input> 
                </el-form-item>   
                 <el-form-item>
                    <el-button type="primary" class="btn" @click="check">登录</el-button>
                </el-form-item>
                
            </el-form>    
            </div>  
        </div>
</template>
<script>
 
import {Login} from '@/service/config_router.js'
import { getStore } from '@/config/storage'
import starFlow from "./startFlow"
    export default {
        data() {
            return {
                loginLoading:false,
                bg:{background:"url("+require('../assets/auth-bg.jpg')+") no-repeat",backgroundSize:"100% 100%"},
                user:{
                    username:'admin',
                    password: ''                
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
               
            },
            }
        },
        components:{
            starFlow
        },
        mounted(){
           
        },
         computed: {
            // 验证手机号
            rightPhoneNumber: function () {
                    return /^1[34578]\d{9}$/gi.test(this.user.username) 
            }
        },
        methods: {
            getValue (url) {
                    let values = {}
                    if(url.indexOf('?') != -1) {
                        let str = url.substr(1)
                        let strs = str.split('redirect=');
                        values['redirect'] = strs[1]
                    }
                    
                    return values
            }, 
            check () {
               let _this = this
              this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                    if(getStore('username') != null){//当前有账号登录，却要登录另一个号怎么处理
                         this.$router.push('/view/prolist')
                         return false
                    }
                    let prop={
                        name:this.user.username
                    }

                    Login(prop).then((res) => {
                        this.$router.push('/view/prolist')
                           
                    })
                     
                 
                    // this.loginLoading=true
                    // this.$store.dispatch('checkUser',this.user).then((res) => {
                    //     this.loginLoading=false
                    //     if(res == false){
                    //         this.$message('用户名或密码不正确')
                    //         return false
                    //     }else if(res == true){
                    //         let url = decodeURIComponent(window.location.search)
                    //         if(url == ''){
                    //             this.$router.push('/index/userList')
                    //         }else{
                    //             this.$router.push(decodeURIComponent(this.getValue(url).redirect))
                    //         }
                            
                    //     }else{
                    //          this.$message('请勿重复登录！')
                    //          this.$router.push('/index/userList')
                    //     }
                         
                    // })
                    }
                })

            },
           
        }
    }
</script>
<style>
    #auth{
        width:100%;
        height:100%;
        overflow: hidden;
        position: relative;

    }
    #auth h2{
      color: white;
      font-size: 28px;
      margin: 20px 0;
      text-align: center;
    }
    #auth .form_box{
        position: absolute;
        top:50%;
        left:50%;
        margin-left:-150px;
        transform: translateY(-50%);
    }
    #auth .el-form{
        width:300px;
        padding: 20px;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 0 21px #cac6c6;
    }
     #auth .el-form-item{
         margin-bottom: 15px;
     }
     #auth .el-input{
        margin: 10px 0;
    }
     #auth .btn{
        width:300px;
        margin-top:10px;
    }
     .el-button+.el-button{
        margin-left: 0 !important;
    }
     .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
