<template>
  <div class="content classTree">
    <div class="title toolbar">
      <el-button @click="addOne" :plain="true" v-show="!addFormVisible">添加角色</el-button>
    </div>
    <el-table :data="lists" style="98%" v-loading="listLoading" @selection-change="selsChange" v-show="!addFormVisible">
      <!-- 子级 -->
      <!-- <el-table-column type="expand" label="子类">
          <template scope="scope">
            <el-table :data="scope.row.permissionList[0].children" style="100%" :show-header="false">
              <el-table-column label="权限编号" prop="id"></el-table-column>
              <el-table-column label="链接地址" prop="url"></el-table-column>
              <el-table-column label="链接方式" prop="method"></el-table-column>
              <el-table-column label="组件名称" prop="name"></el-table-column>
              <el-table-column label="组件地址" prop="path"></el-table-column>    
              <el-table-column label="操作" width="100">
                <template scope="scope">
                  <div class="play_box">
                    <a @click="editChild(scope.$index, scope.row)">编辑</a>
                     <a @click="delChild(scope.$index, scope.row)">删除</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column> -->
      <!-- 父级 -->
      <el-table-column label="权限编号" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="身份标识" prop="roleCode"></el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <div class="play_box">
            <el-button type="text" @click="editd(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="delChild(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分类的编辑添加 -->
    <dialog-tem v-if="addFormVisible" :type="type" :title="title" :formData="addForm" @close="close"></dialog-tem>
  </div>
</template>
<script>
import { rolelist, roledel } from '@/service/getData'
import dialogTem from './child/roledialog'
export default {
  data() {
    return {
      listLoading: false,
      //添加角色
      addFormVisible: false,
      addForm: {
        id: '',
        roleCode: '',
        name: '',
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
    selsChange(sels) {
      this.sels = sels;
    },
    getList() {
      rolelist().then((res) => {
        if (res.data.state == 200) {
          this.lists = res.data.content
          // console.log(this.lists)
          this.lists.forEach(function(child) {
            // console.log(child.permissionList[0].children)
          }, this);
        }
      })
    },
    // 编辑
    editd(index, row) {
      this.type = "edit"
      this.title = "编辑角色"
      this.addFormVisible = true;
      this.addForm = Object.assign({}, row)
    },
    // 添加角色
    addOne() {
      this.type = "add"
      this.title = "添加角色"
      this.addFormVisible = true;
      this.addForm = {
        ipermissionIds: '',
        roleCode: '',
        name: '',
      }
    },
    // 删除
    delChild(index, row) {
      let _this = this
      this.$confirm('确认删除该记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoding = true;
        let para = { id: row.id }
        roledel(para).then((res) => {
          this.listLoding = false;
          _this.getList()
        })
      })
    },
  }
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
    padding: 10px 20px;
  }
  img {
    width: 60px;
    max-height: 60px;
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
}
</style>
