<template>
  <div class="content">
        <head-bar @changeCollapsed="changeCollapsed"></head-bar>
        <div class="main">
            <div class="aside">
                <side-bar :collapsed ="collapsed"></side-bar>
            </div>
            <div class="section">
                <router-view></router-view>
            </div>
        </div> 
  </div>
</template>

<script>
import sideBar from './aside'
import headBar from './head'
export default {
    data(){
        return {
            collapsed:false
        }
    },
    components:{
        sideBar,headBar
    },
    methods:{
        changeCollapsed(value){
            this.collapsed = value
        }
    }
}
</script>

<style lang="scss">
.tip{
    color:orange;
}
  .main{
   display: flex;
  -webkit-display:flex;
  -ms-display:flex;
  width:100%;
  min-height:calc(100% - 70px);

}
.toolbar{
    padding: 10px 30;
    text-align: right;
}
.section{
    position:relative;
  flex-grow: 1;  
  -webkit-flex-grow: 1;
  -ms-flex-grow: 1;
  max-width:calc(100% - 270px);
  padding:50px 20px 10px;
  /* overflow: hidden;
  overflow-y:auto; */
  
}
.section>div{
    /* background-color: #ccc; */
}
.aside{
  max-width:230px;
}
.el-button {
    padding: 7px 15px;
}
 .dialog{
     position:absolute;
     background-color:white;
     left:0px;
     top:25px;
     width:100%;
     z-index:998;
     box-sizing:border-box;
     padding:30px;
     .title{
         padding:10px 50px;
         margin-bottom:15px;
         border-bottom:1px solid #f0f0f0;
         color:#888;
         font-size:18px;
     }
 }
</style>
