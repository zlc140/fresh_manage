<template>
  <div>
      <p class="tip">该楼层包含三个小楼层和一个大楼层</p>
     <el-col :span="4">
      <vue-core-image-upload  
              @getImg = "bodyImg"  
              title="添加楼层小广告"
              :showPic = 'titlePic.showPic'
              :cropRatio = "titlePic.radio" 
              :picList=" titlePic.picList"
              :sizeBox = 'titlePic.size' 
              :multiple="titlePic.multiple"
              :cropShow="titlePic.cropShow">
      </vue-core-image-upload>
      </el-col>
        <el-col :span="4">
        <vue-core-image-upload  
              @getImg = "bodyBig"  
              title="添加楼层大广告"
              :showPic = 'titlePic.showPic'
              :cropRatio = "titlePic.radio" 
              :picList=" titlePic.picList"
              :sizeBox = 'titlePic.size' 
              :multiple="titlePic.multiple"
              :cropShow="titlePic.cropShow">
      </vue-core-image-upload>
        </el-col>
      <el-col :span="20" class="tip">提示：用于楼层广告的图片，推荐小广告390*200，大广告1200*200，请注意比例和大小</el-col> 
      <el-col :span="20" class="mod_one floor_box" >
              <ul v-if="bodyImgs.length>0" class="">
                  <li v-for="(item,index) in bodyImgs" :key="index">
                        <span class="close" @click="delAdv(item)"><i class="el-icon-close"></i></span>
                      <img :src="item.path"/>
                      <el-input v-model="item.url" placeholder="链接 提示：http://hafu365.com"></el-input>
                      <el-input v-model="item.title" placeholder="图片标题"></el-input>
                  </li>
              </ul>
                <ul v-if="bodyBigImg.path != ''" class="big">
                  <li >
                      <span class="close"  @click="delAdv('big')"><i class="el-icon-close" ></i></span>
                      <img :src="bodyBigImg.path"/>
                      <el-input v-model="bodyBigImg.url" placeholder="链接 提示：http://hafu365.com"></el-input>
                      <el-input v-model="bodyBigImg.title" placeholder="图片标题"></el-input>
                  </li>
              </ul>
      </el-col>
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
export default {
data(){
  return {
      bodyImgs:[],
      bodyBigImg:{
          path:'',
          url:'',
          title:''
      },
      titlePic:{
          showPic:false,
          radio:'1200:350',
          cropShow:false,
          multiple:false,
          picList:[]
      },
      allPart:[]
  }
},
props:{
  Onelist:{
    type:Array,
    default:[]
  }
},
components:{
  vueCoreImageUpload
},
mounted(){
  let _this = this
    if(this.Onelist.length>0){
      this.Onelist.forEach((v,index) => {
        if(index<3){
            _this.bodyImgs.push(v)
        }else {
          _this.bodyBigImg = v
        }
      })
    }
    this.checkBodyOne()
},
methods:{
      bodyImg(val){
          if(this.bodyImgs.length>2){
              this.$message('只能有三个广告')
              return false
          }
          this.bodyImgs.push({
              path:val[0],
              url:'',
              title:''
          })
           this.checkBodyOne()
      },
      bodyBig(val){
          this.bodyBigImg.path = val[0]
          this.checkBodyOne()
      },
      delAdv(val){
        //   大广告删除
          if(val == 'big'){
               this.bodyBigImg={
                   path:'',
                   url:'',
                   title:''
               }
               return false
          }
        //   小广告删除
        let _this = this
        this.bodyImgs.forEach((v , index) => {
            if(v.path == val.path){
                _this.bodyImgs.splice(index,1)
                console.log(_this.bodyImgs)
            }
        })
       this.checkBodyOne()
      },
       checkBodyOne(){
            this.allPart = []
            if(this.bodyImgs.length>0){
                this.bodyImgs.forEach(v=> {
                    this.allPart.push(v)
                })
            }
            if(this.bodyBigImg.path != ''){
                this.allPart.push(this.bodyBigImg)
            }
            this.$emit('getOne',this.allPart)
      }
}

}
</script>

<style>

</style>
