<template>
  <div class="store">
    <!-- form -->
    <div class="storeform">
      <el-form ref="form" :model="form" label-width="80px" v-if="!addFormVisible" >
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
            <el-button type="primary" @click="handle('add')">新增</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="storeData" style="width: 100%" v-if="!addFormVisible" >
       <el-table-column type="expand" prop="businessLicense" label="图片展示">
        <template scope="scope">
          <img :src="scope.row.businessLicense.path" />
        </template>
      </el-table-column>
      <el-table-column prop="storeId " label="店铺编号">
        <template scope="scope">
          <span>{{ scope.row.storeId }}</span>
        </template>
      </el-table-column>
       <el-table-column prop="storeName" label="店铺名称"> </el-table-column>
      <el-table-column prop="memberId " label="店主编号">
        <template scope="scope">
          <span>{{ scope.row.member.memberId }}</span>
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
          <a @click="handle(scope.row)">编辑</a>
          <a @click="handleDel(scope.$index, scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar" v-if="!addFormVisible" >
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
    <!--弹出界面 新增or编辑-->
    <dialog-tem :title="title" v-if="addFormVisible" :FormData="FormData" :type="type" @close="close"></dialog-tem>
  </div>
</template>
<script>
import dialogTem from './child/dialog'
import { selectStore, deleteStore, updateStore, saveStore } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        storeName: '',
        storeId: '',
        state: ''
      },
      title: '新增',
      type: 'add',
      length: 1,
      listLoading: false,
      addFormVisible: false,//新增界面是否显示
      FormData: {
        title: '',
        imgs: {
          path: '',
        },
        storeId: '',
        state: '',
        storeName: '',// 店铺名称
        memberId: '',// 店主id
        childMemberIds: '',//店员id拼接的字符串[可空]
        businessLicenseNo: '',//公司执照编号
        address: '',// 店铺地址
        tel: '',// 店铺电话
        fax: '',//店铺传真[可空]
        about: '',// 店铺简介[可空]
        regTime: '',// 公司成立时间[可空]
      },
      // 分页
      currentPage1: 1,
      pageSize: 10,
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
  components: { dialogTem },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let _this=this
      let para = {
        pageNum : this.pageNum  - 1,
        pageSize: this.pageSize,
        storeName: this.form.storeName,
        storeId: this.form.storeId,
        state: this.form.state
      }
       _this.storeData=[]
       _this.totalElements=0
      selectStore(para).then((res) => {
        if(res.data.state==200){
         _this.storeData = res.data.content.content
         _this.totalElements = res.data.content.totalElements
        }
      })
    },
    //   弹框
    handle: function(row) {
      let _this = this
      let length = this.lists.length + 1
      this.addFormVisible = true;
      if (row == 'add') {
        this.type = 'add'
        this.title = '新增'
        this.FormData = {
          title: '',
          storeName: '',// 店铺名称
          memberId: 'M20170808155929199',// 店主id
          businessLicenseNo: '',//公司执照编号
          imgs: {
            path: ''
          },//公司执照图片
          address: '',// 店铺地址
          tel: '',// 店铺电话
          fax: '',//店铺传真[可空]
          about: '',// 店铺简介[可空]
          regTime: '',// 公司成立时间[可空]
        };
      } else {
        this.type = 'edit'
        this.title = '编辑'
        this.FormData = {
          storeId: row.storeId,// 店铺id
          storeName: row.storeName,// 店铺名称
          memberId: row.member.memberId,// 店主id
          businessLicenseNo: row.businessLicenseNo,// 公司执照编号
          imgs: {
            path: row.businessLicense.path
          },// 公司执照图片
          address: row.officeAddress[0],// 店铺地址
          tel: row.officeTel[0],// 店铺电话
          fax: '',// 店铺传真
          about: row.about,// 店铺简介
          regTime: row.regTime,// 公司成立时间
        }
        if(row.faxes){
          this.FormData.fax = row.faxes[0]
        }
      }
    },
    close(val) {
      this.getList()
      this.addFormVisible = val
    },
    // 删除
    handleDel(index, row) {
      let para = { storeId: row.storeId }
      deleteStore(para).then((res) => {
        this.listLoding = false;
        this.getList()
      })
    },
    // 查询
    onSubmit(data) {
      if (data == 'search') {
        this.pageNum  = 1
        this.currentPage1 = 1
      }
      this.getList()
    },
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum  = val
      this.getList()
    },
  }
}
</script>

<style>
.storeform .el-form-item {
  margin-bottom: 22px;
  float: left;
}

.storeform .el-form-item__content {
  line-height: 36px;
  position: relative;
  font-size: 14px;
  margin-left: 570px;
}

.storeform .el-form-item:last-child {
  float: right;
  margin-right: 20px;
}
</style>
