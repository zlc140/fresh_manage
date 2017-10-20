<template>
  <el-col :span="24" :class="collapsed?'menu-collapsed':'menu-expanded'">
      <!--展开的侧边栏-->
      <el-menu class="el-menu-vertical-demo" :default-active="onRouter" :class="collapsed?'':'el-menu--dark'"
        @select="handleselect" unique-opened router>
        <template v-for="(item,index) in datas"   v-if="item.children">     
            <el-submenu :index="index+''" v-if="item.name!='后台首页'">
              <template slot="title"> {{item.name}} </template>
                <el-menu-item 
                    v-for="child in item.children" 
                    :index="item.path+'/'+child.path" 
                    :key="item.path+'/'+child.path" 
                   >
                {{child.name}}
                </el-menu-item>
            </el-submenu>
        </template>
      </el-menu>
     
  </el-col>
</template>

<script>
export default {
    props:['collapsed'],
    computed: {
         onRouter(){
             //这里通过路由得到的侧边栏，注意设置默认样式时需要处理
             let routs = this.$route.path.split('/')
             return '/'+routs[1]+'/'+routs[2]
      },
       datas() {
            return this.$store.state.addRouters
            // return this.$router.options.routes
        }
    },
    methods:{
        handleopen() {
			// console.log('handleopen');
         },
        handleclose() {
            // console.log('handleclose');
        },
        handleselect: function (a, b) {
             console.log(this.onRouter+"组件中")
             this.$emit('handleselect',this.onRouter)
            
        },
        showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
    }
}
</script>

<style>
 
 
.el-submenu__title{
    text-align:left;
    border-bottom : 1px solid #ccc;
}
.collapsed .el-submenu{
    position: relative;
}
.collapsed  .el-menu{
    position: absolute;
    display: none;
    z-index:999;
    left:60px;
    top:0;

}
.el-menu--dark .el-submenu.is-active .el-submenu__title{
    border-bottom:#1f2d3d solid 1px;
}
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
     border-bottom: #1f2d3d solid 1px;
}
.fa{
    margin: 0 4px;
}
.menu-expanded{
  /*flex-grow: 0;*/
  width:230px;
  padding:0px;
  min-width:230px;
  box-sizing: border-box;
  height:100%;
  background-color: #324157 ;
}
.menu-collapsed{
    width:230px;
    padding:0px;
    min-width:230px;
    box-sizing: border-box;
    height:100%;
    background-color:#eef1f6 ;
}
</style>
