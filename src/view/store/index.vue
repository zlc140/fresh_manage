<template>
  <div class="store">
    <!-- form -->
    <div class="storeform">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
          <el-form-item label="店铺名称">
            <el-input v-model="form.storeName"></el-input>
          </el-form-item>
          <el-form-item label="店铺编号">
            <el-input v-model="form.storeId"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新增</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="storeData" style="width: 100%">
      <el-table-column prop="storeName" label="店铺名称"> </el-table-column>
      <el-table-column prop="storeId " label="店铺编号">
        <template scope="scope">
          <span>{{ scope.row.storeId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state " label="店铺状态">
        <template scope="scope">
          <span>{{ scope.row.state | storestate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="businessLicenseNo" label="公司执照编号"></el-table-column>
      <el-table-column prop="regTime" label="公司成立时间">
        <template scope="scope">
          <span>{{ scope.row.regTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <a>编辑</a>
          <a>删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { selectStore, deleteStore, updateStore, saveStore } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        storeName: '',
        storeId: '',
        state: ''
      },
      // 分页
      currentPage1: 1,
      pageSize: 3,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      // 商品状态
      options: [
        {
          value: 'STORE_STATE_ON_CHECKING',
          label: '审核中'
        }, {
          value: 'STORE_STATE_CHECK_ON',
          label: '审核通过'
        }, {
          value: 'STORE_STATE_CHECK_OFF',
          label: '审核不通过'
        }, {
          value: 'STORE_STATE_ON_CLOSE',
          label: '店铺倒闭'
        }
      ],
      //  列表数据
      storeData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let para = {
        pageNum: this.pageNum-1,
        pageSize: this.pageSize,
        storeName: this.form.storeName,
        storeId: this.form.storeId,
        state: this.form.state
      }
      selectStore(para).then((res) => {
        this.storeData = res.data.content.content
        this.totalElements = res.data.content.totalElements
      })
    },
    // 查询
    onSubmit(data){
       if(data=='search'){
        this.page = 1
        this.currentPage1 = 1
       }
       this.getList()
    },
    //  点击分页
  handleCurrentChange(val) {
    this.pageNum = val
    this.getList()
  },
  }
}
</script>

<style>
.storeform .el-form-item {
  margin-bottom: 22px;
  width: 300px;
  float: left;
}

.storeform .el-form-item__content {
  line-height: 36px;
  position: relative;
  font-size: 14px;
  margin-left: 570px;
}
</style>
