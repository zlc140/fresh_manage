<template>
    <div class="content">
        <vue-core-image-upload 
                :class="['el-button','pure-button-primary','js-btn-crop']" 
                :crop="crops" 
                :text="title" 
                :url="url" 
                :cropBtn='cropBtn'
                :cropRatio="cropRatio" 
                :inputOfFile="filename" 
                extensions="png,gif,jpeg,jpg" 
                @imageuploaded="imageuploaded" 
                @errorhandle="handleError">
         </vue-core-image-upload>
        <ul class="imgList " v-if="showPic">
            <li v-for="item in srcs" :key="item.index">
                <img :src="item">
                <span class="doing">
                    <i class="el-icon-view" @click="showBig(item)"></i>
                    <i class="el-icon-delete " @click="delImg(item)"></i>
                </span>
            </li>
         </ul>
         <el-dialog class="imglog" v-model="bigImgShow"   :close-on-click-modal="true">
             <div class="content imgBox">
                 <img :src="bigImg" ref="getImg" :style="styles"/>
            </div>
         </el-dialog>
    </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
    data() {
        return {
            cropBtn:{
                ok:'确认',
                cancel:'取消'
            },
            srcs: [],
            crops: null,
            bigImg:'',
            bigImgShow:false,
            styles:{
                width:'auto',
                height:'auto',
                minWidth:'200px'
            }
        }
    },
    components: {
        VueCoreImageUpload
    },
    props: {
        title:{
            type:String,
            default:'添加图片'
        },
        showPic:{
            type:Boolean,
            default:true
        },
        picList:{
            type:Array,
            default:null
        },
        multiple:{
            type: Boolean,
            default: false
        },
        cropShow: {
            type: Boolean,
            default: true
        },
        sizeBox: {
            type: Array,
            default: null
        },
        url: {
            type: String,
            default: '/image-base/upload'

        },
        filename: {
            type: String,
            default: 'file'
        },
        cropRatio: {
            type: String,
            default: '1:1'
        }
    },
    mounted() {
        let _this = this
        this.srcs = []
        if(this.picList.length>0){
            this.picList.forEach(function(ele) {
                if( ele  ){
                    _this.srcs.push(ele)
                }
            });
        }
        console.log(this.picList)
        // console.log(this.srcs)
        if (this.sizeBox != null) {
                this.styles.width = this.sizeBox[0]+'px'
                // this.styles.Height = this.sizeBox[0]+'px'
                
        }
        if (this.cropShow == true) {
            this.crops = 'local'
        } else {
            this.crops = false
        }
        
    },
    methods: {
        imageuploaded(res) {
           console.log(res)
            if(this.multiple == true){
                this.srcs.push(res.content.url)
            }else{
                this.srcs= []
                this.srcs.push(res.content.url)
            }
            console.log(this.srcs)
            this.$emit('getImg', this.srcs)
        },
        handleError() {
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        },
        delImg(val) {
            let index = this.srcs.indexOf(val)
            this.srcs.splice(index, 1)
            this.$emit('getImg', this.srcs)
        },
        showBig(val) {
            this.bigImgShow = true
            this.bigImg = val
            
        }
    }
}
</script>

<style lang="scss">
 .imgBox{
        text-align: center;
        img{
            border: 1px solid #f0f0f0;
        }
    }


.el-dialog--small{
     width:auto!important;
 }
.imgList.mul .g-core-image-upload-btn{
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.2
}

</style>
