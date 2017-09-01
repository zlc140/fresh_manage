<template>
  <div class="add dialog">
    <h3 class="title">{{title}} <span v-if="title == '编辑商品'" class="tip">注意：商品修改完成需等待平台审核之后才会生效！</span><el-button class="fr"  size="small" type="danger" :plain="true" @click.native="clean">取消</el-button></h3>
     
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-addForm">
        
        <el-form-item label="店铺名称" prop="storeId">
          <el-select v-model="addForm.storeId" v-on:change="changeStore()" placeholder="请选择店铺">
            <el-option v-for="(item,index) in  storeData" :key="index" :value="item.storeId" :label="item.storeName"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="classId">
          <el-select v-model="addForm.classId" v-on:change="changeclass()" placeholder="请选择分类">
            <el-option v-for="(item,index) in  classData" :key="index" :value="item.classId" :label="item.classTitle"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌">
          <el-select v-model="addForm.brandId" >
            <el-option v-for="(item,index) in  brandData" :key="index" :label="item.brandTitle" :value="item.brandId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsTitle">
          <el-input v-model="addForm.goodsTitle"></el-input>
        </el-form-item>
        <el-form-item label="市场价" required prop="marketPrice">
          <el-input v-model="addForm.marketPrice" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="成本价" required prop="costPrice">
          <el-input v-model="addForm.costPrice" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsSubTitle">
          <el-input v-model="addForm.goodsSubTitle"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" prop="keywords">
          <el-input v-model="addForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" required prop="repositoryNum">
          <el-input v-model="addForm.repositoryNum" type="number" min="0"></el-input>
        </el-form-item>
        <el-form-item label="商品单位sku" prop="sku">
          <el-input v-model="addForm.sku"  ></el-input >
        </el-form-item>
        <el-form-item label=" 商品提取佣金" required prop="commission">
          <el-input v-model="addForm.commission" type="number" min="0"></el-input>
        </el-form-item>

         <el-form-item label="上架时间">
              <el-col :span="6">
                <el-form-item required prop="soldInTime" >
                  <el-date-picker v-model="addForm.soldInTime" type="date" placeholder="上架开始时间"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">至</el-col>
              <el-col :span="6">
                <el-form-item  prop="soldOutTime">
                        <el-date-picker v-model="addForm.soldOutTime" type="date" placeholder="上架结束时间"></el-date-picker>
                </el-form-item>
                </el-col>
             
        </el-form-item>

        <el-form-item label="商品是否展示" prop="goodsShow">
          <el-switch on-text="" off-text="" v-model="addForm.goodsShow" on-text="是" off-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="商品图片" prop="imgs.path" required>
          <!-- 上传图片  -->
          <vue-core-image-upload 
              @getImg="getImg"
              v-if="modShow" 
              :picList="selectPic.picList" 
              :cropRatio="selectPic.radio" 
              :sizeBox='selectPic.size' 
              :multiple="selectPic.multiple" 
              :cropShow="selectPic.cropShow">
          </vue-core-image-upload>
          <p class="tip">提示：此处上传的商品图片应该长宽比为1:1,大小为800px*800px的图片以免图片失真</p>
        </el-form-item>

        <!-- 商品详情 -->
        <el-form-item label="商品详情" prop="goodsBody">
          <vue-editor v-model="addForm.goodsBody" @input="getContent" :value="editor.value">
          </vue-editor>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
import { addgoods, addbrandlist, classlist, selectStore,findSku,editgoods } from '@/service/getData'
export default {
  
  data() {
    var validateaddDate = (rule, value, callback) => {
                if(this.addForm.onlyShow == false){
                    if(value === ''){
                        callback(new Error('请选择开始时间'))
                    }else {
                        this.$refs.addForm.validateField('soldOutTime');
                    }
                    callback()
                } else {
                callback()
                }
            }; 
    var compareaddDate = (rule,value,callback) => {
            if(this.addForm.onlyShow == false){
                if(value === ''){
                    callback(new Error('请选择结束时间'))
                }
                else if(this.addForm.startTime !=='' && this.addForm.startTime.getTime() > value.getTime()-1){
                        callback(new Error('结束时间应该大于开始时间'))
                        
                }
                else if(this.addForm.startTime === ''){
                            this.$refs.addForm.validateField('soldInTime');
                }else{
                        callback()
                }
            }else {
            callback()
            }
    };
    return {
      modShow:false,
      title:'发布商品',
      // 添加商品的字段名
      addForm: {
        goodsTitle: '',//商品名称
        goodsSubTitle: '',//商品描述
        marketPrice: '0.00',//市场价
        costPrice: '0.00',//成本价
        storeId: '',//'店铺Id，平台可选，商家固定'
        classId: '',//'分类Id'
        brandId: '',//'品牌Id'
        imgs: [],//商品图片
        goodsBody: '',//商品详情
        keywords: '',//商品关键字
        repositoryNum: 0,//商品的库存有多少
        sku: '',//库存单元
        commission: '',//商品提取佣金
        goodsShow: true,//商品展示elementui的开关
        soldInTime: '',//商品开始时间
        soldOutTime: '',//商品结束时间  
         
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
        cropShow: true,
        multiple: true,
        picList: []
      },
      rules: {
        goodsTitle: [
          { required: true, message: '请输入商品名称', trigger: 'blur,change' },
        ],
        goodsSubTitle: [
          { required: true, message: '请对商品进行描述', trigger: 'blur,change' },
        ],
        // marketPrice: [
        //   { required: true, message: '请输入商品的市场价', trigger: 'blur,change' },
        // ],
        // costPrice: [
        //   { required: true, message: '请输入商品的成本价', trigger: 'blur,change' },
        // ],
        storeId: [
          { required: true, message: '请输入店铺编号', trigger: 'blur,change' },
        ],
        classId: [
          { required: true, message: '请输入分类编号', trigger: 'blur,change' },
        ],
        goodsBody: [
          { required: true, message: '请输入商品详情', trigger: 'blur,change' },
        ],
        // repositoryNum: [
        //   { required: true, message: '请输入商品库存', trigger: 'blur,change' },
        // ],
        sku: [
          { required: true, message: '请输入商品库存单元', trigger: 'blur,change' },
        ],
        soldInTime:[
          {validator:validateaddDate, trigger: 'change'}
        ],
        soldoUTTime:[
          {validator:compareaddDate, trigger: 'change'}
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
    
    if(this.$route.query.id){
       this.title = '编辑商品'
        this.getDetail(this.$route.query.id)
       
    }else{
      this.modShow = true
    }
     
  },
  methods: {
    // 编辑商品
    getDetail(val){
        let para =  { goodsId:val }
        let _this = this
        findSku(para).then(res => {
          if(res.data.state == 200){
            console.log(res.data)
            let datas = res.data.content
               _this.addForm = {
                  goodsTitle: datas.goods.goodsTitle,//商品名称
                  goodsSubTitle: datas.goods.goodsSubTitle,//商品描述
                  marketPrice: datas.goods.price.GOODS_MARKET_PRICE,//市场价
                  costPrice: datas.goods.price.GOODS_COST_PRICE,//成本价
                  storeId: datas.goods.store.storeId,//'店铺Id，平台可选，商家固定'
                  classId: datas.goods.goodsClass.classId,//'分类Id'
                  brandId: '',//'品牌Id'
                  imgs: datas.goods.goodsPic,//商品图片
                  goodsBody: datas.goods.goodsBody,//商品详情
                  keywords: datas.goods.keywords,//商品关键字
                  repositoryNum: datas.stockNum,//商品的库存有多少
                  sku: datas.sku,//库存单元
                  commission: datas.goods.commission,//佣金
                  goodsShow: datas.goods.goodsShow,//商品展示elementui的开关
                  soldInTime: datas.goods.soldInTime,//商品开始时间
                  soldOutTime: datas.goods.soldOutTime,//商品结束时间  
                 
                }
                _this.modShow = true
                _this.selectPic.picList =[]
                 datas.goods.goodsPic.forEach(v=> {
                    _this.selectPic.picList.push(v.path)
                })
                 _this.addForm.soldInTime = new Date(_this.addForm.soldInTime)
                 _this.addForm.soldOutTime = new Date(_this.addForm.soldOutTime)
                
          }
        })
    },
    // 店铺
    getStore() {
      selectStore().then((res) => {
        if(res.data.state == 200){
            this.storeData = res.data.content.content;
        }
        
      })
    },
    // 分类
    getclass() {
      classlist().then((res) => {
        let _this = this
        if(res.data.state == 200 ){
                let datas = res.data.content
                this.classData = []
                datas.forEach((child) => {
                    _this.classData.push({
                        classId: child.classId,
                        classTitle: child.classTitle
                    })
                    if (child.childClass && child.childClass.length > 0) {
                        child.childClass.forEach((item) => [
                            _this.classData.push({
                                classId: item.classId,
                                classTitle: '　　' + item.classTitle
                            })
                        ])
                    }
                })
          }

      })
    },
    getBrand(){
         let para = {
          storeId: this.addForm.storeId,
          classId: this.addForm.classId
        }
         addbrandlist(para).then((res) => {
           if(res.data.state == 200){
                this.brandData=[]
                this.brandData = res.data.content
          }
        })
    },
    changeStore: function() {
        this.getBrand()
      
    },
    changeclass: function() {
       this.getBrand()
    },
    onSubmit() {
      let _this = this
      this.$refs.addForm.validate((valid) => {
        if (valid) {
            let para = Object.assign({}, this.addForm);
            if(para.imgs.length<1){
              this.$message('商品图片为必传！')
              return false
            }
            para.imgs = JSON.stringify(para.imgs)
            para.soldInTime = para.soldInTime.getTime() + '';
            para.soldOutTime = para.soldOutTime.getTime() + '';
            console.log(para)
            if(!this.$route.query.id){
                 addgoods(para).then((res) => {
                    if(res.data.state == 200){
                        _this.$confirm('添加成功',{
                            confirmButtonText: '继续添加',
                            cancelButtonText: '去查看',
                        }).then(() => {
                            _this.selectPic.picList=[]
                            document.body.scrollTop = 0
                            _this.$refs['addForm'].resetFields()
                        }).catch(() => {
                          
                            _this.$router.push('/view/prolist')
                        })
                    }
                })
            }else{
               para.goodsId = this.$route.query.id
               editgoods(para).then((res) => {
                    console.log(res)
                    if(res.data.state == 200){
                        _this.$message(res.data.messages) 
                        _this.$router.push('/view/prolist')
                         
                    }
                })
          }
        }
      })
    },
    // 取消
    clean(addForm) {
      this.$router.push('/view/proList')
    },
    getImg(val) {
      let _this = this
      this.addForm.imgs = []
      if(val.length>0){
      val.forEach( v => {
        _this.addForm.imgs.push({
          path:v,
          title:''
        })
      })
      }else{
        _this.addForm.imgs=[]
      }
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
  width: 80%;
}
 

.add .el-select {
  display: inline-block;
  position: relative;
 
}

.add .block .el-input{
  width: 200px;
}

.add .el-date-editor.el-input {
  /* width: 193px; */
  float: left;
}

.add .quill-editor {
  position: relative;
 
}
</style>
