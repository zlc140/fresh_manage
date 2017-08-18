<template>
  <div>
      品牌管理（增，删，查，改）图片上传
  </div>
</template>

<script>
export default {
    data(){
      return {
        addForm:{
          brandTitle:'',//品牌名称
          pics:[''],//图片
          storeId:12 //店铺Id，分类Id?
        }
      }
    }
}
</script>

<style>
  
</style>
