<template>
    <div class="dialog brand">
        <h3 class="title">{{title}}
            <el-button class="fr" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="editForm" label-width="150px" ref="editForm">
               <el-form-item label="真实姓名" prop="name">
                <el-input v-model="editForm.name" auto-complete="off" placeholder="请填写真实姓名"></el-input>
              </el-form-item>
               <el-form-item label="用户昵称"  prop="nickName">
                <el-input v-model="editForm.nickName" auto-complete="off" placeholder="请填写用户昵称"></el-input>
              </el-form-item>
               <el-form-item label="组织机构"  prop="organizationCode">
                <el-input v-model="editForm.organizationCode" auto-complete="off" placeholder="请填写组织机构"></el-input>
              </el-form-item>
               <el-form-item label="用户住址"  prop="apartment ">
                <el-input v-model="editForm.apartment" auto-complete="off" placeholder="请填写用户住址"></el-input>
              </el-form-item>
              <el-form-item label="执照编号"  prop="businessLicenseSN">
                <el-input v-model="editForm.businessLicenseSN " auto-complete="off" placeholder="请填写执照编号"></el-input>
              </el-form-item>
               <el-form-item label="办公室电话"  prop="officeTel ">
                <el-input v-model="editForm.officeTel " auto-complete="off" placeholder="请填写办公室电话"></el-input>
            </el-form-item>
            <el-form-item label="办公室地址"  prop="officeAddress ">
                <el-input v-model="editForm.officeAddress " auto-complete="off" placeholder="请填写办公室地址"></el-input>
            </el-form-item>
            <el-form-item label="家庭电话"  prop="homePhone">
                <el-input v-model="editForm.homePhone" auto-complete="off" placeholder="请填写家庭电话"></el-input>
            </el-form-item>
            <el-form-item label="个人电话"  prop="phone">
                <el-input v-model="editForm.phone" auto-complete="off" placeholder="请填写个人电话"></el-input>
            </el-form-item>
            <el-form-item label="出生地址" prop="birthplace ">
                <el-input v-model="editForm.birthplace " auto-complete="off" placeholder="请填写出生地址"></el-input>
            </el-form-item>
            <el-form-item label="个人简介"  prop="userDetail ">
                <el-input v-model="editForm.userDetail" auto-complete="off" placeholder="请填写个人简介"></el-input>
            </el-form-item>
            <el-form-item label="用户学历"  prop="education ">
                <el-input v-model="editForm.education" auto-complete="off" placeholder="请填写用户学历"></el-input>
            </el-form-item>
            <el-form-item label="毕业学校" prop="graduatedFrom">
                <el-input v-model="editForm.graduatedFrom " auto-complete="off" placeholder="请填写毕业学校"></el-input>
            </el-form-item>
            <el-form-item label="工作单位" prop="workUnit">
                <el-input v-model="editForm.workUnit" auto-complete="off" placeholder="请填写工作单位"></el-input>
            </el-form-item>
            <el-form-item label="用户血型" prop="blood">
                <el-input v-model="editForm.blood   " auto-complete="off" placeholder="请填写用户血型"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="roleId">
                <el-select v-model="roleSel" multiple>
                    <el-option v-for="(item,index) in  classData" :key="index" :value="item.id" :label="item.name"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期"  prop="birthdate ">
                <template>
                    <div class="block">
                        <el-date-picker v-model="editForm.birthdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                </template>
            </el-form-item>
             <!-- 上传用户头像  -->
            <el-form-item label="用户头像" required prop="portraitStr">
                <vue-core-image-upload 
                v-if="picShow" 
                @getImg="getImgO" 
                :cropRatio="selectPic.radio" 
                :picList="selectPic.picList" 
                :sizeBox='selectPic.size' 
                :multiple="selectPic.multiple" 
                :cropShow="selectPic.cropShow">
                </vue-core-image-upload>
            </el-form-item>
             <!-- 上传营业执照图片  -->
            <el-form-item label="执照图片" required prop="businessLicensePicStr">
                <vue-core-image-upload 
                v-if="picShow" 
                @getImg="getImgTwo" 
                :cropRatio="selectPic2.radio" 
                :picList="selectPic2.picListTwo" 
                :sizeBox='selectPic2.size' 
                :multiple="selectPic2.multiple" 
                :cropShow="selectPic2.cropShow">
                </vue-core-image-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="editSubmit">保存</el-button>
        </div>
    </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import { memberlist, memberadd, rolelist } from '@/service/getData'
export default {
    data() {
        return {
            //图片
            picShow: false,
            selectPic: {
                radio: '1200:350',
                size: ['200', '200'],
                cropShow: false,
                multiple: false,
                picList: []
            },
             selectPic2: {
                radio: '1200:350',
                size: ['200', '200'],
                cropShow: false,
                multiple: false,
                picListTwo: []
            },
            // 编辑
            editLoading: false,
            editForm: {
                username: '',
                officeTel: '',
                portrait: {path:''},//用户头像
                businessLicensePicStr:{path:''},//营业执照图片
                apartment:'',
                phone:'',
                homePhone: '',
                birthdate: '',
                birthplace: '',
                userDetail: '',
                education: '',
                graduatedFrom: '',
                workUnit: '',
                blood: '',
                roleId: '',
                businessLicenseSN :'',
                organizationCode:'',
                name:'',
                nickName:'',
                officeAddress:''
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
        // console.log(this.editForm)
        this.selectPic.picList = []
        this.selectPic2.picListTwo = []
        if (this.editForm.portrait) {
            this.selectPic.picList.push(
                this.editForm.portrait.path
            )
        }
        if (this.editForm.businessLicensePricStr) {
            this.selectPic2.picListTwo.push(
                this.editForm.businessLicensePicStr.path
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
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    // if(this.editForm.portrait.path==''){
                    //         this.$message('请上传用户头像')
                    //         return false   
                    // }
                    //  if(this.editForm.businessLicensePicStr.path==''){
                    //         this.$message('请上传执照图片')
                    //         return false   
                    // }
                    this.editLoading = false;
                    if(this.roleSel.length>0){
                        this.editForm.roleId =''
                        this.roleSel.forEach((role,index) => {
                            console.log('role'+   role)
                             console.log('index'+   index)
                            // let strs = role + ''
                            // if(index < this.roleSel.length-1){
                            //     this.editForm.roleId += strs+',"'
                            // }else{
                            //     this.editForm.roleId += strs
                            // }
                        })

                    }
                    let para = {
                        username: this.editForm.username,
                        roleId: this.editForm.roleId,
                        officeTel: this.editForm.officeTel,
                        birthdate: this.editForm.birthdate,
                        birthplace: this.editForm.birthplace,
                        userDetail: this.editForm.userDetail,
                        education: this.editForm.education,
                        graduatedFrom: this.editForm.graduatedFrom,
                        workUnit: this.editForm.workUnit,
                        blood: this.editForm.blood,
                        apartment:this.editForm.apartment,
                        phone:this.editForm.phone,
                        businessLicenseSN :this.editForm.businessLicenseSN,
                        organizationCode:this.editForm.organizationCode,
                        name:this.editForm.name,
                        nickName:this.editForm.nickName,
                        officeAddress:this.editForm.officeAddress,
                        homePhone: this.editForm.homePhone,
                        businessLicensePicStr: {
                            path: this.editForm.businessLicensePicStr.path
                        },
                        portraitStr: {
                            path: this.editForm.portrait.path
                        },
                    }
                    // memberadd(para).then((res) => {
                    //     console.log(para)
                    //     console.log(res.data.content)
                    //     this.editLoading = true;
                    //     this.clean()
                    // })
                }
            });
        },
    //用户头像
        getImgO(val) {
            this.editForm.portrait = []
            this.editForm.portrait.path = val[0]
        },
  //营业执照图片
        getImgTwo(val){
           this.editForm.businessLicensePicStr = []
            this.editForm.businessLicensePicStr.path = val[0]
            // console.log('n'+   this.editForm.businessLicensePicStr.path)
        },
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
</style>
 