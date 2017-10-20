<template>
  <div class="add dialog">
    <h3 class="title">{{title}}
      <span v-if="title == '编辑商品'" class="tip">注意：商品修改完成需等待平台审核之后才会生效！</span>
      <el-button class="fr" size="small" type="danger" :plain="true" @click.native="clean">取消</el-button>
    </h3>

    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-addForm">
      <el-form-item v-show="classData.length<1">
        <p class="tip">发布商品之前请先 创建店铺，分类以及品牌！</p>
      </el-form-item>
      <el-form-item label="店铺名称" prop="" required v-if="seachMove && title == '发布商品'">
        <el-select v-model="storeId" v-on:change="changeStore()" placeholder="请选择店铺">
          <el-option v-for="(item,index) in  storeData" :key="index" :value="item.storeId" :label="item.storeName"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="classId">
        <el-select v-model="addForm.classId" v-on:change="changeclass()" placeholder="请选择分类">
          <el-option v-for="(item,index) in  classData" :key="index" :value="item.classId" :label="item.classTitle"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌">
        <el-select v-model="addForm.brandId">
          <el-option v-for="(item,index) in  brandData" :key="index" :label="item.brandTitle" :value="item.brandId"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsTitle">
        <el-input v-model="addForm.goodsTitle"></el-input>
      </el-form-item>
      <el-form-item label="市场价" required prop="marketPrice">
        <el-input v-model="addForm.marketPrice" placeholder="价格保留小数点后两位" type="number" step="0.01"></el-input>
      </el-form-item>
      <el-form-item label="成本价" required prop="costPrice">
        <el-input v-model="addForm.costPrice" type="number"  step="0.01" placeholder="价格保留小数点后两位"></el-input>
      </el-form-item>
       <el-form-item label="商品单位" prop="sku">
        <el-input v-model="addForm.sku"></el-input>
      </el-form-item>
      <el-form-item label=" 商品提取佣金" required prop="commission">
        <el-input v-model="addForm.commission" type="number"  step="0.01"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="goodsSubTitle">
        <el-input v-model="addForm.goodsSubTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字" prop="keywords">
        <el-input v-model="addForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" required prop="repositoryNum">
        <el-input v-model="addForm.repositoryNum" type="number"  step="1"></el-input>
      </el-form-item>
     

      <el-form-item label="上架时间" required>
        <el-col :span="6">
          <el-form-item required prop="soldInTime">
            <el-date-picker v-model="addForm.soldInTime" type="datetime" placeholder="上架开始时间"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">至</el-col>
        <el-col :span="6">
          <el-form-item prop="soldOutTime">
            <el-date-picker v-model="addForm.soldOutTime" type="datetime" placeholder="上架结束时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="商品是否展示" prop="goodsShow">
        <el-switch on-text="" off-text="" v-model="addForm.goodsShow" on-text="是" off-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="商品图片" prop="imgs.path" required>
        <!-- 上传图片  -->
        <vue-core-image-upload @getImg="getImg" v-if="modShow" :picList="selectPic.picList" :cropRatio="selectPic.radio" :sizeBox='selectPic.size' :multiple="selectPic.multiple" :cropShow="selectPic.cropShow">
        </vue-core-image-upload>
        <p class="tip">提示：此处上传的商品图片应该长宽比为1:1,大小为800px*800px的图片以免图片失真</p>
      </el-form-item>

      <!-- 商品详情 -->
      <el-form-item label="商品详情" prop="goodsBody">
      <p class="tip">提示：商品详情上传的图片宽为1120px</p>
        <vue-editor v-model="addForm.goodsBody" @input="getContent" :value="editor.value">
        </vue-editor>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{this.$route.query.id?'确认编辑':'立即创建'}}</el-button>
         <span v-if="title == '编辑商品'" class="tip">注意：商品价格修改次日生效，库存与上下架时间马上生效，其他属性需管理员审核后才会生效！</span>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
import { addgoods, addbrandlist, classlist, selectAllStore,getMyStore, findgoods, editgoods } from '@/service/getData'
import { getStore } from '@/config/storage'
export default {

  data() {
    var validateaddDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择开始时间'))
      } else {
        callback()
      }
    };
    var compareaddDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择结束时间'))
      }
      else if (this.addForm.soldInTime !== '' && this.addForm.soldInTime.getTime() > value.getTime() - 1) {
        callback(new Error('结束时间应该大于开始时间'))
      } else {
        callback()
      }
    };
    var nospace = (rule, value, callback) => {
      if (value.trim() == '') {
        callback(new Error('不能输入一串空字符'))
      } else {
        callback()
      }
    };
    var minNum = (rule, value, callback) => {
      let pas = /^(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/
      if (parseFloat(value) < 0.01) {
        callback(new Error('价格不能少于0.01'))
      }else if( !pas.test(value) ){
      callback(new Error('价格格式不正确'))
      } else {
        callback()
      }
    }
    var MoreZero = (rule, value, callback) => {
      let pas = /^(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/
      if (parseFloat(value) < 0) {
        callback(new Error('佣金必须大于0'))
      }else if( !pas.test(value) ){
        callback(new Error('佣金格式不正确'))
      } else {
        callback()
      }
    }

    var kcNum = (rule, value, callback) => {
      let par = /^(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/
      let str = value + ''
      if(parseFloat(value) == NaN ){
         callback(new Error('库存格式不正确'))
      }else if (parseFloat(value) < 1) {
        callback(new Error('库存不少于1'))
      } else if (str.indexOf('.') + 1 > 1) {
        callback(new Error('库存应为整数'))
        console.log(parseInt(value))
      } else if (!par.test(value)) {
        callback(new Error('库存格式不正确'))
      }else {
        callback()
      }
    }
    return {
      tip: true,
      modShow: false,
      title: '发布商品',
      // 添加商品的字段名
      storeId: '',//'店铺Id，平台可选，商家固定'
      addForm: {
        goodsTitle: '',//商品名称
        goodsSubTitle: '',//商品描述
        marketPrice: '0.00',//市场价
        costPrice: '0.00',//成本价
       
        classId: '',//'分类Id'
        brandId: '',//'品牌Id'
        imgs: [],//商品图片
        goodsBody: '',//商品详情
        keywords: '',//商品关键字
        repositoryNum: 0,//商品的库存有多少
        sku: '',//库存单元
        commission: '0.00',//商品提取佣金
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
        repositoryNum: [
          { validator: kcNum, trigger: 'blur' }
        ],
        marketPrice: [
          { validator: minNum, trigger: 'blur' }
        ],
        costPrice: [
          { validator: minNum, trigger: 'blur' }
        ],
        commission: [
          { validator: MoreZero, trigger: 'blur' }
        ],
        goodsTitle: [
          { required: true, message: '请输入商品名称', trigger: 'blur,change' },
          { validator: nospace, trigger: 'blur' }
        ],
        goodsSubTitle: [
          // { validator: nospace, trigger: 'blur' }
        ],
       
        classId: [
          { required: true, message: '请输入分类编号', trigger: 'blur,change' },
          { validator: nospace, trigger: 'blur' }
        ],
        goodsBody: [
          { required: true, message: '请输入商品详情', trigger: 'blur,change' },
          { validator: nospace, trigger: 'blur' }
        ],
        sku: [
          { required: true, message: '请输入商品库存单位', trigger: 'blur,change' },
          { validator: nospace, trigger: 'blur' }
        ],
        soldInTime: [
          { validator: validateaddDate, trigger: 'change' }
        ],
        soldOutTime: [
          { validator: compareaddDate, trigger: 'change' }
        ],
      },
      seachMove:true

    };
  },
  components: {
    vueCoreImageUpload, vueEditor
  },
  mounted() {

     if(getStore('roleName') &&　getStore('roleName').roleCode.indexOf('SELLER')>0){
      this.seachMove = false
       getMyStore().then(res => {
        console.log('myStore',res)
        if(res.data.state == 200 && res.data.messages =="店铺未通过审核！"){
             this.$message('店铺未通过审核！不能添加或编辑商品')
             this.$router.push('/view/prolist')
        }else if(res.data.state == 200 && res.data.messages != '暂无数据！'){
            this.storeId = res.data.content.storeId
        }else{
          this.$message(res.data.messages)
          this.$router.push('/view/prolist')
          
        }
      })
    } 
    if(this.title == '发布商品'){
      this.getStore()
    }
    
    this.getclass()

    if (this.$route.query.id) {
      this.title = '编辑商品'
      this.getDetail(this.$route.query.id)

    } else {
      this.modShow = true
    }

  },
  methods: {
    // 编辑商品
    getDetail(val) {
      let para = { goodsId: val }
      let _this = this
      findgoods(para).then(res => {
        console.log('product',res)
        if (res.data.state == 200) {
          let datas = res.data.content
          _this.addForm = {
            goodsTitle: datas.goodsTitle,//商品名称
            goodsSubTitle: datas.goodsSubTitle?datas.goodsSubTitle:'',//商品描述
            marketPrice: datas.price.GOODS_MARKET_PRICE?datas.price.GOODS_MARKET_PRICE:'',//市场价
            costPrice: datas.price.GOODS_COST_PRICE?datas.price.GOODS_COST_PRICE:'',//成本价
            classId: datas.goodsClass.classId,//'分类Id'
            brandId: datas.brand?datas.brand.brandId:'',//'品牌Id'datas.brandId
            imgs: datas.goodsPic,//商品图片
            goodsBody: datas.goodsBody,//商品详情
            keywords: datas.keywords?datas.keywords:'',//商品关键字
            repositoryNum: datas.goodsStock.stockNum,//商品的库存有多少
            sku: datas.goodsStock.sku,//库存单元
            commission: datas.commission,//佣金
            goodsShow: datas.goodsShow,//商品展示elementui的开关
            soldInTime: datas.soldInTime,//商品开始时间
            soldOutTime: datas.soldOutTime,//商品结束时间  

          }
          _this.storeId = datas.store?datas.store.storeId:''
          _this.addForm.commission = _this.addForm.commission.toString()
          _this.modShow = true
          _this.selectPic.picList = []
          datas.goodsPic.forEach(v => {
            _this.selectPic.picList.push(v.path)
          })
          _this.addForm.soldInTime = new Date(_this.addForm.soldInTime)
          _this.addForm.soldOutTime = new Date(_this.addForm.soldOutTime)

        }
      })
    },
    // 店铺
    getStore() {
      
      let _this = this
      if(this.seachMove == true){
      selectAllStore().then((res) => {
        console.log('stores',res)
        if (res.data.state == 200) {
          _this.storeData = res.data.content;
        }
      })
      }
      // else{
      //    getMyStore().then(res => {
      //       console.log('myStore',res)
      //       if(res.data.state == 200 && res.data.messages != '暂无数据！'){
      //           _this.storeId = res.data.content.storeId
      //       }else{
      //         this.$message('您的店铺还没有审核，请确认是否完善资料！')
      //       }
      //     })
      // }
    },
    // 分类
    getclass() {
      classlist().then((res) => {
        let _this = this
        if (res.data.state == 200) {

          let datas = res.data.content
          this.classData = []
          if (!datas) {
            return false
          }
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
    getBrand() {
      let para = {
        storeId: this.storeId,
        classId: this.addForm.classId
      }
      console.log(para)
      addbrandlist(para).then((res) => {
        console.log('brand',res)
        if (res.data.state == 200) {
          this.brandData = []
          this.brandData = res.data.content
        }
      })
    },
    changeStore: function() {
      if(this.storeId != '' && this.addForm.classId !=''){
           this.getBrand()
      }
    },
    changeclass: function() {
      if(this.storeId != '' && this.addForm.classId !=''){
           this.getBrand()
      }
    },
    onSubmit() {
      let _this = this
      console.log('teset',this.storeId,this.seachMove)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let para = Object.assign({}, this.addForm);
          if (para.imgs.length < 1) {
            this.$message('商品图片为必传！')
            return false
          }

          para.imgs = JSON.stringify(para.imgs)
          if (para.soldInTime == '') {
            para.soldInTime = ''
          } else {
            para.soldInTime = para.soldInTime.getTime() + '';
          }
          if (para.soldOutTime == '') {
            para.soldOutTime = ''
          } else {
            para.soldOutTime = para.soldOutTime.getTime() + '';
          }
          if (!this.$route.query.id) {
           
              para.storeId = _this.storeId
            
            console.log('add',para)
            this.modShow = false
            addgoods(para).then((res) => {
              console.log('add',res)
              if (res.data.state == 200) {
                _this.$confirm('添加成功', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '去查看',
                }).then(() => {
                  _this.selectPic.picList = []
                   this.modShow = true
                  document.body.scrollTop = 0
                  _this.$refs['addForm'].resetFields()
                }).catch(() => {
                  _this.$router.push('/view/prolist')
                })
              }else{
                this.$message(res.data.messages)
                _this.$router.push('/view/prolist')
              }
            })
          } else {
            para.goodsId = this.$route.query.id
            console.log('go',para)
            
            editgoods(para).then((res) => {
              console.log(res)
              if (res.data.state == 200) {
                _this.$message(res.data.messages)
                _this.$router.push('/view/prolist')

              }else{
                this.$message(res.data.messages)
                _this.$router.push('/view/prolist')
              }
            })
          }
        }else{
           document.documentElement.scrollTop=0
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
      if (val.length > 0) {
        val.forEach(v => {
          _this.addForm.imgs.push({
            path: v,
            title: ''
          })
        })
      } else {
        _this.addForm.imgs = []
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

.add .block .el-input {
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
