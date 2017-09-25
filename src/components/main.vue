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
.edit-box{
  cursor: pointer;
}
.tip{
    color:orange;
    font-size: 14px;
    font-weight: normal;
}
.onlyOneRow{
    white-space: nowrap;
    display: inline-block;
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
  .main{
   display: flex;
  -webkit-display:flex;
  -ms-display:flex;
  width:100%;
  min-height:calc(100% - 70px);

}
.toolbar{
    padding: 10px 30px;
    text-align: right;
    .add{
        float:right;
    }
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
    //  position:absolute;
     background-color:white;
    //  left:0px;
    //  top:25px;
     width:100%;
     z-index:998;
     box-sizing:border-box;
     padding:30px;
     .el-form{
         padding: 0 50px;
     }
     .title{
         padding:10px 50px;
         margin-bottom:15px;
         border-bottom:1px solid #f0f0f0;
         color:#888;
         font-size:18px;
     }
 }
//  楼层一d的通过样式
.imgesList{
    width:700px;
    li{
        display: inline-block;
        width:195px;
        height: auto;
        margin-left: 8px;
        margin-bottom: 10px;
        img{
            width:100%;
        }
    &:first-child{
        margin-left: 0;
    }
    &:last-child{
        margin-left: 0;
        width:600px;
    }
    }
}
// 新增编辑
  .dialog-footer{
      text-align:center;
      border-top:1px solid #f0f0f0;
      padding:15px 0;
  }
   .dialog-footer .el-button{
       padding:10px 60px;
   }
   .dialog .el-input{
        max-width:600px;
   }
//    
.play_box {
  width: 100px;
  padding: 2px 0;
  text-align: center;
  margin-left: -20px;
}
.play_box .el-button{
    padding: 5px;
    margin: 0;
}

// 图片列表
.imgList {
    // display: inline-block;
    overflow: hidden;
    position: relative;
    li {
        float: left;
        width: 100px;
        height: 100px;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
            height: auto;
            margin: auto;
            position: absolute;
            left: 0;
            top: 0;
            left:0;
            bottom:0;
        }
        .doing{
            position: absolute;
            display: inline-block;
            left: 0;
            width:100%;
            height: 100%;
            top: 0;
            color: #8492A6;
            display: none;
            text-align: center;
            line-height: 100px;
            background-color: rgba(0,0,0,0.3);
            i{
                cursor: pointer;
                margin-right: 3px;
                font-size: 18px;
                &:hover{
                    font-size: 20px;
                }
            }
        }
        &:hover .doing{
            display: block;
        }
    }
   
}
// 搜索
.search_pro .el-form-item {
  margin-bottom: 22px;
  float: left;
}


 .search_pro .section {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-grow: 1;
  -ms-flex-grow: 1;
  max-width: calc(100% - 260px);
  padding: 55px 20px 10px;
}

 .search_pro .el-button--primary {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
  margin-left: 40px;
}


</style>
