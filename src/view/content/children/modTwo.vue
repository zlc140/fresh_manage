<template>
  <div>
    <el-col :span="4">
      <vue-core-image-upload  
              @getImg = "bodyImg"  
              title="添加子楼层展示图"
              :showPic = 'titlePic.showPic'
              :cropRatio = "titlePic.radio" 
              :picList=" titlePic.picList"
              :sizeBox = 'titlePic.size' 
              :multiple="titlePic.multiple"
              :cropShow="titlePic.cropShow">
      </vue-core-image-upload>
      </el-col>
      <el-col :span="22" class="tip">提示：用于楼层广告的图片，推荐广告展示图片590px*280px，请注意比例和大小</el-col> 
      <el-col :span="20" class="mod_one floor_box" >
              <ul class="proList">
                <li v-for="(item,index) in advList" :key="index">
                      <el-button size="mini" @click="addPro(item)">关联商品</el-button>
                      <span class="close" @click="delAdv(item,index)"><i class="el-icon-close"></i></span>
                      <img :src="item.image.path"/>
                      <el-input v-model="item.image.url"  placeholder="提示：http://hafu365.com"></el-input>
                      <el-input v-model="item.image.title" placeholder="图片标题"></el-input>
                      <dl v-if="item.goods.length>0">
                        <dd v-for="(child,index) in item.goods" :key="index">
                          <img :src="child.goodsPic[0].path"/>
                          <p> {{child.goodsTitle}}</p>
                        </dd>
                      </dl>
                </li>
              </ul>
      </el-col>
     
      <pro-list :aboutGoods="aboutGoods" v-if="visibleList" :visible="visibleList" @getGoods="getGoods"></pro-list>
        
  </div>
</template>

<script>
import proList from './proList'
import vueCoreImageUpload from '@/components/uploadImg'
export default {
  data(){
    return {
      visibleList:false,
       titlePic:{
          showPic:false,
          radio:'1200:350',
          cropShow:false,
          multiple:false,
          picList:[]
      },
      advList:[],
      aboutGoods:[],
    }
  },
  components:{
      vueCoreImageUpload,proList
  },
  props:{
    twoData:{
      type:Array,
      default:null
    }
  },
  mounted(){
    if(this.twoData != null){
      this.advList = this.twoData
    }
  },
  methods:{
    bodyImg(val){
        this.advList.push({
          image:{
            path:val[0],
            url:'',
            title:''
          },
          goods:[]
        })
        this.getDatas()
    },
     delAdv(val,index){
        let _this = this
        _this.advList.splice(index,1)
        this.getDatas()
      },
      addPro(row){
        this.aboutGoods = []
        this.aboutGoods = row.goods
        this.visibleList = true
      },
      getGoods(lists){
        this.visibleList = false
        this.getDatas()
      },
      getDatas(){
        this.$emit('getTwo',this.advList)
      }
     
  }
}
</script>
 
