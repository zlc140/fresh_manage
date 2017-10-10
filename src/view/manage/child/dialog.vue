<template>
   <div class="dialog banner small roledialog">
        <h3 class="title">{{title}}
            <el-button class="fr" size="small" type="danger" :plain="true" @click.native="clean">取消</el-button>
        </h3>
        <el-form :model="addForm" label-width="150px" ref="addForm" >
            <el-form-item label="选择设定选项" prop="keyNames" required>
                <el-select v-model="addForm.keyNames" @change="changSel">
                    <el-option v-for="item in selList" :key="item.name" :label="item.name" :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="time_name" prop="keyCode" required>
                 <el-time-picker
                        v-model="addForm.keyCode"
                        placeholder="任意时间点">
                    </el-time-picker>
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
 
    return{
        selList:[
            {label:'ORDER_AUTOMATIC_ORDER',name:'自动下单时间'},
            {label:'BILLS_PAYMENT_TIME',name:'账单付款时间'},
            {label:'BILLS_PAYMENT_FINISH_TIME',name:'账单结算时间'},
            {label:'VOUCHER_PAST_TIME',name:'优惠券过期时间'}
        ],
        addForm : {
            keyNames:'',
            keyCode:new Date(2016, 9, 10, 0, 0)
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
   if(this.type == 'edit'){
        let tt =  this.addForm.keyCode.split(' ')
        this.addForm.keyCode = new Date(2016,9,10,tt[2],tt[1],tt[0])
   }
},
methods:{
        addSubmit(){
            let times = ''
            if(this.addForm.keyNames == '' ){
                this.$message('请选择设定选项')
                return false
            }else if(this.addForm.keyCode == ''){
                this.$message('请选择时间')
                return false
            }else{
                let tt = this.addForm.keyCode
                console.log(tt.getSeconds() , tt.getHours() , tt.getMinutes())
                times +=tt.getSeconds()+' ' + tt.getMinutes() +' ' + tt.getHours()+' * * ?'
            }
             if(type == 'add'){
                    let prop = {
                        keyNames:this.addForm.keyNames,
                        keyCode:times
                    }
                settingSave(prop).then((res) => {
                    console.log('add' , res.data)
                })
           }else{

           }
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
