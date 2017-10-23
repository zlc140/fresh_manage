<template>
 	<div class="bill">
     <div class="search_pro toolbar">
      <el-form ref="form"  :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
             
           <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="账单状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="开始时间" >
                  <el-date-picker
                            v-model="form.satrtTime"
                            type="datetime"
                            placeholder="选择开始日期"
                             >
                        </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker
                      v-model="form.endTime"
                      type="datetime"
                      placeholder="选择开始日期"
                       >
                  </el-date-picker>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
 		 
			<el-table border  :data="lists" style="width: 100%"  v-loading="listLoading">
				<!-- 父级 -->
				<el-table-column label="描述"　type="expand" prop="description" width="40"> 
						<template scope="scope">
						<el-table :data="scope.row.billsInfos"  style="width: 100%;">
                     <el-table-column align="center" prop="" label="订单号" width="180">
                        <template scope="scope">
                            {{scope.row.orderId?scope.row.orderId:''}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建日期" width="180">
                        <template scope="scope">
                            {{scope.row.createTime | formatDate}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="description" label="描述" >
                    </el-table-column>
                    <el-table-column align="left" prop="money" label="金额" width="120">
                        <template scope="scope">
                            <span :class="scope.row.type == 300?'greens':'reds'">{{ scope.row.type==300?'+':'-' }} {{ scope.row.money | currency}}</span>
                        </template>
                    </el-table-column>
                   <el-table-column align="center"   label="操作"  width="120" >
											<template scope="scope">
												<div class="play_box">
													<a  @click="aboutClick(scope.row.orderId)">订单详情</a>
												</div>
											</template>
										</el-table-column>
                </el-table>
								<p class="tip">交易记录</p>
							 <div style="line-height:30px;" v-html="scope.row.description!=null?scope.row.description:'无记录'"></div>
						</template>
				</el-table-column>
				<el-table-column label="账单号" prop="id" width="180">  </el-table-column>
        <el-table-column label="用户名" prop="username" width="150">  </el-table-column>
				<el-table-column label="期号" prop="issue" width="100">  </el-table-column>
				<el-table-column label="出账时间"  prop="generatedBillsTime" width="180px">
				<template scope="scope">   
						<span>{{ scope.row.generatedBillsTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="金额" prop="money" min-width="110px">
				<template scope="scope"> 
					 <span  v-if="scope.row.money == 0">-</span>   
						<span v-else class="price">{{ scope.row.money | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="已付金额" prop="paymentMoney" min-width="110px">
				<template scope="scope">   
					  <span  v-if="scope.row.paymentMoney == 0">-</span>
					  <span v-else class="price">{{ scope.row.paymentMoney | currency }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="state" width="100">
					<template scope="scope">   
						<span>{{ scope.row.state | filterBill}}</span>
					</template>
				</el-table-column>
				<el-table-column label="支付时间" align="center" prop="paymentTime" width="160px">
				<template scope="scope">  
					<span  v-if="scope.row.paymentMoney == 0">-</span> 
						<span v-else class="price">{{ scope.row.paymentTime | formatDate }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center"   label="操作"  width="120" >
					<template scope="scope">
						<div class="play_box">
							<a class="reds" @click="handleDialog(scope.row)" v-if="scope.row.state==100">手动收账</a>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
				</el-pagination>        
        </el-col>
        <el-dialog  v-model="isShowDialog">
            <bill-detail :datas="orderDetail"  v-if="isShowDialog" ></bill-detail> 	
        </el-dialog>
		 		<el-dialog v-model="isShowForm">
					 <el-form :model="addForm" label-width="180px" size="small" :rules="addFormRules"  ref="addForm">
								<el-form-item label="收款金额" prop="money">
									<el-input style="width:200px" v-model="addForm.money" type="number" min="0.01" auto-complete="off" ></el-input>
								</el-form-item>
									<el-form-item label="是否完成该账单" prop="finish">
									<el-switch v-model="addForm.finish"	on-text=""　off-text="">
										</el-switch>
								</el-form-item>
							  <el-form-item label="收款描述" prop="description">
									<el-input v-model="addForm.description" auto-complete="off" type="textarea" placeholder="请对本次收款进行详细描述"></el-input>
								</el-form-item>
							
									
						</el-form>
						 <div slot="footer" class="dialog-footer">
								<el-button type="primary" @click.native="goPay" >确认收款</el-button>
						</div>
				 </el-dialog>
 	</div>
</template>

<script>
import billDetail from './child/dialog'
import {billLists,handBill} from '@/service/getData'
export default {
		data(){
			return{
        form:{
          username:'',
          state:'',
          satrtTime:'',
          endTime:''
				},
				isShowForm:false,
				addForm:{
					billsId:'',
					money:'',
					description:'',
					finish:false
				},
				addFormRules:{
						money:[
							{required:true,message:'收款金额不能为空！',trigger:'blur'}
						]
				},
        options:[
          {value:'',label:'全部'},
          {value:0,label:'未出账'},
          {value:100,label:'未付款'},
          {value:200,label:'已付款'},
          {value:300,label:'账单关闭'},
          {value:400,label:'账单完成'}
        ],
        currentPage1:1,
        pageSize:10,
        page:1,
        total:0,
				listLoading:false,
				select:'one',
				isShowDialog:false,
				lists:[],
				orderDetail:null,
				state:''
			}
		},
		components:{
			billDetail
		},
		mounted(){
			this.getBills()
		
		},
		methods:{
			getBills(){
        let _this = this
				this.listLoading = true
				let prop = {
           state:this.form.state,
           username:this.form.username,
           satrtTime:this.form.satrtTime,
           endTime:this.form.endTime,
           page:this.page-1,
           pageSize:this.pageSize
				}
			
				if(prop.satrtTime && prop.satrtTime!='' && prop.satrtTime!=0){
					prop.satrtTime = prop.satrtTime.getTime()
				}
				if(prop.endTime && prop.endTime!='' && prop.endTime!=0){
					prop.endTime =  prop.endTime.getTime()
				}
				console.log(prop)
				billLists(prop).then((res) => {
					console.log('bills',res)
					this.listLoading = false
					if(res.data.state == 200){
            _this.lists = res.data.content.content
            _this.total = res.data.content.totalElements
					}
				}).catch(() =>{
					this.listLoading = false
				})
			},
			getList(val){
				this.select = val
				if(val == 'one'){
					this.state = ''
				}else if(val == 'two'){
					this.state = 200
				}else if(val == 'three'){
					this.state = 300
				}
				this.getBills()
			},
			aboutClick(id){
				// this.bills = row.billsInfos
				this.orderDetail = id
				this.isShowDialog = true
			},
			closeDialog (attr) {
				this[attr] = false
      },
      onSubmit(){
        this.page = 1
        this.getBills()
      },
      handleCurrentChange(val){
        console.log('test',val)
        this.page = val
        this.getBills()
			},
			handleDialog(row){
				console.log(row)
					this.addForm = {
						billsId:row.id,
						money:'',
						description:'',
						finish:false
					}
					this.isShowForm = true
			},
			goPay(){
				let _this = this
				 let prop = {
					 billsId:this.addForm.billsId,
					 money:this.addForm.money,
					 description:this.addForm.description,
					 finish:this.addForm.finish
				 }
				 handBill(prop).then(res => {
					 	//  console.log(res)
					 if(res.data.state == 200){
							_this.isShowForm = false
							_this.getBills()
					 }
				
				 }).catch(() => {
					 	_this.isShowForm = false
				 })
			}
      

		}
	
}
</script>

<style>
.moreTxt{
	cursor: pointer;
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
}
  .bill{background-color:#fff;height: 100%;}
   .play_box a{
	   display: block;
   }
    .play_box a:hover{
		color:#5e9360;
	}
</style>
