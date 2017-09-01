<template>
    <el-col :span="24" class="content">
        <!--查询工具条-->
        <el-col  v-if="!addFormVisible" :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
                <el-form-item class="add">
                    <el-button type="primary" @click="handle('add')">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table  v-if="!addFormVisible" :data="lists" highlight-current-row border  v-loading="listLoading" style="width: 100%;">
            <el-table-column type="expand" prop="body" label="图片展示" width="80" sortable>
                <template scope="scope">
                    <floor-body :lists="scope.row.body" :title="scope.row.title" :titleImage="scope.row.titleImage" :type="scope.row.type"></floor-body>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="70" sortable>
            </el-table-column>
            <el-table-column prop="type" label="楼层类型" width="150" sortable>
                <template scope="scope">
                    <span>{{scope.row.type | floorType}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="楼层标题" min-width="200" sortable>
            </el-table-column>
            <el-table-column prop="onlyShow" label="是否一直显示" width="120">
                <template scope="scope">
                    <el-switch v-model="scope.row.onlyShow" on-text="是" @change="handleShow(scope.row)" off-text="否" size="mini"></el-switch>
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
                    <el-button type="danger" size="small" @click="handleDel( scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-floor :title="title" v-if="addFormVisible" :FormData="FormData" :type="type" @close="close"></add-floor>
    </el-col>
</template>

<script>
import floorBody from './children/floorbody'
import addFloor from './children/floorForm'
import { floorList, delFloor,editFloor } from '@/service/getData'
export default {
    data() {
        return {
            lists: [],
            type: 'add',
            title: '新增首页楼层',
            addFormVisible: false,
            listLoading: false,
            FormData: {
                title: '',
                style:'',
                type:'',
                body:{

                },
                titleImage:{
                    path:'',
                    url:''
                },
                onlyShow: true,
                startTime:'',
                endTime:'',
                sort:2
            }
        }
    },
    components: {
        addFloor,floorBody
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            let _this = this
            this.listLoading = true
            floorList().then(res => {
                if (res.data.state == 200) {
                    _this.lists = res.data.content.content
                }
                this.listLoading = false
            })

        },
        handle(val) {
            this.addFormVisible = true
            if(val == 'add') {
                this.type = 'add'
                this.FormData = {
                    title: '',
                    style:'',
                    type:'',
                    body:[],
                    titleImage:{
                        path:'',
                        url:''
                    },
                    onlyShow: true,
                    startTime:'',
                    endTime:'',
                    sort:this.lists.length+1
            }
            }else {
                this.type = 'edit'
                this.FormData = Object.assign({},val)
            }
            
        },
        handleDel(row) {
            let _this = this
            let prop = {
                id: row.floorId
            }
            this.$confirm('您确认删除该楼层吗？').then(() => {
                delFloor(prop).then(res => {
                    if (res.data.state == 200) {
                        _this.getList()
                    }
                })
            }).catch(() => {

            })
        },
        close(val) {
            this.getList()
            this.addFormVisible = val
        },
        handleShow(row){
            row.onlyShow = !row.onlyShow
            let para = {
                id:row.floorId,
                onlyShow:row.onlyShow
            }
            console.log(para)
            editFloor(para).then((res) => {
                console.log(res)
            })
        }

    }
}
</script>

<style lang="scss">
 .floor_box{
       width:700px;
       padding: 20px;
       border: 1px solid #f0f0f0;
       ul{
           width:100%;
           li{
               position: relative;
               padding:4px 0;
               display: inline-block;
               width:195px;
               img{
                   width:100%;
               }
               &:nth-child(2n){
                   margin-left: 7px;
               }
               .close{
                   display: none;
                   position: absolute;
                   width: 20px;
                   height:20px;
                   border-radius: 50%;
                   line-height: 20px;
                   right: -5px;
                   top: -5px;
                   background-color: rgba(0,0,0,0.5);
                   color:white;
                   text-align:center;
                   font-size:10px;
                   cursor: pointer;
                   z-index:2;
                   
               }
               &:hover .close{
                   display: block;
               }
           }
       }
       .big{
           li{
               width:600px;
           }
       }
   }
.floor_box .proList{
  width:650px;
  li{
    width:295px;
    height:140px;
    &>img{
      width:100%;
      height:100%;
    }
    .el-button{
        position: absolute;
        z-index: 998;
    }
    dl{
      display: none;
      position:absolute;
      left:5%;
      top:10%;
      background-color: white;
      width: 90%;
      height:80%;
      dd{
        display: inline-block;
        width:30%;
        padding: 3px;
        min-height:50px;
         margin-left: 3%;
         box-sizing: border-box;
        img{
            width:100%;
            height:auto;
        }
        p{
            color:#333;
            width:100%;
            overflow: hidden;
            white-space: nowrap;

        }
      }
     
      color:white
    }
    &:hover dl{
        display: block;
    }
  }
}
.proListBox{
   .el-dialog{
     width:1200px;
   }
}
</style>