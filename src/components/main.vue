<template>
  <div>
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

<style>
  .main{
   display: flex;
  -webkit-display:flex;
  -ms-display:flex;
  position: absolute;
  top: 70px;
  width:100%;
  bottom: 0;

}

.section{
  flex-grow: 1;  
  -webkit-flex-grow: 1;
  -ms-flex-grow: 1;
  max-width:calc(100% - 260px);
  padding:30px 20px 10px;
  overflow: hidden;
  overflow-y:auto;
  
}
.section>div{
    background-color: #ccc;
}
.aside{
  max-width:230px;
}
</style>
