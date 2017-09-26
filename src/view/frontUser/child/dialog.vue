<template>
    <div class="dialog brand">
        <h3 class="title">{{title}}
            <el-button class="fr" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="editForm" label-width="150px" ref="editForm">
            <el-form-item label="办公室电话" required prop="officeTel ">
                <el-input v-model="editForm.officeTel " auto-complete="off" placeholder="请填写办公室电话"></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户住址" required prop="apartment ">
            <el-input v-model="editForm.apartment" auto-complete="off" placeholder="请填写用户住址"></el-input>
          </el-form-item>-->
          <el-form-item label="家庭电话" required prop="homePhone">
            <el-input v-model="editForm.homePhone" auto-complete="off" placeholder="请填写家庭电话"></el-input>
          </el-form-item>
            <el-form-item label="出生地址" required prop="birthplace ">
                <el-input v-model="editForm.birthplace " auto-complete="off" placeholder="请填写出生地址"></el-input>
            </el-form-item>
            <el-form-item label="个人简介" required prop="userDetail ">
                <el-input v-model="editForm.userDetail" auto-complete="off" placeholder="请填写个人简介"></el-input>
            </el-form-item>
            <el-form-item label="用户学历" required prop="education ">
                <el-input v-model="editForm.education" auto-complete="off" placeholder="请填写用户学历"></el-input>
            </el-form-item>
            <el-form-item label="毕业学校" required prop="graduatedFrom  ">
                <el-input v-model="editForm.graduatedFrom " auto-complete="off" placeholder="请填写毕业学校"></el-input>
            </el-form-item>
            <el-form-item label="工作单位" required prop="workUnit   ">
                <el-input v-model="editForm.workUnit  " auto-complete="off" placeholder="请填写工作单位"></el-input>
            </el-form-item>
            <el-form-item label="用户血型" required prop="blood ">
                <el-input v-model="editForm.blood   " auto-complete="off" placeholder="请填写用户血型"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" required prop="birthdate ">
                <template>
                    <div class="block">
                        <el-date-picker v-model="editForm.birthdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                </template>
            </el-form-item>
         <el-form-item label="用户头像" required prop="pics">
          <!-- 上传图片  -->
          <vue-core-image-upload 
           v-if="picShow"
           @getImg="getImg" 
           :cropRatio="selectPic.radio" 
           :picList="selectPic.picList" 
           :sizeBox='selectPic.size' 
           :multiple="selectPic.multiple" 
           :cropShow="selectPic.cropShow"
           >
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
import { memberlist, memberadd } from '@/service/getData'
export default {
    data() {
        return {
            //图片
            picShow: false,
            selectPic: {
                radio: '1200:350',
                size: ['1200', '350'],
                cropShow: false,
                multiple: false,
                picList: []
            },
            // 编辑
            editLoading: false,
            editForm: {
                username: '',
                officeTel: '',
                portrait :{},
                // apartment:'',
                homePhone:'',
                birthdate: '',
                birthplace: '',
                userDetail: '',
                education: '',
                graduatedFrom: '',
                workUnit: '',
                blood: '',
            },
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
         this.selectPic.picList = []
        if (this.editForm.portrait) {
            this.selectPic.picList.push(
                this.editForm.portrait.path
            )
        }
        this.picShow = true      
    },
    methods: {
        clean() {
            this.$emit('close', false)
            this.$refs['editForm'].resetFields()
        },
        // 保存
        editSubmit() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = false;
                    let para = {
                        username: this.editForm.username,
                        officeTel: this.editForm.officeTel,
                        birthdate: this.editForm.birthdate,
                        birthplace: this.editForm.birthplace,
                        userDetail: this.editForm.userDetail,
                        education: this.editForm.education,
                        graduatedFrom: this.editForm.graduatedFrom,
                        workUnit: this.editForm.workUnit,
                        blood: this.editForm.blood,
                        homePhone:this.editForm.homePhone,
                        portraitStr :{
                            path:this.editForm.portrait.path
                        }
                    }
                    console.log(para)
                    memberadd(para).then((res) => {
                        this.editLoading = true;
                        this.clean()
                    })
                }
            });
        },
     getImg(val) {
      this.editForm.portrait = []
      this.editForm.portrait.path = val[0]
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
 