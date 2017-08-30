<template>
  <el-col :span="24"> 
    <!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!--<el-form-item>
					<el-input v-model="filters.name" placeholder="用户名"></el-input>
				</el-form-item>-->
				<el-form-item>
					<!--<el-button type="primary" v-on:click="getUsers('page')">查询</el-button>-->
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handle('add')">新增</el-button>
				</el-form-item>

			</el-form>
		</el-col>
        <el-table :data="lists" highlight-current-row border stripe v-loading="listLoading"  @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="sort" label="排序" min-width="70"  sortable>
            </el-table-column>
           <el-table-column prop="onlyShow" label="是否一直显示" width="150" >
              <template scope= "scope">
                {{scope.row.onlyShow?'是':'否'}}
              </template>
            </el-table-column>
             <el-table-column type="expand" prop="advImage" label="图片展示" width="100"  sortable>
               <template scope="scope">
                   <img :src="scope.row.advImage.path" />
               </template>
            </el-table-column>
             <el-table-column prop="advTitle" label="图片标题" min-width="200"  sortable>
            </el-table-column>
            
            <el-table-column prop="advImage.url" label="链接地址" width="240" >
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="140" sortable>
                 <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.startTime | formatDate }}</span>
               </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="140" sortable>
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.endTime | formatDate }}</span>
                </template>
            </el-table-column>
           
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small" @click="handle( scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       
         <!--弹出界面 新增or编辑-->
            <dialog-tem
                :title="title"
                v-if="addFormVisible"
                :FormData="FormData"
                :type="type"
                @close="close"
            ></dialog-tem>
	 
    
</el-col>
</template>

<script>
import dialogTem from './children/dialog'
import { brandList,removeBrand,addBrand,editBrand } from '@/service/getData'
// import VueCoreImageUpload  from 'vue-core-image-upload'
export default {
  data() {
     
    return {
        lists:[],
        filters:{

        },
        title:'新banner广告',
        type:'add',
        length:1,
        listLoading : false,
        addFormVisible: false,//新增界面是否显示
        FormData : {
            title: '',
            image: {
                path:'',
                url:'',
                title:''
            },
            onlyShow: true,
            startTime:'',
            endTime:'',
            sort:length
        }
    }
  },
  mounted(){
      this.getLists()
  },
  components:{ dialogTem  },
  methods:{
       
        getLists() {
           this.listLoading=true
            brandList().then((res) => {
                console.log(res)
               this.listLoading=false
               if(res.data.state == 200){
                    this.lists=[]
                    this.lists =res.data.content.content
                    this.total = res.data.content.totalElements
                    
               }else if(res.data == ''){
                   this.$message('登录超时，请重新登录')
                   this.$router.push({
                        path:'/login',
                        query:{redirect:this.$route.path}
                    })
               }
        }).catch(() => {
            
                this.listLoading=false
        })
       },
       async handleCurrentChange(val) {
            this.page = val
            this.getLists()
        },
        
        selsChange(sels) {
            this.sels = sels;
            console.log(sels)
        },
        handleDel (index,row) {
        
                this.$confirm('确认删除该记录吗？','提示',{
                    type:'warning'
                }).then(() => {
                    this.listLoding = true;
                    let para = {id : row.advId}
                     
                    removeBrand(para).then((res) => {
                        this.listLoding = false;
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                        this.getLists();
                    })
                })
             
        },
    //   弹框
        handle: function (row) {
            let length = this.lists.length+1
            this.addFormVisible = true;
                if(row == 'add'){
                    this.type = 'add'
                    this.title = '新增banner广告'
                    this.FormData = {
                        title: '',
                        image: {
                            path:'',
                            url:'',
                            title:''
                        },
                        onlyShow: true,
                        startTime:'',
                        endTime:'',
                        sort:length
                    };
                }else{
                    this.type = 'edit'
                    this.title = '编辑banner广告',
                    this.FormData = {
                        id:row.advId,
                        title: row.advTitle,
                        image: {
                            path:row.advImage.path,
                            url:row.advImage.url,
                        },
                        onlyShow: row.onlyShow,
                        startTime:row.startTime,
                        endTime:row.endTime,
                        sort:row.sort
                    };
                    this.FormData.startTime = new Date(this.FormData.startTime)
                    this.FormData.endTime = new Date(this.FormData.endTime)
                }
               
				
				
		},
         close(val){
                this.getLists()
                this.addFormVisible = val
        },
      
  }
}
</script>

<style lang="scss">

.addPicBox .el-upload--picture-card{
    width:240px;
    height: 70px;
    line-height: 75px;
    overflow: hidden;
}
.addPicBox .el-upload--picture-card img{
    width:240px;
    height:70px;
}

</style>
