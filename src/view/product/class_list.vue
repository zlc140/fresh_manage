<template>
  <div class="content classTree">
    <div class="title">
      <el-button @click="addOne">添加分类</el-button>
    </div>
     <el-table 
      :data="lists"
      style="98%">
        <el-table-column type="expand">
          <template scope="scope">
               <el-table  
                  :data="scope.row.childClass"
                  style="100%"
                  :show-header="false">
                      <el-table-column label="分类名称" prop="classTitle">
                      </el-table-column>
                      <el-table-column label="优先级" prop="classTitle">
                      </el-table-column>
                      <el-table-column label="是否显示" prop="classTitle" width="150">
                        <template scope="scope">
                              <el-switch
                                v-model="scope.row.gcShow"
                                on-text="是"
                                off-text="否"
                                >
                              </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="100">
                        <template scope="scope">
                          <div class="play_box">
                          <a>编辑</a>
                          <a>删除</a>
                          </div>
                        </template>
                      </el-table-column>
                </el-table>
          </template>
        </el-table-column>
          <el-table-column label="分类名称" prop="classTitle">
          </el-table-column>
           <el-table-column label="优先级" prop="classTitle">
          </el-table-column>
          <el-table-column label="是否显示" prop="classTitle" width="200">
            <template scope="scope">
                  <el-switch
                    v-model="scope.row.gcShow"
                    on-text="是"
                    off-text="否"
                    >
                  </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template scope="scope">
              <div class="play_box">
               <a >添加子类</a>
               <br>
               <a>编辑</a>
               <a>删除</a>
               </div>
            </template>
          </el-table-column>
     </el-table>

  </div>
</template>

<script>
import { gclist } from '@/service/getData'
 
  export default {
    data() {
      return {
        lists: [],
        defaultProps: {
          children: 'childClass',
          label: 'classTitle'
        }
      };
    },
    mounted(){
      this.getList()
    },
    methods:{
      getList(){
        gclist().then((res) => {
          if(res.data.state ==200){
            this.lists = res.data.content
            console.log(this.lists)
          }
        })
      },
      addOne(){
        console.log('添加分类')
      }
    }
     
      
  };
</script>

<style lang="scss">
.classTree{
  .play_box{
    width:80px;
    text-align: center;
     margin-left: -20px;
     padding: 10px 0;
  }
  .title{
    text-align: right;
    padding: 10px 20px;
  }
  .el-tree-node__children .del{
    display: none;
  }
  .el-tree-node{
    border-bottom: 1px solid #d1dbe5 ;
    padding: 10px;
    &:last-child{
      border-bottom: none;
    }
  }
  }
</style>
