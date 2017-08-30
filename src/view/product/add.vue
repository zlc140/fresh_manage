<template>
  <div class="add">
    <el-row>
      <el-form :model="addForm" :rules="rules"  ref="addForm" label-width="100px" class="demo-addForm">
         <el-form-item label="店铺名称" prop="storeId">
          <el-select v-model="addForm.storeId" v-on:change="changeStore()">
            <el-option v-for="(item,index) in  storeData" :key="index" :label="item.storeId" :value="item.storeId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类编号" prop="classId">
           <el-select v-model="addForm.classId" v-on:change="changeclass()">
            <el-option v-for="(item,index) in  classData" :key="index" :label="item.classId" :value="item.classId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌编号" prop="brandId">
          <el-select v-model="addForm.brandId">
            <el-option v-for="(item,index) in  brandData" :key="index" :label="item.brandId" :value="item.brandId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsTitle">
          <el-input v-model="addForm.goodsTitle"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="addForm.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="成本价" prop="costPrice">
          <el-input v-model="addForm.costPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsBody">
          <el-input v-model="addForm.goodsBody"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" prop="keywords">
          <el-input v-model="addForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="repositoryNum">
          <el-input v-model="addForm.repositoryNum"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="sku">
          <el-input v-model="addForm.sku"></el-input>
        </el-form-item>
        <el-form-item label="商品佣金" prop="commission">
          <el-input v-model="addForm.commission"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required prop="soldInTime">
          <div class="block">
            <el-date-picker  v-model="addForm.soldInTime" type="datetime" placeholder="选择开始时间"> </el-date-picker>
          </div>
        </el-form-item>
         <el-form-item label="结束时间" required prop="soldOutTime">
          <div class="block">
            <el-date-picker v-model="addForm.soldOutTime"  type="datetime" placeholder="选择结束时间"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="商品展示" prop="goodsShow">
          <el-switch on-text="" off-text="" v-model="addForm.goodsShow"></el-switch>
        </el-form-item>
        <el-form-item label="上传图片" prop="imgs.path">
          <!-- 上传图片  -->
          <vue-core-image-upload
           @getImg="getImg" 
           :picList="selectPic.picList" 
           :cropRatio="selectPic.radio" 
           :sizeBox='selectPic.size' 
           :multiple="selectPic.multiple" 
           :cropShow="selectPic.cropShow">
          </vue-core-image-upload>
        </el-form-item>

        <!-- 商品详情 -->
        <el-form-item label="商品描述" prop="goodsSubTitle">
          <vue-editor v-model="addForm.goodsSubTitle" @input="getContent" :value="editor.value">
          </vue-editor>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="clean('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>

  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
import {addgoods,addbrandlist,classlist,selectStore} from '@/service/getData'
export default {
  data() {
    return {
      // 添加商品的字段名
      addForm: {
        goodsTitle: '',//商品名称
        goodsSubTitle: '',//商品描述
        marketPrice: '',//市场价
        costPrice: '',//成本价
        storeId: '',//'店铺Id，平台可选，商家固定'
        classId: '',//'分类Id'
        brandId: '',//'品牌Id'
        imgs: [''],//商品图片
        goodsBody: '',//商品详情
        keywords: '',//商品关键字
        repositoryNum: '',//商品的库存有多少
        sku: '',//库存单元
        commission: '',//佣金
        goodsShow: false,//商品展示elementui的开关
        storeId: '',//商品货号      
        soldInTime: '',//商品开始时间
        soldOutTime: '',//商品结束时间  
         imgs: {
          path: ''
        },         
      },
      // 品牌
      brandData: [],
      // 店铺
      storeData: [],
      // 分类
      classData: [],
      // editor
      editor: {
        value: '这是编辑器的默认内容',
      },
      selectPic: {
        radio: '1:1',
        size: ['400', '400'],
        cropShow: false,
        multiple: true,
        picList: []
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
          ],
        storeId: [
          { required: true, message: '请输入店铺编号', trigger: 'blur' },
        ],
        classId: [
          { required: true, message: '请输入分类编号', trigger: 'blur' },
        ],
        goodsBody: [
          { required: true, message: '请输入商品详情', trigger: 'blur' },
        ],
        repositoryNum: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
        ],
        sku: [
          { required: true, message: '请输入商品库存单元', trigger: 'blur' },
        ],
        commission: [
          { required: true, message: '请输入商品佣金', trigger: 'blur' },
        ],
        brandId: [
          { required: true, message: '请输入品牌编号', trigger: 'blur' },
        ]
      }

    };
  },
  components: {
    vueCoreImageUpload, vueEditor
  },
  mounted() {
     this.getStore()
     this.getclass() 
     this.selectPic.picList = []
  },
  methods: {
     // 店铺
    getStore(){
      selectStore().then((res)=>{
          this.storeData=res.data.content.content;
      })
    },
    // 分类
     getclass(){
       classlist().then((res)=>{
          this.classData=res.data.content;
      })
    },
    changeStore:function(){
      let para={
         storeId:this.addForm.storeId,
         classId:this.addForm.classId
      }
      if(para.classId!==''){
          addbrandlist(para).then((res)=>{
               this.brandData= res.data.content
          })
      }else{
        return false
      }
    },
    changeclass:function(){
         let para={
           storeId:this.addForm.storeId,
           classId:this.addForm.classId
        }
        if(para.storeId!==''){
           addbrandlist(para).then((res)=>{
             this.brandData= res.data.content
           })
        }else{
            return false
        }
    },
    onSubmit() {
      let _this = this
       this.$refs.addForm.validate((valid)=>{
         if (valid){
           this.$confirm('确定添加该分类？', '提示', {}).then(()=>{
             let para = Object.assign({}, this.addForm);
             para.imgs = JSON.stringify(para.imgs)
             para.soldInTime = para.soldInTime.getTime()+'';
             para.soldOutTime = para.soldOutTime.getTime()+'';
             console.log(para)
             addgoods(para).then((res)=>{
               console.log(res)
             })
           })
         }
       })
    },
    // 取消
    clean(addForm){
         this.$refs[addForm].resetFields();
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
    getImg(val) {
        this.addForm.imgs = []
        this.addForm.imgs.push({
          path: val[0]
        })
        console.log(this.addForm.imgs.push({
          path: val[0]
        }))
    },
    getContent(con) {
      // console.log('编辑器', con)
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
  width: 943px;
}

.add .el-form-item:last-child {
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
  width: 844px;
}

.add .block {
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
