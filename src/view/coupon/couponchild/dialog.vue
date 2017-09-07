<template>
  <div class="dialog brand">
    <h3 class="title">{{title}}
      <el-button class="fr" @click.native="clean">取消</el-button>
    </h3>
    <el-form :model="addForm" :rules="rules" label-width="150px" ref="addForm">
      <el-form-item label="用户名" required prop="userName">
        <el-input v-model="addForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="代金券金额" required prop="money">
        <el-input v-model="addForm.money" auto-complete="off" placeholder="请填写代金券金额"></el-input>
      </el-form-item>
      <el-form-item label="代金券描述" required prop="description">
        <el-input v-model="addForm.description" auto-complete="off" placeholder="请描述代金券"></el-input>
      </el-form-item>
      <el-form-item label="代金券生效时间" required prop="effectiveTime">
        <template>
          <div class="block">
            <el-date-picker v-model="addForm.effectiveTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="代金券使用期限" required prop="indate">
        <template>
          <div class="block">
            <el-date-picker v-model="addForm.indate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="addSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { voucherlist, addvoucher, editvoucher } from '@/service/getData'
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      // 新增
      addLoading: false,
      addForm: {
        money: '',
        memberId: '',
        description: '',//品牌名称
        effectiveTime: '',
        indate: '',
        userName: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        money: [
          { required: true, message: '代金券金额', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请描述代金券', trigger: 'blur' },
        ],
      }
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
  },
  mounted() {
    this.addForm = Object.assign({}, this.FormData)
    this.picShow = true
  },
  methods: {
    clean() {
      this.$emit('close', false)
      this.$refs['addForm'].resetFields()
    },
    // 提交
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addLoading = false;
          let para = {
            money: this.addForm.money,
            memberId: this.addForm.memberId,
            description: this.addForm.description,
            effectiveTime: this.addForm.effectiveTime,
            indate: this.addForm.indate,
            userName: this.addForm.userName
          }
          if (this.type == 'add') {
            if (para.effectiveTime == '' || para.indate == '') {
              this.$message('请选择时间')
              return false
            }
            if (para.effectiveTime == '') {
              para.effectiveTime = ''
            } else {
              para.effectiveTime = para.effectiveTime.getTime()
            }
            if (para.indate == '') {
              para.indate = ''
            } else {
              para.indate = para.indate.getTime()
            }
            addvoucher(para).then((res) => {
              this.addLoading = true;
              this.clean()
            })
          } else if (this.type == 'edit') {
            para.voucherId = this.addForm.voucherId,
              para.effectiveTime = '',
              para.indate = ''
            editvoucher(para).then((res) => {
              if (res.data.state == 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.clean()
              } else if (res.data == '') {
                this.$message('登录超时，请重新登录')
              } else {
                this.$message(res.data.messages)
              }
            })
          }

        }
      });
    },
  }
}
</script>

<style lang="scss" soped>
.dialog {
  width: 100%;
  height: 100%;
}

.dialog-footer {
  text-align: center;
}
</style>
 