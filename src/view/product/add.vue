<template>
  <div>
    <el-row>
      <vue-core-image-upload 
          @getImg = "getImg" 
          :cropRatio = "selectPic.radio" 
          :sizeBox = 'selectPic.size' 
          :multiple="selectPic.multiple"
          :cropShow="selectPic.cropShow">
      </vue-core-image-upload>
      </el-row>
      <el-row>
         <vue-editor 
            @input="getContent" 
            :value="editor.value">
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
      editor:{
          value:'这是编辑器的默认内容',
      },
      selectPic:{
         // upImg
        radio:'1:1',
        size:['400','400'],
        cropShow:true,
        multiple:true
      },
      // 添加商品的字段名
      addForm:{
          goodsTitle:'',//商品名称
          goodsSubTitle:'',//商品描述
          marketPrice:123.0222,//市场价
          costPrice:156.123,//成本价
          storeId:1023,//'店铺Id，平台可选，商家固定'
          classId:124,//'分类Id'
          brandId:234,//'品牌Id'
          imgs:[''],//商品图片
          goodsBody:'',//商品详情
          keywords:'',//商品关键字
          repositoryNum:213,//库存
          commission:123,//佣金
          goodsShow:false,//商品展示
          soldInTime:1156465145,//商品开始时间
          soldOutTime:1156465145//商品结束时间
      }
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
