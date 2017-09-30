<template>
<el-dialog title="子楼层关联商品" class="proListBox" v-model="visibleList" :before-close="ok" :close-on-click-modal="false">
    <div class="prolist ">
        <!-- form表单 -->
        <el-form ref="form"  :inline="true" class="search" label-position="right"  :model="form" label-width="80px">
                <el-form-item label="商品货号">
                    <el-input v-model="form.goodsId"></el-input>
                </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="form.classId">
                            <el-option v-for="(item,index) in  gcData" :key="index" :label="item.classTitle" :value="item.classId"> </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="form.goodstitle"></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('search')">查询</el-button>
                </el-form-item>
        </el-form>
        <!-- 父级 -->
        <el-table :data="getData" border style="width: 98%" >
            <!-- <el-table-column label="商品货号" prop="goodsId" width="180px"> </el-table-column> -->
            <el-table-column label="商品名称" prop="goodsTitle" min-width="150px"> </el-table-column>
            <el-table-column label="所属分类" prop="classTitle" width="140px">
                <template scope="scope">
                    <span>{{ scope.row.goodsClass.classTitle }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品单价" prop="goodsId" width="120px;">
                <template scope="scope">
                    <span class="price">{{ scope.row.price.GOODS_MARKET_PRICE | currency }}</span>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="库存数量" prop="stockNum">
                <template scope="scope">
                <span> {{ scope.row.goodsStock.stockNum}}  </span>
                </template>
            </el-table-column>
             
            <el-table-column label="商品状态" prop="repositoryNum" width="120px">
                <template scope="scope">
                    <span>{{ scope.row.goodsShow | goods}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="创建时间" prop="createTime" width="150px">
                <template scope="scope">
                    <span class="createTime">{{ scope.row.createTime | formatDate }}</span>
                </template>
            </el-table-column> -->
              <el-table-column label="操作"  width="100px">
                <template scope="scope">
                   <el-button type="text" @click="addPro(scope.row)">添加</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="toolbar">
            <p class='tip fl'>提示：每个自楼层应关联三个商品或者不关联商品</p>
            <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
        </el-col>
        <el-col class="floor_box pro_list"  v-if="selPro.length>0">
            <ul>
                <li v-for="(item,index) in selPro" :key ="index">
                    <span class="close" @click="del(item,index)"><i class="el-icon-close"></i></span>
                    <img :src="item.goodsPic[0].path"/>
                    {{item.goodsTitle}}
                </li>
                <br/> <el-button @click="ok">确认关联商品</el-button>
            </ul>
            
        </el-col>
    </div>
</el-dialog>
</template>

<script>
import { prolist, classlist } from '@/service/getData'
export default {
    props:{
        aboutGoods:{
            type:Array,
            default:[]
        },
        visible:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            visibleList:false,
            checked: true,
            form: {
                state: '', //商品状态
                goodsId: '',//货号
                goodstitle: '',//商品名称
                classId: '',//分类id
                 
            },
            selPro:[],
            // 分页
            currentPage1: 1,
            pageSize: 5,
            pageNum: 1,
            totalElements: 0,
            lists: [],
            sels: [],//列表选中列
            // 商品状态
            options: [
                {
                    value: true,
                    label: '已上架'
                }, {
                    value: false,
                    label: '已下架'
                }
            ],
            // 表格数据
            getData: [],
            // 一级数据
            gcData: [],
           
        }
    },
    mounted() {
        this.selPro = this.aboutGoods
        this.visibleList = this.visible
        this.getList()
        // 分类数据
        let _this = this
        classlist().then((res) => {
            if (res.data.state == 200) {
                let datas = res.data.content
                _this.gcData = []
                datas.forEach((child) => {
                    _this.gcData.push({
                        classId: child.classId,
                        classTitle: child.classTitle
                    })
                    if (child.childClass && child.childClass.length > 0) {
                        child.childClass.forEach((item) => [
                            _this.gcData.push({
                                classId: item.classId,
                                classTitle: '　　' + item.classTitle
                            })
                        ])
                    }
                })
            }
        })
    },
    methods: {

        getList() {
            let para = {
                pageNum: this.pageNum - 1,
                pageSize: this.pageSize,
                goodsId: this.form.goodsId,
                goodstitle: this.form.goodstitle,
                classId: this.form.classId,
                reqFrom:'front'
            }
            let _this = this
            // 表格数据
            prolist(para).then((res) => {
                if (res.data.state == 200) {
                    _this.getData = res.data.content.content;
                    // if(_this.getData.length>0){
                    //     _this.getData.forEach(v => {
                    //         if(_this.selPro.length>0){
                    //             v.sel = true
                    //             _this.selPro.forEach(m => {
                    //                 if(m.goodsId == v.goodsId){
                    //                     v.sel = true
                    //                     return false
                    //                 }
                    //             })
                    //         }
                    //     })
                    // }
                    console.log(_this.getData)
                    this.totalElements = res.data.content.totalElements;
                }
            })
        },
        
        // 查询
        onSubmit(data) {
            if (data == 'search') {
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
       
        addPro(row){
           
            if(this.selPro.length == 3){
                this.$message('子楼层关联只能三个商品或者不关联')
                return false
            }
            let has = false
            this.selPro.forEach(v => {
                if(v.goodsId == row.goodsId){
                    has = true
                }
            })
            if(has == false){
                this.selPro.push(row)
            }
        },
        del(val,index){
            this.selPro.splice(index,1)
        },
        ok(){
            if(this.selPro.length == 0){
                this.visibleList = false
                this.$emit('getGoods',this.selPro)
            }else if(this.selPro.length!=3){
                this.$message('此处关联商品最多切只能为三个')
                return false
            }else{
                this.visibleList = false
                this.$emit('getGoods',this.selPro)
            }
            
        }
        
    }
}
</script>
<style lang="scss">
.dialog  .search{
    padding:10px 0;
    .el-input{
        width:200px;
        
    }
}
.pro_list{
    margin: 5px 0 10px;
    li{
        position: relative;
        display: inline-block;
        margin: 3px;
        width:70px;
        height:120px;
        background-color: rgba(0,0,0,0.3);
    }
    
    .el-button{
        
    }

}
</style>

 
