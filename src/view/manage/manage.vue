<template>
  <div class="content classTree">
    <div class="title toolbar">
      <el-button @click="addOne" :plain="true" v-show="!addFormVisible">添加设定</el-button>
    </div>
    <el-table :data="lists" border style="98%" v-loading="listLoading" @selection-change="selsChange" v-show="!addFormVisible">
      <!-- 父级 -->
      <el-table-column label="编号" prop="id"> </el-table-column>
      <el-table-column label="项目" prop="keyNames">
        <template scope="scope">
          <span>{{scope.row.keyNames | filterSetting }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="keyCode">
        <template scope="scope">
          <span>{{scope.row.keyCode}}</span>
        </template>
      </el-table-column>
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
import {settinglist,settingDel} from '@/service/getData'
import dialogTem from './child/dialog'
export default {
  data() {
    return {
      listLoading: false,
      //添加
      addFormVisible: false,
      addForm: {
        keyNames:'',
        keyCode:''
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
      settinglist().then((res) => {
        console.log('设置', res)
        if (res.data.state == 200) {
          this.lists = res.data.content.content
        } 
      })
    },
     // 编辑
    editd(index, row) {
      this.type = "edit"
      this.title = "编辑设定"
      this.addFormVisible = true;
      let str = row.keyCode.split(' ').join(',')
      
      this.addForm = {
         keyNames:row.keyNames,
         keyCode:str,
         id:row.id
      }
    },
    
    addOne(){
      this.type = "add"
      this.title = "添加设定"
      this.addFormVisible = true;
      this.addForm = {
        keyNames:'',
        keyCode:''
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
        settingDel(para).then((res) => {
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
  // .play_box {
  //   width: 80px;
  //   text-align: center;
  //   margin-left: -20px;
  //   padding: 10px 0;
  // }
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
