<template>
  <div>
    <el-row>
      <vue-core-image-upload 
          @getImg = "getImg" 
          :cropRatio = "radio" 
          :sizeBox = 'size' 
          :multiple="multiple"
          :cropShow="cropShow">
      </vue-core-image-upload>
      </el-row>
      <el-row>
         <vue-editor 
            @input="getContent" 
            :value="value">
          </vue-editor>
      </el-row>
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
export default {
  data(){
    return {
      // editor
     value:'这是编辑器的默认内容',
      // upImg
      radio:'1:1',
      size:['400','400'],
      cropShow:true,
      multiple:true
    }
  },
  components:{
    vueCoreImageUpload,vueEditor
  },
  methods:{
    getImg(val){
      console.log(val)
    },
    getContent(con){
      console.log('编辑器',con)
    }
  }
}
</script>

<style>
  
</style>
