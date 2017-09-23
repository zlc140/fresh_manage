s<template>
  <div class="dialog banner">
    <h3 class="title">{{title}} <el-button class="fr"  size="small" type="danger" :plain="true" @click.native="clean">取消</el-button></h3>
      <el-form :model="addForm" label-position="right" label-width="160px" size="small" :rules="addFormRules" v-loading="loginLoading" ref="addForm">
                <el-form-item label="请先选择楼层类型" prop="type">
					 <el-select v-model="addForm.type">
                        <el-option v-for="(item,index) in  selType"  :key="index" :label="item.label" :value="item.value">  </el-option> 
                        </el-select>
				</el-form-item>
                 <el-form-item label="楼层标题图片" prop="titleImage">
					<vue-core-image-upload  
                            v-if="picShow"
                            @getImg = "titleImg"  
                            :cropRatio = "titlePic.radio" 
                            :picList="titlePic.picList"
                            :sizeBox = 'titlePic.size' 
                            :multiple="titlePic.multiple"
                            :cropShow="titlePic.cropShow">
                        </vue-core-image-upload>
                        <p class="tip">提示：用于楼层标题展示的图片最后都会被拉成宽1200px的图片,推荐大小1200px*70px，请注意比例和大小</p> 
				</el-form-item>
				<el-form-item label="楼层标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off" required></el-input>
				</el-form-item>
                <el-form-item label="链接地址" prop="titleImage">
					<el-input v-model="addForm.titleImage.url" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="是否永久显示" prop="onlyShow" >
                    <el-row class="el-input">
                    <el-col :span="4">
                        <el-switch
                            v-model="addForm.onlyShow"
                            on-text="on"
                            off-text="off">
                        </el-switch>
                    </el-col>
                    <el-col :span="9">
                    <el-form-item  prop="startTime" v-if="!addForm.onlyShow">
                        <el-date-picker
                            v-model="addForm.startTime"
                            type="date"
                            placeholder="选择开始日期"
                            :picker-options="pickerOptions0" >
                        </el-date-picker>
                    </el-form-item>
                </el-col> 
                <el-col  class="line" :span="2" v-if="!addForm.onlyShow">--</el-col>
                 <el-col :span="9" v-if="!addForm.onlyShow">
                    <el-form-item  prop="endTime">
                        <el-date-picker
                            v-model="addForm.endTime"
                            type="date"
                            placeholder="选择结束日期"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                 </el-col> 
                  </el-row>
                </el-form-item>
                 <el-form-item label="排序" prop="sort" >
                        <el-input-number v-model="addForm.sort" :step="1" :min="1"></el-input-number> 
                </el-form-item>
                 <el-form-item label="楼层内容编辑" prop="body" required v-if="!addForm.type == ''">
                        <mod-one v-if="addForm.type == 'FLOOR_IMAGES'" :Onelist="Onelist" @getOne="getDatas"></mod-one>
                        <mod-two :twoData="twoData" v-if="addForm.type == 'FLOOR_GOODS'" @getTwo="getDatas"> </mod-two>
                </el-form-item>
		</el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保　存</el-button>
        </div>
        
  </div>
</template>

<script>
import modOne from './modOne'
import modTwo from './modTwo'
import vueCoreImageUpload from '@/components/uploadImg'
import { saveFloor,editFloor } from '@/service/getData'
export default {
    data(){
            var validateaddDate = (rule, value, callback) => {
                if(this.addForm.onlyShow == false){
                    if(value === ''){
                        callback(new Error('请选择开始时间'))
                    }else {
                        this.$refs.addForm.validateField('endTime');
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
                            this.$refs.addForm.validateField('startTime');
                }else{
                        callback()
                }
                }else {
                callback()
                }
            };
            var checkType = (value,rule,callback) => {
                if(value ==''){
                    callback(new Error('请选择楼层类型'))
                }else{
                     callback()
                }
            }
        return{
            addFloorVisible:false,
            selType:[
                {
                    value:'FLOOR_IMAGES',
                    label:'广告楼层'
                },
                 {
                    value:'FLOOR_GOODS',
                    label:'商品楼层'
                }
            ],
            Onelist:[],
            twoData:null,
            picShow:false,
            titlePic:{
                showPic:false,
                radio:'1200:350',
                cropShow:false,
                multiple:false,
                picList:[]
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            loginLoading:false,
            addLoading: false,
            
            //新增界面数据
            addForm: {
                title: '',
                style:'',
                type:'',
                body:null,
                titleImage:{
                    path:'',
                    url:'',
                    title:''
                },
                onlyShow: true,
                startTime:'',
                endTime:'',
                sort:length
            },
            addFormRules: {
                startTime: [
                   {validator:validateaddDate, trigger: 'change' }
                ],
                endTime: [
                   {validator:compareaddDate, trigger: 'change' }
                ],
                type :[
                     {validator:checkType, trigger: 'change' }
                ],
                title:[
                    {required:true,message:'楼层标题不能为空',trigger: 'change'}
                ]
            }
        }
    },
    components:{
        vueCoreImageUpload,modOne,modTwo
    },
    props:{
        title:{
            type:String,
            default:''
        },
        FormData:{
            type:Object,
            default:null
        },
        type:{
            type:String,
            default:'add'
        }
    },
    mounted(){
        let _this = this
        this.addForm = Object.assign({},this.addForm,this.FormData)
        console.log(this.type,this.addForm)
        if(this.type == 'edit'){
             this.titlePic.picList=[]
             if(this.addForm.titleImage.path!=''){
                 this.titlePic.picList.push(this.addForm.titleImage.path)
             }
            if(this.addForm.startTime == 0 || this.addForm.startTime =='0'){
                this.addForm.startTime = ''
            }else{
                 this.addForm.startTime = new Date( this.addForm.startTime )
            }
            if(this.addForm.endTime == 0 || this.addForm.endTime =='0'){
                this.addForm.endTime = ''
            }else{
                this.addForm.endTime = new Date( this.addForm.endTime )
            }
        }
        if(this.addForm.titleImage == null){
            this.addForm.titleImage = {
                path:'',
                url:'',
                title:''
            }
        }
       
        if(this.type == 'edit' && this.addForm.type == 'FLOOR_IMAGES'){
            this.Onelist=[]
            this.addForm.body[0].images.forEach((v,index) => {
                    _this.Onelist.push(v)
            })
        }else if(this.type=="edit" && this.addForm.type == "FLOOR_GOODS"){
            _this.twoData = Object.assign({},this.addForm.body)
        }
        this.picShow = true
    },
    methods:{
        clean(){
            this.$emit('close',false)
            this.$refs['addForm'].resetFields()
       },
        addSubmit(){
            this.$refs.addForm.validate((valid) => {
                if(valid) {
                    if(this.addForm.type == ''){
                        this.$message('请选择类型，并编辑子楼层')
                        return false
                    }
                    if(this.addForm.body == null || this.addForm.body.length!=4 ){
                        this.$message('请编辑子楼层,每个楼层包含四个子楼层')
                        return false
                    }
                    this.loginLoading = true
                    let para = {
                            title: this.addForm.title,
                            style: this.addForm.style,
                            type: this.addForm.type,
                            body:[],
                            titleImage: JSON.stringify(this.addForm.titleImage),
                            onlyShow: this.addForm.onlyShow,
                            startTime:this.addForm.startTime,
                            endTime:this.addForm.endTime,
                            sort:this.addForm.sort
                            
                    }
                    if(para.startTime !='' &&  para.startTime.getFullYear() ){
                        para.startTime = para.startTime.getTime()+'';
                    }
                    if(para.endTime != '' &&  para.endTime.getFullYear()){
                        para.endTime = para.endTime.getTime()+'';
                    }

                    if(para.type == 'FLOOR_IMAGES'){
                       para.body = []
                       para.body.push({
                            images:this.addForm.body
                       })
                        para.body[0].images.forEach(v => {
                            v = JSON.stringify(v)
                        })
                    } 
                    if(para.type == 'FLOOR_GOODS'){
                        para.body = []
                        para.body = this.addForm.body
                    }
                  
                    para.body = JSON.stringify(para.body)
                    console.log('para',para)
                    if(this.type == 'add'){
                        saveFloor(para).then((res) => {
                            this.loginLoading = false
                            this.addFormVisible = false
                            console.log(res.data)
                            if(res.data.state == 200){
                                this.$message('添加成功')
                                this.$emit('close',false) 
                            }else if(res.data == ''){
                                this.$message('登录超时，请重新登录')
                                this.$router.push({
                                        path:'/login',
                                        query:{redirect:this.$route.path}
                                    })
                            }
                        })
                    }else if (this.type == 'edit'){
                        //  this.$emit('close',false)
                        
                         para.id = this.FormData.floorId
                         console.log("edit",para)
                        editFloor(para).then((res) => {
                             this.loginLoading = false
                            if(res.data.state == 200){
                                console.log(res.data)
                                this.$emit('close',false)
                                this.$message('编辑成功')
                                 
                            }else if(res.data == ''){
                                    this.$message('登录超时，请重新登录')
                                    this.$router.push({
                                            path:'/login',
                                            query:{redirect:this.$route.path}
                                        })
                                }
                                
                        })
                    }
                    
                }
          })
      },
      titleImg(val){
          this.addForm.titleImage.path = val[0]
        // console.log(this.addForm.titleImage.path)
      },
      getDatas(val){
            this.addForm.body = []
            this.addForm.body = val
            // console.log(val)
      }
       

    }
}
</script>

<style lang="scss" soped>
.banner{
    // height:calc(100% - 30px);
    .el-form{
        margin: 0 auto;
        overflow: hidden;
    }
}
  .dialog-footer{
      text-align:center;
      border-top:1px solid #f0f0f0;
      padding:15px 0;
  }
   .dialog-footer .el-button{
       padding:10px 60px;
   }
   .dialog .el-input{
        max-width:600px;
   }
</style>
 