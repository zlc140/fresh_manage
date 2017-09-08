<template>
    <div class="dialog index">
        <h3 class="title">{{title}}
            <el-button class="fr" size="small" type="danger" @click.native="clean" :plain="true">取消</el-button>
        </h3>
        <el-form :model="addForm" :rules="rules" label-width="80px" size="small" v-loading="loginLoading" ref="addForm">
            <el-form-item label="店铺名称" prop="storeName">
                <el-input v-model="addForm.storeName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="执照编号" prop="businessLicenseNo">
                <el-input v-model="addForm.businessLicenseNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址" prop="address">
                <el-input v-model="addForm.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺电话" prop="tel">
                <el-input v-model="addForm.tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺传真" prop="fax">
                <el-input v-model="addForm.fax" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="成立时间" prop="regTime">
                <el-date-picker v-model="addForm.regTime" type="date" placeholder="选择时间" :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="店铺简介" prop="about">
                <el-input v-model="addForm.about" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item required label="上传执照" prop="imgs">
                <template scope="scope">
                    <!-- 上传图片  -->
                    <vue-core-image-upload 
                     v-if="picShow"
                     @getImg="getImg" :cropRatio="selectPic.radio"  :picList="selectPic.picList" :multiple="selectPic.multiple" :cropShow="selectPic.cropShow">
                    </vue-core-image-upload>
                    <p class="tip">提示：请上传真实的执照图片，我们会有专人审核！</p>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保　存</el-button>
        </div>
    </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import vueEditor from '@/components/vueEditor'
import { selectStore, deleteStore, updateStore, saveStore } from '@/service/getData'
export default {
    data() {
          // 店铺名称
        var nospace = (rule, value, callback) => {
            var par = /^[a-zA-Z\u4E00-\u9FA5\_]{2,10}$/
            if (!par.test(value) && value.trim() != '') {
                callback(new Error('店铺名称为中英文,下划线，长度2~10位'));
            } else if (value.trim() == '') {
                callback(new Error('店铺名称不能为空'))
            } else {
                callback()
            }
         };
          //  店铺地址,店铺简介，执照编号，店主编号
           var  validaddress= (rule, value, callback) => {
             if (value.trim() == '') {
                callback(new Error('不能输入一串空字符'))
            } else {
                callback()
            }
         };
        //  店铺电话
          var notel = (rule, value, callback) => {
            var par=/^0\d{2,3}-?\d{7,8}$/;
            if (!par.test(value) && value.trim() != '') {
                callback(new Error('请输入电话号码的正确格式'));//09557777777
            } else if (value.trim() == '') {
                callback(new Error('电话号码不能为空'))
            } else {
                callback()
            }
         };
        return {
            // 日期时间
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // 图片
            picShow: false,
            selectPic: {
                radio: '1200:350',
                cropShow: false,
                multiple: false,
                picList: []
            },
            // form
            loginLoading: false,
            addLoading: false,
            addForm: {
                imgs: {
                    path: ''
                },
                storeId: '',//店铺id
                storeName: '',// 店铺名称
                memberId: '',// 店主id
                businessLicenseNo: '',//公司执照编号
                address: '',// 店铺地址
                tel: '',// 店铺电话
                fax: '',//店铺传真[可空]
                about: '',// 店铺简介[可空]
                regTime: '',// 公司成立时间[可空]
            },
            rules: {
                storeName: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                      { validator: nospace, trigger: 'blur' }
                ],
                memberId: [
                    { required: true, message: '请输入店主编号', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
                businessLicenseNo: [
                    { required: true, message: '请输入公司执照编号', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入店铺地址', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入店铺电话', trigger: 'blur' },
                     { validator: notel, trigger: 'blur' }
                ],
                about: [
                    { required: true, message: '请输入店铺简介', trigger: 'blur' },
                    { validator: validaddress, trigger: 'blur' }
                ],
            }
        }
    },
    components: {
        vueCoreImageUpload, vueEditor
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
        }
    },
    mounted() {
        this.addForm = Object.assign({}, this.addForm, this.FormData)
        if(this.addForm.regTime == 0 || this.addForm.regTime == '0'){
            this.addForm.regTime = ''
        }
        this.selectPic.picList = []
        if (this.addForm.imgs.path != '' && this.addForm.imgs.path != 'undefined') {
            this.selectPic.picList.push(this.addForm.imgs.path)
        }
        this.picShow = true
    },
    methods: {
        // 保存
        addSubmit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if (this.addForm.imgs.path == '' || this.addForm.imgs.path == 'undefined') {
                        this.$message('请上传图片')
                        return false
                    }
                    this.loginLoading = true
                    let para = Object.assign({}, this.addForm)
                    console.log('test',para.regTime.getTime())
                    if(para.regTime != ''){
                        para.regTime = para.regTime.getTime()
                    }
                    para.imgs = JSON.stringify(para.imgs)
                    if (this.type == 'add') {
                        saveStore(para).then((res) => {
                            this.loginLoading = false;
                            this.$emit('close', false)
                        })
                    } else if (this.type == 'edit') {
                        para.storeId = this.addForm.storeId;
                        updateStore(para).then((res) => {
                            this.loginLoading = false;
                            this.$emit('close', false)
                        })
                    }
                }
            })
        },
        // 取消
        clean() {
            this.$emit('close', false)
            this.$refs['addForm'].resetFields()
        },
        // 上传图片 
        getImg(val) {
            this.addForm.imgs.path = val[0]
            // console.log(this.addForm.imgs.push({
            //     path: val[0]
            // }))
        },
    }
}
</script>
<style lang="scss" soped>
.index .el-input {
    position: relative;
    font-size: 14px;
    width: 460px;
}
</style>
 