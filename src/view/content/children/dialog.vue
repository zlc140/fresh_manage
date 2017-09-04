<template>
  <div class="dialog banner small">
    <h3 class="title">{{title}} <el-button class="fr"  size="small" type="danger" :plain="true" @click.native="clean">取消</el-button></h3>
      <el-form :model="addForm" label-width="80px" size="small" :rules="addFormRules" v-loading="loginLoading" ref="addForm">
				<el-form-item label="广告标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="链接地址" prop="url">
					<el-input v-model="addForm.image.url" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="上传图片" prop="image.path" class="addPicBox">
                    <template scope="scope">
                        <!-- 上传图片  -->
                            <vue-core-image-upload  
                            v-if="picShow"
                            @getImg = "getImg"  
                            :cropRatio = "selectPic.radio" 
                            :picList="selectPic.picList"
                            :sizeBox = 'selectPic.size' 
                            :multiple="selectPic.multiple"
                            :cropShow="selectPic.cropShow">
                        </vue-core-image-upload> 
                        <p class="tip">提示：为避免失真，请尽可能上传 1200 × 350 的图片做为首页banner展示图</p>
                    </template> 
				</el-form-item>
                <el-form-item label="永久显示" prop="onlyShow" >
                        <el-switch
                            v-model="addForm.onlyShow"
                            on-text="on"
                            off-text="off">
                        </el-switch>
                </el-form-item>
				<el-form-item label="开始时间" prop="startTime" v-if="!addForm.onlyShow">
					<el-date-picker
                        v-model="addForm.startTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
				</el-form-item>
                <el-form-item label="结束时间" prop="endTime" v-if="!addForm.onlyShow">
					<el-date-picker
                        v-model="addForm.endTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                      </el-date-picker>
				</el-form-item>
                 <el-form-item label="排序" prop="sort" >
                        <el-input-number v-model="addForm.sort" :step="1" :min="1" ></el-input-number> 
                </el-form-item>
		</el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保　存</el-button>
        </div>
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import { brandList,removeBrand,addBrand,editBrand } from '@/service/getData'
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

        return{
            picShow:false,
             selectPic:{
                // upImg
                radio:'1200:350',
                size:['1200','350'],
                cropShow:true,
                multiple: false,
                picList:[]
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            loginLoading:false,
            addLoading: false,
            addFormRules: {
                startTime: [
                   {validator:validateaddDate, trigger: 'change' }
                ],
                endTime: [
                   {validator:compareaddDate, trigger: 'change' }
                ]
            },
            //新增界面数据
            addForm: {
                title: '',
                image: {
                    path:'',
                    url:'',
                    title:''
                },
                onlyShow: true,
                startTime:'',
                endTime:'',
                sort:length
                
            }
        }
    },
    components:{
        vueCoreImageUpload
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
        this.addForm = this.FormData
        this.selectPic.picList=[]
        this.picShow = true
        if(this.addForm.image.path != ''){
            this.selectPic.picList.push(this.addForm.image.path) 
        }         
    },
    methods:{
        clean(){
            this.$emit('close',false)
            this.$refs['addForm'].resetFields()
       },
        addSubmit(){
            this.$refs.addForm.validate((valid) => {
                if(valid) {
                    if(this.addForm.image.path == ''){
                        this.$message('请上传banner图片')
                        return false
                    }
                    this.loginLoading = true
                    let para = Object.assign({}, this.addForm);
                  
                    if(para.startTime !=''){
                        para.startTime = para.startTime.getTime()+'';
                    }
                    if(para.endTime != ''){
                        para.endTime = para.endTime.getTime()+'';
                    }
                    if(this.type == 'add'){
                        addBrand(para).then((res) => {
                            this.loginLoading = false
                            this.addFormVisible = false
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
                        
                         para.id = this.FormData.id
                        //  console.log("edit",para)
                        editBrand(para).then((res) => {
                             this.loginLoading = false
                            if(res.data.state == 200){
                                // console.log(res.data)
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
      getImg(val){
          this.addForm.image.path = val[0]
        console.log(this.addForm.image.path)
      },
    }
}
</script>

<style lang="scss" soped>
.banner{
    height:calc(100% - 100px);
    .el-form{
        margin:0 auto;
    }
}

</style>
 