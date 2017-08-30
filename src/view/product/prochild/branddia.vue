<template>
  <div class="dialog brand">
    <h3 class="title">{{title}}</h3>
    <el-form :model="addForm" label-width="80px" ref="addForm">
      <el-form-item label="店铺编号" prop="storeId" >
        <el-input v-model="addForm.storeId" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="品牌编号" prop="brandId">
        <el-input v-model="addForm.brandId" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="品牌名称" prop="brandTitle">
        <el-input v-model="addForm.brandTitle" auto-complete="off"></el-input>
      </el-form-item>
      <div class="addlogo">
        <el-form-item label="LOGO" prop="pics.path">
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
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="clean">取消</el-button>
      <el-button type="primary" @click.native="addSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import { brandlist, addbrand, branddelete, brandupdate } from '@/service/getData'
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
      // 新增
      addFormVisible: false,
      addLoading: false,
      addForm: {
        storeId: '',
        brandId: '',
        brandTitle: '',//品牌名称
        pics: {
          path: ''
        },
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
    
  },
  components: {
    vueCoreImageUpload
  },
  mounted() {
    this.addForm = this.FormData
    this.selectPic.picList = []
    if (this.type == 'edit' && this.addForm.pics[0].path) {
      this.selectPic.picList.push(
        this.addForm.pics[0].path
      )
    }
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
           if(this.addForm.pics.path == ''){
                  this.$message('请上传banner图片')
                   return false
             }
          if (this.type == 'add') {
            this.$confirm('确定添加该品牌？', '提示', {}).then(() => {
              this.addLoading = false;
              this.addFormVisible = false;
              let para = {
                brandTitle: this.addForm.brandTitle,
                pics: this.addForm.pics,
                storeId: this.addForm.storeId,
              }
              para.pics = JSON.stringify(para.pics)
              addbrand(para).then((res) => {
                if (res.data.state == 200) {
                  this.addLoading = true;
                  this.$emit('Success',true)
                  this.clean()
                }
              })
            })
          } else if (this.type == 'edit') {
            this.$confirm('确定改变该分类？', '提示', {}).then(() => {
              this.addLoading = false;
              this.addFormVisible = false;
              let para = {
                brandTitle: this.addForm.brandTitle,
                pics: this.addForm.pics,
                brandId: this.addForm.brandId
              }
              console.log(para)
              para.pics = JSON.stringify(para.pics)
              brandupdate(para).then((res) => {
                this.addLoading = true;
                console.log(res)
                if (res.data.state == '200') {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$emit('Success',true)
                  this.clean()
                } else if (res.data == '') {
                  this.$message('登录超时，请重新登录')
                }
              })
            })
          }

        }
      });
    },
    getImg(val) {
      this.addForm.pics = []
      this.addForm.pics.push({
        path: val[0]
      })
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
 