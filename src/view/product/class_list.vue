<template>
  <div class="content classTree">
    <div class="title toolbar">
      <el-button @click="addOne" v-show="!addFormVisible">添加分类</el-button>
    </div>
    <el-table :data="lists" style="98%" v-loading="listLoading" @selection-change="selsChange" v-show="!addFormVisible">
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
                  <a @click="editChild(scope.$index, scope.row)">编辑</a>
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
      <el-table-column prop="classPic" label="hover前图片">
        <template scope="scope">
          <img :src="scope.row.classPic[0].path" />
        </template>
      </el-table-column>
      <el-table-column prop="classPic" label="hover后图片">
        <template scope="scope">
          <img :src="scope.row.classPic[1].path" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
        <template scope="scope">
          <span class="time">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="gcShow">
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
    <!-- 分类的编辑添加 -->
    <dialog-tem v-if="addFormVisible" :type="type" :title="title" :formData="addForm" @close="close"></dialog-tem>

  </div>
</template>

<script>
import { gclist, addClass, removeClass, editData } from '@/service/getData'
import dialogTem from './prochild/dialog'
export default {
  data() {

    return {
      // 图片
      type: 'add',
      title: '添加分类',
      picShow: true,

      listLoading: false,
      //添加分类
      addFormVisible: false,
      addForm: {
        classTitle: '',
        keywords: '',
        gcShow: true,
        pics: [{
          path: ''
        }],
      },
      lists: [],
    };
  },
  components: {
    dialogTem
  },
  mounted() {
    this.getList()
  },
  methods: {
    close() {
      this.getList()

      this.addFormVisible = false
    },
    show(index, row) {
      let show = row.gcShow == true ? false : true
      let _this = this
      let para = {
        gcShow: show,
        classId: row.classId,
      }
      editData(para).then((res) => {
        if (res.data.state == 200) {
        }
      })
    },
    selsChange(sels) {
      this.sels = sels;
    },
    getList() {
      gclist().then((res) => {
        if (res.data.state == 200) {
          console.log(res.data.content)
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

    // 编辑
    editd(index, row) {
      this.type = "edit"
      this.title = "编辑分类"
      this.addFormVisible = true;
      this.addForm = Object.assign({}, row)
    },
    editChild(index,row){
      this.type = "editChild"
      this.title = "编辑子分类"
      this.addFormVisible = true;
      this.addForm = {
        classTitle: row.classTitle,
        keywords: row.keywords,
        classId: row.classId,
        gcShow: row.gcShow
      }
    },
    // 添加子类
    addChild(index, row) {
      this.type = "addChild"
      this.title = "添加子分类"
      this.addFormVisible = true;
      this.addForm = {
        classTitle: '',
        keywords: '',
        parentClassId: row.classId,
        gcShow: true
      }
    },
    // 添加分类
    addOne() {
      this.type = "add"
      this.title = "添加分类"
      this.addFormVisible = true;
      this.addForm = {
        classTitle: '',
        keywords: '',
        gcShow: true,
        pics: [
          {
            path: ''
          },
          {
            path: ''
          }],
      }
    }

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
    // text-align: right;
    padding: 10px 20px;
  }
  img {
    width: 60px;
    height: 60px;
    display: inline-block
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
  .el-dialog--small {
    width: 33%;
  }
  .el-form-item {
    margin-bottom: 22px;
    width: 520px;
  }
  .el-form-item:nth-child(4) label {
    width: 100px!important;
  }
  .el-form-item:nth-child(5) label {
    width: 100px!important;
  }
}
</style>
