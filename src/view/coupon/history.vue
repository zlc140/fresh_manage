<template>
  <div class="voucher">
    <!-- form -->
    <!-- <el-form :inline="true" :model="form" class="demo-form-inline" v-if="!addFormVisible">
       <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="代金券编号">
        <el-input v-model="form.voucherId"></el-input>
      </el-form-item>
       <el-form-item label="代金券状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button>
      </el-form-item>
      <el-form-item class="add">
        <el-button type="primary" :plain="true" @click="handle('add')">新增</el-button>
      </el-form-item>
    </el-form> -->
    <el-table :data="getData" border style="width: 98%" >
      <!-- 表格-->
      <el-table-column label="日志ID" prop="logId" min-width="100px"></el-table-column>
        <el-table-column  label="操作人" prop="username ">
        <template scope="scope">
          <span>{{ scope.row.member.username}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="代金券编号" prop="voucher">
          <template scope="scope">
            <span>{{ scope.row.voucher.voucherId}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" label=" 代金券金额" prop="money">
        <template scope="scope">
          {{scope.row.voucher.money | currency}}
        </template>
      </el-table-column>
      <el-table-column label="操作描述" prop="description" min-width="100px">
      </el-table-column>
      <el-table-column label="代金券状态" align="center" prop="state">
        <template scope="scope">
          <span>{{ scope.row.voucher.state | voucherType}}</span>
        </template>
      </el-table-column>
       <el-table-column  label="操作"  align="center" prop="operation">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import {voucherLog,voucherOneLog} from '@/service/getData'
export default {
    data(){
      return{
        getData:[],
        currentPage1: 1,
        pageSize: 10,
        pageNum : 1,
        total: 0,
      }
    },
    mounted(){
      this.getList()
      let prop = {
        logId :2
      }
      voucherOneLog(prop).then( res => {
        console.log('one',res)
      })
    },
    methods:{
      getList(){
          let prop = {
            pageNum:this.pageNum-1,
            pageSize:this.pageSize
          }
          voucherLog(prop).then(res => {
            if(res.data.state == 200){
              this.getData = res.data.content.content
              this.total = res.data.content.totalElements
            }
            console.log('list',res)
          })
      },
      handleCurrentChange(val){
        this.pageNum = val
        this.getList()
      }
    }
}
</script>

<style>
  
</style>
