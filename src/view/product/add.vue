<template>
  <div class="add">
    <el-row>
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-addForm">
  <el-form-item label="商品名称" prop="goodsTitle">
   <el-input v-model="addForm.goodsTitle"></el-input>
  </el-form-item>
  <el-form-item label="商品描述" prop="goodsSubTitle">
     <el-input v-model="addForm.goodsSubTitle"></el-input>
  </el-form-item>
    <el-form-item label="市场价" prop="marketPrice">
      <el-input v-model="addForm.marketPrice"></el-input>
  </el-form-item>
   <el-form-item label="成本价" prop="costPrice">
        <el-input v-model="addForm.costPrice"></el-input>
  </el-form-item> 
   <el-form-item label="选择分类"  >
        <el-select  v-model="addForm.States" >
           <el-option v-for="item in options"   :key="item.value" :label="item.label" :value="item.value">  </el-option> 
        </el-select>
      </el-form-item>
 <el-form-item label="选择品牌"  >
        <el-select  v-model="addForm.States" >
           <el-option v-for="item in options"   :key="item.value" :label="item.label" :value="item.value">  </el-option> 
        </el-select>
      </el-form-item>
   <el-form-item label="商品详情" prop="goodsBody">
     <el-input v-model="addForm.goodsBody"></el-input>
  </el-form-item>
   <el-form-item label="商品关键字" prop="keywords">
      <el-input v-model="addForm.keywords"></el-input>
  </el-form-item>
   <!-- <el-form-item label="商品货号" prop="storeId">
       <el-input v-model="addForm.storeId"></el-input>
  </el-form-item> -->
     <el-form-item label="商品库存" prop="repositoryNum">
       <el-input v-model="addForm.repositoryNum"></el-input>
  </el-form-item>
   <el-form-item label="商品佣金" prop="commission">
      <el-input v-model="addForm.commission"></el-input>
  </el-form-item> 
     <el-form-item label="活动时间" required> 
      <div class="block">
        <el-date-picker  type="datetime" placeholder="选择开始时间"> </el-date-picker>
     </div>
       <div class="block">
        <el-date-picker  type="datetime"  placeholder="选择结束时间"  align="right"></el-date-picker>
     </div>
  </el-form-item>  
  <el-form-item label="商品展示" prop="goodsShow">
    <el-switch on-text="" off-text="" v-model="addForm.goodsShow"></el-switch>
  </el-form-item>
   <el-form-item label="上传图片" prop="goodsShow">
     <!-- 上传图片  -->
          <vue-core-image-upload  
           @getImg = "getImg"  
            :picList="selectPic.picList"
          :cropRatio = "selectPic.radio" 
          :sizeBox = 'selectPic.size' 
          :multiple="selectPic.multiple"
          :cropShow="selectPic.cropShow">
      </vue-core-image-upload>  
  </el-form-item> 
  
   <!-- 商品详情 -->
   <el-form-item label="商品详情">
         <vue-editor   @input="getContent"   :value="editor.value">
          </vue-editor>
  </el-form-item>
  <!-- 按钮 -->
   <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item> 
      </el-form>
 </el-row>
     
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
export default {
  data(){
    return {
      // 上传图片
        options: [
          {
          value: '20',
          label: '水果'
          }, {
            value: '30',
            label: '食品'
          }
        ],
         options2: [
          {
          value: '20',
          label: '品牌1'
          }, {
            value: '30',
            label: '品牌2'
          }
        ],
       // 添加商品的字段名
      addForm:{
          States:'',
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
          goodsShow:false,//商品展示elementui的开关
          soldInTime:1156465145,//商品开始时间
          soldOutTime:1156465145,//商品结束时间   
          storeId:12,//商品货号      
      },
      // editor
      editor:{
          value:'这是编辑器的默认内容',
      },
      selectPic:{
         // upImg
        radio:'1:1',
        size:['400','400'],
        cropShow:false,
        multiple:true,
        picList:[]
      },
      rules: {
            goodsTitle: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
           goodsSubTitle: [
            { required: true, message: '请对商品进行描述', trigger: 'blur' },
          ],
          marketPrice: [
            { required: true, message: '请输入商品的市场价', trigger: 'blur' },
          ],
          costPrice: [
            { required: true, message: '请输入商品的成本价', trigger: 'blur' },
          ]
        }
    
      };
    },
  components:{
    vueCoreImageUpload,vueEditor
  },
  mounted(){
      
  },
  methods:{
     onSubmit() {
        console.log('submit!');
      },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
.add .el-row {
    box-sizing: border-box;
    padding-top: 20px;
}
.add .el-form-item {
    margin-bottom: 22px;
    float: left;
    width: 660px;
}
.add .el-form-item:nth-child(13){
   width:1280px; 
}
.add .el-form-item:last-child{
  width: 1325px;
}
.add .content {
    width: 100%;
    height: 100px;
    padding: 20px;
    border: 1px solid #ccc;
}
.add .el-select {
    display: inline-block;
    position: relative;
    width: 560px;
}
.add .block{
  width: 700px;
}
.add .el-date-editor.el-input {
    width: 193px;
    float: left;
}
.add .quill-editor {
    position: relative;
    min-width: 1225px;
}
</style>
