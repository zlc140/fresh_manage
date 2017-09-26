<template>
    <div class="dialog banner small roledialog">
        <h3 class="title">{{title}}
            <el-button class="fr" size="small" type="danger" :plain="true" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="addForm" label-width="80px" ref="addForm">
            <el-form-item label="链接方式" prop="roleCode" required>
                <el-input v-model="addForm.roleCode " auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份标识" prop="name" required>
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="关联权限" prop="permissionIds">
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
import { rolelist, roleadd, roleedit } from '@/service/getData'
export default {
    data() {
        return {
            parentClass: true,
            addLoading: false,
            addForm: {
                permissionIds: '',
                roleCode: '',
                name: '',
            },
            classValues: [],
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
        if (this.type == "edit") {
            this.addForm = {
                id: this.formData.id,
                permissionIds: this.formData.permissionIds,
                name: this.formData.name,
                roleCode: this.formData.roleCode,
            }
        }
        this.getclass()
    },
    methods: {
        getclass() {
            rolelist().then((res) => {
                let _this = this
                if (res.data.state == 200) {
                    let datas = res.data.content
                    // console.log(datas)
                    this.classData = []
                    if (!datas) {
                        return false
                    }
                    _this.classValues = []
                    datas.forEach(function(child) {
                        if (_this.type == 'edit' && child.permissionList) {
                            _this.classValues.push(child.permissionList[0].id)
                        }
                        //  console.log(child) 
                        _this.classData.push({
                            id: child.permissionList[0].id,
                            name: child.permissionList[0].name
                        })
                        if (child.permissionList[0].children && child.permissionList[0].children.length > 0) {
                            child.permissionList[0].children.forEach((item) => {
                                if (_this.type == 'edit') {
                                    _this.classValues.push(item.id)
                                }
                                //  console.log(item)
                                _this.classData.push({
                                    id: item.id,
                                    name: '      ' + item.name
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
                    let para = {
                        permissionIds: this.addForm.permissionIds,
                        name: this.addForm.name,
                        roleCode: this.addForm.roleCode
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
</style>
