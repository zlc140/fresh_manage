<template>
  <div class="dialog banner small">
    <h3 class="title">{{title}} <el-button class="fr"  size="small" type="danger" :plain="true" @click.native="clean">取消</el-button></h3>
     <el-form :model="addForm"  label-width="80px" ref="addForm" :rules="addFormRules">
        <el-form-item label="链接地址" prop="url" required>
          <el-input v-model="addForm.url"  auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="链接方式" prop="method" required>
          <el-input v-model="addForm.method" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="描述" prop="description" required>
          <el-input v-model="addForm.description"  auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="组件名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="组件地址" prop="path">
          <el-input v-model="addForm.path"  auto-complete="off" ></el-input>
        </el-form-item>
          <el-form-item label="组件" prop="component">
          <el-input v-model="addForm.component"  auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addSubmit">保存</el-button>
      </div>
</div>
</template>

<script>
import { permissionadd,permissionedit } from '@/service/getData'
export default {
    data(){
         var nospace = (rule, value, callback) => {         
             if (value.trim() == '') {
                callback(new Error('不能输入一串字符'))
            } else {
                callback()
            }
         };
        return{
            parentClass:true,
            addLoading:false,
            addForm : {
                url: '',
                method: '',
                description:'',
                name:'',
                path:'',
                component:'',
                oldId:''
            },
             addFormRules: {
                url: [
                    { required: true, message: '链接地址不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ],
                  method: [
                    { required: true, message: '链接方式不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ],
                  description: [
                    { required: true, message: '描述不可为空', trigger: 'blur' },
                    { validator: nospace, trigger: 'blur' }
                ]
            },
        }
    },
    props:{
        type:{
            type:String,
            default:'add'
        },
        title:{
            type:String,
            default:'添加权限' 
        },
        formData:{
            type:Object,
            default:null
        }
    },
    mounted(){
        if(this.type=="edit"){
            this.addForm = {
                id:this.formData.id,
                url: this.formData.url,
                method: this.formData.method,
                description: this.formData.description,
                name: this.formData.name,
                path:this.formData.path,
                component:this.formData.component
            }
        }
        if(this.type=="editChild" || this.type=="addChild"){
            this.parentClass = false
             this.addForm = Object.assign({},this.formData)
        }
    },
    methods:{
        // 保存
        addSubmit(){
            let _this = this           
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                    let para = {
                        url: this.addForm.url,
                        method: this.addForm.method,
                        description: this.addForm.description,
                        name: this.addForm.name,
                        path:this.addForm.path,
                        component:this.addForm.component,
                        oldId : this.addForm.oldId
                    }
                   if(this.type=='add'){
                         permissionadd(para).then((res) => {
                            this.addLoading = true;
                              this.$emit('close',true)
                        })
                   }else if(this.type=='edit'){
                        para.id = this.addForm.id
                        permissionedit(para).then((res) => {
                            this.editFormLoading = true;
                            this.$emit('close',true)
                        })
                   }else if(this.type=="addChild"){
                       permissionadd(para).then((res) => {
                            this.addChildLoading = true;
                             this.$emit('close',true)
                        })
                   }else if(this.type=="editChild"){
                        para.id = this.addForm.id
                        permissionedit(para).then((res) => {
                            this.editFormLoading = true;
                             this.$emit('close',true)
                        })
                   }
                   
                    }
                });
        },
          // 取消
        clean(){
            this.$refs['addForm'].resetFields()
            this.$emit('close',true)
        },
    }
}
</script>

<style>

</style>
