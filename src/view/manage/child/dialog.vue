<template>
   <div class="dialog banner small roledialog">
        <h3 class="title">{{title}}
            <el-button class="fr" size="small" type="danger" :plain="true" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="addForm" label-width="150px" ref="addForm" :rules="rules">
            <el-form-item label="选择设定选项" prop="keyNames" required>
                <el-select v-model="addForm.keyNames" @change="changSel">
                    <el-option v-for="item in selList" :key="item.name" :label="item.name" :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="time_name" prop="keyCode" required>
                <el-input v-model="addForm.keyCode"></el-input>
                <p class="tip">提示：符号均是英文格式，时间格式为: 秒,分,时,日,月,年 
                    <br/>(0,0,23,*,*,? 或 0,0,0,10,4,2014)</p>
            </el-form-item> 
          
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="addSubmit">保存</el-button>
        </div>
    </div>
</template>

<script>
import {settingSave ,settingEdit} from '@/service/getData'
export default {
data(){
     var checkTime = (rule, value, callback) => {
         let praen = /^(\d{1,2})[,]([\d|*|?]{1,2}[,]){4}([\d|*|?]{1,4})$/
      if (value.trim() == '') {
        callback(new Error('不能输入一串空字符'))
      } else if(!praen.test(value)){
         callback(new Error('时间格式不正确'))
      }else {
        callback()
      }
    };
    return{
        selList:[
            {label:'ORDER_AUTOMATIC_ORDER',name:'自动下单时间'},
            {label:'BILLS_PAYMENT_TIME',name:'账单付款时间'},
            {label:'BILLS_PAYMENT_FINISH_TIME',name:'账单结算时间'},
            {label:'VOUCHER_PAST_TIME',name:'优惠券过期时间'},
            {label:'BILLS_CLEARING_BILLS',name:'出账时间'},
            {label:'MODIFY_PRICE_GOODS_CHECKON_TIME',name:'价格修改商品自动生效时间'}
        ],
        addForm : {
            keyNames:'',
            keyCode:''
        },
        rules : {
            keyNames:[
                 { required: true, message: '选择项目名', trigger: 'blur,change' },
            ],
            keyCode:[
                { required: true, message: '请填写时间', trigger: 'blur,change' },
                 { validator: checkTime, trigger: 'blur' }
            ]
        },
        time_name:'选择时间',
        
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
mounted(){
   this.addForm = Object.assign({},this.formData)
  
},
methods:{
        addSubmit(){
        this.$refs.addForm.validate((valid) => {
            if (valid) {
            let times = ''
            
             let prop = {
                        keyNames:this.addForm.keyNames,
                        keyCode:this.addForm.keyCode
            }
            if(this.type == 'add'){
                settingSave(prop).then((res) => {
                    console.log('add' , res.data)
                    if(res.data.state == 200){
                        this.clean()
                    }else{
                        this.$message(res.data.messages)
                    }
                })
           }else{
                prop.id = this.addForm.id
                settingEdit(prop).then(res => {
                    console.log('edit',res)
                     if(res.data.state == 200){
                        this.clean()
                    }else{
                        this.$message(res.data.messages)
                    }
                })
           }
          }
        })
        },
        changSel(row){
            let _this = this
            this.selList.forEach(v => {
                if(v.label == row){
                    _this.time_name = '选择'+v.name
                }
            })
            
        },
         clean() {
            this.$refs['addForm'].resetFields()
            this.$emit('close', true)
        },
    }
}
</script>

<style>

</style>
