<template>
  <div class="dialog banner small">
    <h3 class="title">{{title}} <el-button class="fr"  size="small" type="danger" :plain="true" @click.native="clean">取消</el-button></h3>
     <el-form :model="addForm" :rules="addFormRules" label-width="80px" ref="addForm">
        <el-form-item label="分类名称" prop="classTitle">
          <el-input v-model="addForm.classTitle" placeholder="分类名称长度应在2-10位，推荐3-6个汉字" auto-complete="off"  @keyup.enter.native="check"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="addForm.keywords" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="gcShow">
          <el-switch v-model="addForm.gcShow" on-text="是" off-text="否"></el-switch>
        </el-form-item>
        <!-- hover前图片  -->
        <el-form-item label="鼠标移入" prop="pics[0].path" required v-if="parentClass">
          <template scope="scope">
            <vue-core-image-upload v-if="picShow" @getImg="addImg" :cropRatio="selectPic.radio" :picList="selectPic.picList" :sizeBox='selectPic.size' :multiple="selectPic.multiple" :cropShow="selectPic.cropShow">
            </vue-core-image-upload>
          </template>
        </el-form-item>
        <!-- hover后图片  -->
        <el-form-item label="鼠标移出" prop="pics[1].path" required v-if="parentClass">
          <template scope="scope">
            <vue-core-image-upload v-if="picShow" @getImg="addgetImg" :cropRatio="selectPic.radio" :picList="selectPic2.picList" :sizeBox='selectPic.size' :multiple="selectPic.multiple" :cropShow="selectPic.cropShow">
            </vue-core-image-upload>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addSubmit">保存</el-button>
      </div>
</div>
</template>

<script>
import { addClass, editData } from '@/service/getData'
import vueCoreImageUpload from '@/components/uploadImg'
export default {
    data(){
         var nospace = (rule, value, callback) => {
            var par = /^[a-zA-Z\u4E00-\u9FA5\_]{2,10}$/
            if (!par.test(value) && value.trim() != '') {
                callback(new Error('分类名称为中英文,下划线，长度2~10位'));
            } else if (value.trim() == '') {
                callback(new Error('分类名称不能为空'))
            } else {
                callback()
            }
         };
        return{
            parentClass:true,
            selectPic: {
                radio: '1:1',
                size: ['60', '60'],
                cropShow: false,
                multiple: false,
                picList: []
            },
            selectPic2: {
                radio: '1:1',
                size: ['60', '60'],
                cropShow: false,
                multiple: false,
                picList: []
            },
            picShow:false,
            addLoading:false,
            addForm : {
                classTitle: '',
                keywords: '',
                gcShow: true,
                pics: [
                {
                    path: ''
                },
                {
                    path: ''
                }],
            },
            addFormRules: {
                classTitle: [
                    { required: true, message: '分类名称不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ]
            },
        }
    },
    components:{
        vueCoreImageUpload
    },
    props:{
        type:{
            type:String,
            default:'add'
        },
        title:{
            type:String,
            default:'添加分类' 
        },
        formData:{
            type:Object,
            default:null
        }
    },
    mounted(){
        this.picShow = true
        if(this.type=="edit"){
            this.addForm = {
                classId: this.formData.classId,
                classTitle: this.formData.classTitle,
                keywords: this.formData.keywords,
                gcShow: this.formData.gcShow,
                pics: [
                    {
                        path: this.formData.classPic[0].path
                    },
                    {
                        path: this.formData.classPic[1].path
                    }],
                
            }
            this.selectPic.picList=[]
            this.selectPic2.picList
            this.selectPic.picList.push(this.formData.classPic[0].path)
            this.selectPic2.picList.push(this.formData.classPic[1].path)
        }
        if(this.type=="editChild" || this.type=="addChild"){
            this.parentClass = false
             this.addForm = Object.assign({},this.formData)
        }
    },
    methods:{
        // 回车
        check(){
            this.addSubmit()
        },
        // 取消
        clean(){
            this.$refs['addForm'].resetFields()
            this.$emit('close',true)
        },
        // 保存
        addSubmit(){
            let _this = this
             
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                    let para = {
                        classTitle:this.addForm.classTitle,
                        keywords: this.addForm.keywords,
                        gcShow: this.addForm.gcShow,
                    }
                    if(this.type == 'add' || this.type == "edit"){
                        if(this.addForm.pics[0].path == '' || this.addForm.pics[1].path==''){
                            this.$message('请上传banner图片')
                            return false
                        }
                        para.pics = this.addForm.pics
                        para.pics = JSON.stringify(para.pics)
                    }
                   if(this.type=='add'){
                         addClass(para).then((res) => {
                            this.addLoading = true;
                              this.$emit('close',true)
                        })
                   }else if(this.type=='edit'){
                        para.classId = this.addForm.classId
                        editData(para).then((res) => {
                            this.editFormLoading = true;
                            this.$emit('close',true)
                        })
                   }else if(this.type=="addChild"){
                       para.parentClassId = this.addForm.parentClassId
                       addClass(para).then((res) => {
                            this.addChildLoading = true;
                             this.$emit('close',true)
                        })
                   }else if(this.type=="editChild"){
                        para.classId = this.addForm.classId
                        editData(para).then((res) => {
                            this.editFormLoading = true;
                             this.$emit('close',true)
                        })
                   }
                   
                    }
                });
        },
         // 添加分类上传图片 
        addImg(val) {
            this.addForm.pics[0].path = val[0]
        },
        addgetImg(val) {
            this.addForm.pics[1].path = val[0]
        }
    }
}
</script>

<style>

</style>
