<template>
        <el-col :span="24" class="header" :class="collapsed?'':'header-dark'">
            <el-col :span="24" class="top" >
                <el-col :span="6" class="logo" >
                    <img src="../assets/logo.png" alt="">
                </el-col>
                <el-col :span="10">
                    <div class="tools">
                        <i class="el-icon-menu "  @click="collapse"></i>
                        欢迎  登录生鲜馆后台管理系统
                    </div>
                </el-col>
                <el-col :span = "8" class="userinfo">
                  
                        <a>
                        退出 
                        </a>
                        <!-- <el-dropdown trigger = "hover">
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown> -->
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
 
 
export default {
    data() {
        return {
            userName:'',
            collapsed:false,
        }
    },
    async mounted(){
        

    },
    methods:{
        collapse() {
            this.collapsed = !this.collapsed
            this.$emit('changeCollapsed',this.collapsed)
        }
         
    }
     
}
</script>

<style lang="scss"  >
.header.header-dark>.top{
     background-color:#242f42;
}
.header{
    width:100%;
    height:100px;
    color:white;
}
.header>.el-col{
    background-color:#20a0ff;
    height: 70px;
    width:100%;
    line-height: 70px;
}


.header>.breadcrumb{
    height: 30px;
    line-height: 30px;
    padding-left: 260px;
    background-color: white;
}
.el-breadcrumb{
    line-height: 30px;
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
