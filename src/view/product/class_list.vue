<template>
  <div>
      商品分类管理（增，删，查，改）
  </div>
</template>

<script>
export default {
    data(){
      return {
        addForm:{
          classTitle:'商品分类名称',
          parentClassId:123123,//父级分类id
          pics:[''],//图片
          keywords:'',//关键字
          gcShow:'',
          brandIds:[]//商标
        }
      }
    }
}
</script>

<style>
  
</style>
