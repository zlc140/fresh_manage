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
            <el-form-item required label="上传执照" prop="imgs.path">
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
        return {
            // 日期时间
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // 图片
            picShow: true,
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
                ],
                memberId: [
                    { required: true, message: '请输入店主编号', trigger: 'blur' },
                ],
                businessLicenseNo: [
                    { required: true, message: '请输入公司执照编号', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入店铺地址', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入店铺电话', trigger: 'blur' },
                ],
                about: [
                    { required: true, message: '请输入店铺简介', trigger: 'blur' },
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
                    para.imgs = JSON.stringify(para.imgs)
                    para.regTime = Date.parse(para.regTime)
                    if (this.type == 'add') {
                        para.regTime = '';
                        saveStore(para).then((res) => {
                            this.loginLoading = false;
                            this.$emit('close', false)
                        })
                    } else if (this.type == 'edit') {
                        para.storeId = this.addForm.storeId;
                        para.regTime = this.addForm.regTime;
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
 