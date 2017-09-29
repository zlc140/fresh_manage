<template>
  <div class="content classTree">
    <div class="title toolbar">
      <el-button @click="addOne" :plain="true" v-show="!addFormVisible">添加角色</el-button>
    </div>
    <el-table :data="lists" style="98%" v-loading="listLoading" @selection-change="selsChange" v-show="!addFormVisible">
      <el-table-column label="权限编号" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="name">
        <template scope="scope">
          <span @mouseover="Default(scope.$index, scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
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
      <el-dialog  size="mini" v-model="editFormVisible" :close-on-click-modal="false">
       <el-button type="primary" @click.native="editSubmit">设为默认</el-button>
    </el-dialog>
    <!-- 编辑添加 -->
    <dialog-tem v-if="addFormVisible" :type="type" :title="title" :formData="addForm" @close="close"></dialog-tem>
  </div>
</template>
<script>
import { rolelist, roledel,roleDefault } from '@/service/getData'
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
      editFormVisible:false,
      editForm:{
        theDefault:''
      },
      lists: [],
      new:''
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
        }
      })
    },
    // 编辑
    editd(index, row) {
      console.log(row)
      this.type = "edit"
      this.title = "编辑角色"
      this.addFormVisible = true;
      let ids = ''
      if(row.permissionList){
        row.permissionList.forEach(v => {
          ids += v.id+','
          if(v.children && v.children.length>0){
            v.children.forEach(child => {
              ids += child.id+','
            })
          }
        })
      }
      this.addForm = {
        pIds: ids,
        roleCode: row.roleCode,
        name: row.name,
        id:row.id,
        theDefault :row.theDefault 
      }
    },
    // 添加角色
    addOne() {
      this.type = "add"
      this.title = "添加角色"
      this.addFormVisible = true;
      this.addForm = {
        pIds: '',
        roleCode: '',
        name: '',
      }
    },
    // 设为默认
     Default(index,row){
      this.editFormVisible = true
       let para={
            id:row.id
      }
      this.new=para
    },
     editSubmit:function(){
      roleDefault(this.new).then((res)=>{
         this.editFormVisible = false
         this.getList()
      })
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
