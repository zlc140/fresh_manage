<template>
  <div class="content classTree">
    <div class="title">
      <el-button @click="addOne">添加分类</el-button>
    </div>
    <el-table :data="lists" style="98%" v-loading="listLoading" @selection-change="selsChange">
      <!-- 子级 -->
      <el-table-column type="expand">
        <template scope="scope">
          <el-table :data="scope.row.childClass" style="100%" :show-header="false">
            <el-table-column label="分类名称" prop="classTitle"> </el-table-column>
            <el-table-column label="关键字" prop="keywords"> </el-table-column>
            <el-table-column label="创建时间" prop="createTime">
              <template scope="scope">
                <span class="time">{{ scope.row.createTime | formatDate }}</span>
              </template>
          </el-table-column>
            <el-table-column label="是否显示" prop="gcShow" width="200">
        <template scope="scope">
          <el-switch v-model="scope.row.gcShow" on-text="是" off-text="否" @change="show(scope.$index, scope.row)"> </el-switch>
        </template>
      </el-table-column>
            <el-table-column label="操作" width="100">
              <template scope="scope">
                <div class="play_box">
                  <a @click="editd(scope.$index, scope.row)">编辑</a>
                  <a @click="handleDel(scope.$index, scope.row)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!-- 父级 -->
      <el-table-column label="分类名称" prop="classTitle">
      </el-table-column>
      <el-table-column label="关键字" prop="keywords">
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
        <template scope="scope">
          <span class="time">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="gcShow" width="200">
        <template scope="scope">
          <el-switch v-model="scope.row.gcShow" on-text="是" off-text="否" @change="show(scope.$index, scope.row)"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
           <div class="play_box">
              <el-button type="text" @click="addChild(scope.$index, scope.row)">添加子类</el-button>
              <el-button type="text" @click="editd(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加子分类界面 -->
    <el-dialog title="添加子分类" v-model="addChildVisible" :close-on-click-modal="false">
      <el-form :model="addChildForm" :rules="addChildRules" label-width="80px" ref="addChildForm">
        <el-form-item label="分类名称" prop="classTitle">
          <el-input v-model="addChildForm.classTitle" placeholder="分类名称长度应在2-10位，推荐3-6个汉字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="addChildForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="gcShow">
          <el-switch v-model="addChildForm.gcShow" on-text="是" off-text="否"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clean">取消</el-button>
        <el-button type="primary" @click.native="addChildSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--添加分类-->
    <el-dialog title="添加分类" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="addFormRules" label-width="80px" ref="addForm">
        <el-form-item label="分类名称" prop="classTitle">
          <el-input v-model="addForm.classTitle" placeholder="分类名称长度应在2-10位，推荐3-6个汉字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="addForm.keywords" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="gcShow">
          <el-switch v-model="addForm.gcShow" on-text="是" off-text="否"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clean">取消</el-button>
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="editFormRules" label-width="80px" ref="editForm">
        <el-form-item label="分类名称" prop="classTitle">
          <el-input v-model="editForm.classTitle" placeholder="分类名称长度应在2-10位，推荐3-6个汉字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="editForm.keywords" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="gcShow">
          <el-switch v-model="editForm.gcShow" on-text="是" off-text="否"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clean">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gclist, addClass, removeClass, editData} from '@/service/getData'

export default {
  data() {
    var nospace = (rule, value, callback) => {
      var par = /^[a-zA-Z\u4E00-\u9FA5\_]{2,10}$/
      if (!par.test(value) && 　value.trim() != '') {
        callback(new Error('分类名称为中英文,下划线，长度2~10位'));
      } else if (value.trim() == '') {
        callback(new Error('分类名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      listLoading: false,
      //添加分类
      addFormVisible: false,
      addLoading: false,
      addForm: {
        classTitle: '',
        keywords: '',
        gcShow: true
      },
      addFormRules: {
        classTitle: [
          { required: true, message: '分类名称不可为空', trigger: 'blur' },
          { validator: nospace, trigger: 'blur' }
        ]
      },
      //编辑界面
      editFormVisible: false,
      editFormLoading: false,
      editForm: {
        classTitle: '',
        keywords: '',
        gcShow: true,
        parentClassId: '',
        classId: ''
      },
      editFormRules: {
        classTitle: [
          { required: true, message: '分类名称不可为空', trigger: 'blur' },
          { validator: nospace, trigger: 'blur' }
        ]
      },
      //添加子分类
      addChildVisible: false,
      addChildLoading: false,
      addChildForm: {
        parentClassId: '',
        classTitle: '',
        keywords: '',
        gcShow: true,
      },
      addChildRules: {
        classTitle: [
          { required: true, message: '分类名称不可为空', trigger: 'blur' },
          { validator: nospace, trigger: 'blur' }
        ]
      },
      lists: [],
      defaultProps: {
        children: 'childClass',
        label: 'classTitle'
      }
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    show(index,row){
     let show = row.gcShow == true ? false:true
     
     let _this = this
     let para = {
              gcShow: show,
              classId: row.classId,
            }
       editData(para).then((res) => {
         if(res.data.state == 200){
          //  _this.getList()
         }
       })
    },
    selsChange(sels) {
      this.sels = sels;
    },
    getList() {
      gclist().then((res) => {
        if (res.data.state == 200) {
          this.lists = res.data.content
        }
      })
    },
    // 删除
    handleDel(index, row) {
      let _this = this
      this.$confirm('确认删除该记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoding = true;
        let para = { classId: row.classId }
        removeClass(para).then((res) => {
          this.listLoding = false;
          if (res.data.state == '200') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            _this.getList()
          } else if (res.data == '') {
            this.$message('登录超时，请重新登录')
          } else {
            this.$message('系统出错')
          }
        }).catch((res) => {
          console.log(res.data)
        })
      })
    },
    // 取消
    clean() {
      if (this.addFormVisible == true) {
        this.addFormVisible = false
        this.$refs['addForm'].resetFields()
      } else if (this.addChildVisible == true) {
        this.addChildVisible = false
        this.$refs['addChildForm'].resetFields()
      } else if (this.editFormVisible == true) {
        this.editFormVisible == false
        this.$refs['editForm'].resetFields()
      }
    },
    // 编辑
    editd(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row)
    },
    // 编辑提交
    editSubmit() {
      let _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确定改变该分类？', '提示', {}).then(() => {
            this.editFormLoading = false;
            this.editFormVisible = false;
            let para = {
              classTitle: this.editForm.classTitle,
              keywords: this.editForm.keywords,
              gcShow: this.editForm.gcShow,
              classId: this.editForm.classId,
              parentClassId: this.parentClassId
            }
            editData(para).then((res) => {
              console.log(res)
              console.log(res.data.state)
              this.editFormLoading = true;
              if (res.data.state == '200') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                _this.getList()
                this.$refs['editForm'].resetFields()
              } else if (res.data == '') {
                this.$message('登录超时，请重新登录')
              }
            })
          })
        }
      });
    },
    // 添加子类
    addChild(index, row) {
      this.addChildVisible = true;
      this.addChildForm = {
        classTitle: '',
        keywords: '',
        parentClassId: row.classId,
        gcShow: true
      }
    },
    // 添加子类提交
    addChildSubmit() {
      let _this = this
      this.$refs.addChildForm.validate((valid) => {
        if (valid) {
          this.$confirm('确定添加子分类？', '提示', {}).then(() => {
            this.addChildLoading = false;
            this.addChildVisible = false;
            let para = Object.assign({}, this.addChildForm);
            console.log(para)
            addClass(para).then((res) => {
              this.addChildLoading = true;
              if (res.data.state == '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                _this.getList()
                this.$refs['addChildForm'].resetFields()
              } else if (res.data == '') {
                this.$message('登录超时，请重新登录')
              }
            })
          })

        }
      })
    },
    // 添加分类
    addOne() {
      this.addFormVisible = true;
      this.addForm = {
        classTitle: '',
        keywords: '',
        gcShow: true
      }
    },
    //  添加分类提交
    addSubmit() {
      let _this = this
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // this.$confirm('确定添加该分类？', '提示', {}).then(() => {
            this.addLoading = false;
            this.addFormVisible = false;
            let para = Object.assign({}, this.addForm);
            // console.log(para)
            addClass(para).then((res) => {
              console.log(res)
              this.addLoading = true;
              if (res.data.state == '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                _this.getList()
                this.$refs['addForm'].resetFields()
              } else if (res.data == '') {
                this.$message('登录超时，请重新登录')
              }
            })
          // })
        }
      });
    },
  },
};
</script>

<style lang="scss">
.classTree {
  .play_box {
    width: 80px;
    text-align: center;
    margin-left: -20px;
    padding: 10px 0;
  }
  .title {
    text-align: right;
    padding: 10px 20px;
  }
  .el-tree-node__children .del {
    display: none;
  }
  .el-tree-node {
    border-bottom: 1px solid #d1dbe5;
    padding: 10px;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
