<template>
    <div class="dialog brand">
        <h3 class="title">{{title}}
            <el-button class="fr" @click.native="clean">取消</el-button>
        </h3>
        <p class="titleLitter">——修改用户注册信息——</p>
        <el-form :model="editForm" label-width="150px" ref="editForm">
            
               <el-form-item label="用户昵称"  prop="nickName">
                <el-input v-model="editForm.nickName" auto-complete="off" placeholder="请填写用户昵称"></el-input>
              </el-form-item>
                <el-form-item label="个人电话"  prop="phone">
                    <el-input v-model="editForm.phone" auto-complete="off" placeholder="请填写个人电话"></el-input>
                </el-form-item>
            <el-form-item label="个人邮箱"  prop="eMail">
                    <el-input v-model="editForm.eMail" auto-complete="off" placeholder="请填写个人邮箱"></el-input>
                </el-form-item>
                <el-form-item label="个人身份证"  prop="idCardNo ">
                    <el-input v-model="editForm.idCardNo " auto-complete="off" placeholder="请填写个人身份证"></el-input>
                </el-form-item>
                <el-form-item label="身份证照片" >
                    <vue-core-image-upload 
                    v-if="picShow" 
                    @getImg="getIdCardImg" 
                    :cropRatio="selectPic.radio" 
                    :picList="getIdCard" 
                    :sizeBox='selectPic.size' 
                    :multiple="selectPic.multiple" 
                    :cropShow="selectPic.cropShow">
                    </vue-core-image-upload>
                </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer border_top">
                    <el-button type="primary" @click.native="saveMember">保存用户</el-button>
                </div>

            <p class="titleLitter">——修改完善用户资料——</p>
            <el-form :model="editForm" label-width="150px" ref="editForm">
                
                    <!-- 上传用户头像  -->
                <el-form-item label="用户头像" >
                    <vue-core-image-upload 
                    v-if="picShow" 
                    @getImg="getImg" 
                    :cropRatio="selectPic.radio" 
                    :picList="selectPic.picList" 
                    :sizeBox='selectPic.size' 
                    :multiple="selectPic.multiple" 
                    :cropShow="selectPic.cropShow">
                    </vue-core-image-upload>
                </el-form-item>
                    <el-form-item label="用户角色" prop="roleId">
                    <el-select v-model="roleSel" multiple>
                        <el-option v-for="(item,index) in  classData" :key="index" :value="item.id" :label="item.name"> </el-option>
                    </el-select>
                </el-form-item>
               <el-form-item label="组织机构代码"  prop="organizationCode">
                <el-input v-model="editForm.organizationCode" auto-complete="off" placeholder="请填写组织机构"></el-input>
              </el-form-item>
               <!-- <el-form-item label="用户住址"  prop="apartment ">
                <el-input v-model="editForm.apartment" auto-complete="off" placeholder="请填写用户住址"></el-input>
              </el-form-item> -->
              <el-form-item label="执照编号"  prop="businessLicenseSN">
                <el-input v-model="editForm.businessLicenseSN " auto-complete="off" placeholder="请填写执照编号"></el-input>
              </el-form-item>
            <el-form-item label="工作单位" prop="workUnit">
                <el-input v-model="editForm.workUnit" auto-complete="off" placeholder="请填写工作单位"></el-input>
            </el-form-item>
               <el-form-item label="组织/机构电话"  prop="officeTel ">
                <el-input v-model="editForm.officeTel " auto-complete="off" placeholder="请填写办公室电话"></el-input>
            </el-form-item>
            <el-form-item label="组织/机构地址"  prop="officeAddress ">
                <el-input v-model="editForm.officeAddress " auto-complete="off" placeholder="请填写办公室地址"></el-input>
            </el-form-item>
             <!-- 上传营业执照图片  -->
            <el-form-item label="执照图片"  >
                <vue-core-image-upload 
                v-if="picShow" 
                @getImg="getBusImg" 
                :cropRatio="selectPic.radio" 
                :picList="getBus" 
                :sizeBox='selectPic.size' 
                :multiple="selectPic.multiple" 
                :cropShow="selectPic.cropShow">
                </vue-core-image-upload>
            </el-form-item>
             <el-form-item label="组织机构代码图片" >
                <vue-core-image-upload 
                v-if="picShow" 
                @getImg="getOranizationImg" 
                :cropRatio="selectPic.radio" 
                :picList="getOranization" 
                :sizeBox='selectPic.size' 
                :multiple="selectPic.multiple" 
                :cropShow="selectPic.cropShow">
                </vue-core-image-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer border_top">
            <el-button type="primary" @click.native="editSubmit">保存</el-button>
        </div>
    </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import { memberlist, memberadd, rolelist,userChange } from '@/service/getData'
export default {
    data() {
        return {
            //图片
            picShow: false,
            getIdCard:[],//身份证照片
            getOranization:[],//组织机构图片
            getBus:[],//营业执照图片
            selectPic: {
                radio: '1200:350',
                size: ['400', ''],
                cropShow: false,
                multiple: false,
                picList: [] //用户头像
            },
             
            // 编辑
            editLoading: false,
            editForm: {
                // 用户资料
                businessLicensePicStr:{path:''},//营业执照图片
                organizationCodePicStr :{path:''},//组织机构图片
                // apartment:'',//用户地址
                workUnit: '',
                officeTel: '',
                officeAddress:'',
                roleId: '',
                businessLicenseSN :'',
                organizationCode:'',

                username: '',
                portrait: {path:''},//用户头像
                name:'',//用户个人资料
                nickName:'',
                idCardNo:'',
                eMail:'',
                phone:'',
                idCardPicStr :{path:''},//身份证图片

            },
            classData: [],
            roleSel:[]
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        FormData: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'add'
        },
        pickerOptions0: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
        },
    },
    components: {
        vueCoreImageUpload
    },
    mounted() {
        this.editForm = Object.assign({}, this.FormData)
        console.log('te',this.FormData)
        this.selectPic.picList = []
        this.getIdCard=[]//身份证照片
        this.getOranization=[]//组织机构图片
        this.getBus=[]//营业执照图片
        // 头像
        if ( this.editForm.portrait.path != '') {
            this.selectPic.picList.push(
                this.editForm.portrait.path
            )
        }
        // 执照
        if (this.editForm.businessLicensePicStr.path != '') {
            this.getBus.push(
                this.editForm.businessLicensePicStr.path
            )
        }
        // 组织机构
         if (this.editForm.organizationCodePicStr.path != '') {
            this.getOranization.push(
                this.editForm.organizationCodePicStr.path
            )
        }
        // 身份证
         if (this.editForm.idCardPicStr.path != '') {
            this.getIdCard.push(
                this.editForm.idCardPicStr.path
            )
        }
        this.picShow = true
        this.list()
    },
    methods: {
        list() {
            rolelist().then((res) => {
                let _this = this              
                if (res.data.state == 200) {
                    let datas = res.data.content
                    _this.rolelist = []
                    _this.classData = []
                    datas.forEach(function(child) {
                        if(_this.FormData.roleList){
                            _this.FormData.roleList.forEach(m =>{
                                if(m.id == child.id){
                                    _this.roleSel.push(child.id)
                                }
                            })
                        }
                       _this.classData.push({
                            id: child.id,
                            name: child.name,
                        })
                    }, this);
                }
            })
        },
        clean() {
            this.$emit('close', false)
            this.$refs['editForm'].resetFields()
        },
        // 保存
        editSubmit() {
            let _this = this
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    
                    this.editLoading = true;
                    if(this.roleSel.length>0){
                        this.editForm.roleId =''
                        this.roleSel.forEach((role,index) => {
                             if(index == _this.roleSel.length-1){
                                 _this.editForm.roleId += role
                             }else{
                                _this.editForm.roleId += role + ','
                             }
                        })
                    }
                    let para = {
                        username: this.editForm.username,
                        roleId: this.editForm.roleId,
                        officeTel: this.editForm.officeTel,
                        workUnit: this.editForm.workUnit,
                        // phone:this.editForm.phone,
                        businessLicenseSN :this.editForm.businessLicenseSN,
                        organizationCode:this.editForm.organizationCode,
                        // name:this.editForm.name,
                        // nickName:this.editForm.nickName,
                        officeAddress:this.editForm.officeAddress,
                        businessLicensePicStr: {
                            path: this.editForm.businessLicensePicStr.path
                        },
                        organizationCodePicStr:{
                                path: this.editForm.organizationCodePicStr.path
                        },
                        portraitStr: {
                            path: this.editForm.portrait.path
                        }
                        
                    }
                    // para.businessLicensePicStr = JSON.stringify(para.businessLicensePicStr)
                    // para.organizationCodePicStr = JSON.stringify(para.organizationCodePicStr)
                    // para.portraitStr = JSON.stringify(para.portraitStr)
                    // para = JSON.stringify(para)
                    console.log(para)
                    memberadd(para).then((res) => {
                        console.log('member',res)
                        this.editLoading = false;
                        if(res.data.state == 200){
                            this.$message('保存成功')
                            
                        }else{
                            this.$message('保存失败')
                        }
                        this.clean()
                    })
                }
            });
        },
        saveMember() {
                let para = {
                        memberId:this.editForm.memberId,
                        nickName:this.editForm.nickName,
                        idCardNo:this.editForm.idCardNo,
                        eMail:this.editForm.eMail,
                        phone:this.editForm.phone,
                        idCardPicStr :{path:this.editForm.idCardPicStr.path},//身份证图片
                }
                console.log(para)
                userChange(para).then((res) => {
                    if(res.data.state == 200){
                        this.$message('保存成功')
                    }else{
                         this.$message('保存失败')
                    }
                    this.clean()
                    console.log(res)
                })
        },
    //用户头像
        getImg(val) {
            this.editForm.portrait.path = val[0]
        },
  //营业执照图片
        getBusImg(val){
            this.editForm.businessLicensePicStr.path = val[0]
            // console.log('n'+   this.editForm.businessLicensePicStr.path)
        },
        // 身份证
        getIdCardImg(val){
            this.editForm.idCardPicStr.path = val[0]
        },
        // 组织机构
        getOranizationImg(val){
            this.editForm.organizationCodePicStr.path = val[0]
            console.log('test', this.editForm.organizationCodePicStr)
        }
    }
}
</script>

<style lang="scss" soped>

.dialog {
    width: 100%;
    height: 100%;
}

.el-select.sel_more {
    width: 600px;
}

.dialog-footer {
   
    text-align: center;
}
.dialog-footer.border_top{
    width:860px;
    border-bottom: 1px solid #f0f0f0;
    border-top: none;
}
.titleLitter{
    width:880px;
    text-align: center;
    font-size: 20px;
    padding: 20px 0;
}
</style>
 