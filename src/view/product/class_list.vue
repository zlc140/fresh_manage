<template>
  <div class="content">
    <div class="title">
      <el-button @click="addOne">新增分类</el-button>
    </div>
    <el-tree
      :data="data2"
      :props="defaultProps"
      accordion
      :expand-on-click-node="false"
      node-key="id"
      :render-content="renderContent"
      @node-click="handleNodeClick">
    </el-tree>

  </div>
</template>

<script>
import { gclist } from '@/service/getData'
 
  export default {
    data() {
      return {
        data2: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
            
          }, {
            label: '二级 2-2'
          }]
        }],
        lists:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    created(){
        this.getList()
    },
    methods: {
      async getList(){
          this.lists = await gclist()
          console.log(this.lists)
      },
      handleNodeClick(data) {
        console.log(data);
      },
      addOne(){
          console.log(1)
      },
      append(store, data) {
          this.data2 = [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'
          }]
        }]
        
        
      },

      remove(store, data) {
        store.remove(data);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>添加</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>
          );
      }
    }
  };
</script>

<style>
  
</style>
