<template>
  <el-col :span="24"> 
    <!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
				<el-form-item>
					<el-button type="primary" @click="handle('add')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <el-table :data="lists" highlight-current-row border stripe v-loading="listLoading"  style="width: 100%;">
             <el-table-column type="expand" prop="body" label="图片展示" width="80"  sortable>
               <template scope="scope">
                    {{scope.row.body}}
               </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="50"  sortable>
            </el-table-column>
             <el-table-column prop="type" label="楼层类型" width="150"  sortable>
            </el-table-column>
          
             <el-table-column prop="title" label="楼层标题" min-width="200"  sortable>
            </el-table-column>
             <el-table-column prop="onlyShow" label="是否一直显示" width="120" >
              <template scope= "scope">
                 <el-switch v-model="scope.row.onlyShow" on-text="是" off-text="否" size="mini"></el-switch>  
              </template>
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
    <add-floor
        :title="title"
         v-if="addFormVisible"
        :FormData="FormData"
        :type="type"
        @close="close"
        ></add-floor>
</el-col>
</template>

<script>
import addFloor from './children/floorForm'
import { floorList } from '@/service/getData'
export default {
    data(){
      return{
        lists:[],
        type:'add',
        title:'新增',
        addFormVisible:false,
        listLoading:false,
        FormData:{
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
    components:{
        addFloor
    },
    mounted(){
        this.getList()
    },
    methods:{
        getList(){
            let _this = this
            floorList().then(res => {
                if(res.data.state == 200) {
                    _this.lists = res.data.content
                    console.log(_this.lists)
                }
            })
        },
        handle(val){
            this.addFormVisible = true
            console.log(val)
        },
        handleDel(){
            console.log('delete')
        },
        close(val){
            this.addFormVisible = val
        }

    }
}
</script>

<style>
    
</style>