<template>
    <div class="dialog banner small roledialog">
        <h3 class="title">{{title}}
            <el-button class="fr" size="small" type="danger" :plain="true" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="addForm" label-width="80px" ref="addForm" :rules="addFormRules">
            <el-form-item label="角色名称" prop="name" required>
                <el-input v-model="addForm.name " auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份标识" prop="roleCode" required>
                <el-input v-model="addForm.roleCode" auto-complete="off"></el-input>
                 <p class="tip">角色：管理员：等级</p>
            </el-form-item> 
          <el-form-item label="默认角色" prop="theDefault">
            <el-switch on-text="" off-text="" v-model="addForm.theDefault" on-text="是" off-text="否"></el-switch>
          </el-form-item>
            <el-form-item label="关联权限" prop="pIds">
                <el-select v-model="classValues" multiple placeholder="请选择权限">
                    <el-option v-for="(item,index) in  classData" :key="index" :value="item.id" :label="item.name"> </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addSubmit">保存</el-button>
        </div>
    </div>
</template>

<script>
import { permissionlist, roleadd, roleedit,rolelist} from '@/service/getData'
export default {
    data() {
          var nospace = (rule, value, callback) => {         
             if (value.trim() == '') {
                callback(new Error('不能输入一串字符'))
            } else {
                callback()
            }
          };
        return {
            parentClass: true,
            addLoading: false,
            addForm: {
                pIds: '',
                roleCode: '',
                name: '',
                theDefault :''
            },
             addFormRules: {
                name: [
                    { required: true, message: '角色名称不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ],
                  roleCode: [
                    { required: true, message: '身份标识不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ],
            },
            classValues:[],
            classData: [],
        }
    },
    props: {
        type: {
            type: String,
            default: 'add'
        },
        title: {
            type: String,
            default: '添加角色'
        },
        formData: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.getclass()
        if (this.type == "edit") {
            this.addForm = {
                id: this.formData.id,
                pIds: this.formData.pIds,
                name: this.formData.name,
                roleCode: this.formData.roleCode,
                theDefault :this.formData.theDefault
            }
            // console.log(this.addForm)
        }
    },
    methods: {
        getclass() {
            permissionlist().then((res) => {
                let _this = this
                if (res.data.state == 200) {
                    let datas = res.data.content
                     _this.classData = []
                    if (!datas) {
                        return false
                    }
                    _this.classValues = []
                    let str = this.addForm.pIds
                    let sub=str.substring(0,str.length-1)
                    let strr=sub.split(",");
                   
                    datas.forEach(function(child) {                            
                        if (_this.type == 'edit') {
                            strr.forEach(v => {
                                if(parseInt(v) == child.id){
                                    _this.classValues.push(child.id)
                                }
                            })                               
                        }
                        _this.classData.push({
                            id: child.id,
                            name: child.name,
                        })
                        if (child.children) {
                            child.children.forEach((item) => {
                                if (_this.type == 'edit') {
                                         strr.forEach(v => {
                                            if(parseInt(v) == item.id){
                                                _this.classValues.push(item.id)
                                            }
                                        })
                                }
                                _this.classData.push({
                                    id: item.id,
                                    name: '　　　' + item.name
                                })
                            })
                        }
                    }, this);
                }
            })
        },
        // 保存
        addSubmit() {
            let _this = this
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addForm.pIds = this.classValues.join(',')
                    let para = {
                        pIds: this.addForm.pIds,
                        name: this.addForm.name,
                        roleCode: this.addForm.roleCode,
                        theDefault :this.addForm.theDefault
                    }
                    if (this.type == 'add') {
                        roleadd(para).then((res) => {
                            this.addLoading = true;
                            this.$emit('close', true)
                        })
                    } else if (this.type == 'edit') {
                        para.id = this.addForm.id
                        roleedit(para).then((res) => {
                            this.editFormLoading = true;
                            this.$emit('close', true)
                        })
                    }
                }
            });
        },
        // 取消
        clean() {
            this.$refs['addForm'].resetFields()
            this.$emit('close', true)
        },
    }
}
</script>

<style>
.roledialog .el-select {
    display: inline-block;
    position: relative;
    width: 440px;
}
.roledialog .el-dialog__header {
    padding: 5px 20px 0;
}
.roledialog .el-dialog__body {
    padding: 16px 20px;
    color: #48576a;
    font-size: 14px;
}
</style>
