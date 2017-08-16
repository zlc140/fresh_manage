<template>
    <div class="content">
        <ul class="imgList">
            <li v-for="item in srcs" :key="item.index">
                <img :src="item">
                <span class="doing">
                    <i class="el-icon-view" @click="showBig(item)"></i>
                    <i class="el-icon-delete " @click="delImg(item)"></i>
                </span>
            </li>
        <vue-core-image-upload :class="['el-button','pure-button-primary','js-btn-crop']" :crop="crops" text="上传图片" :url="url" :cropRatio="cropRatio" :inputOfFile="filename" extensions="png,gif,jpeg,jpg" @imageuploaded="imageuploaded" @errorhandle="handleError">
         </vue-core-image-upload>
         </ul>
         <el-dialog v-model="bigImgShow" size="large" :close-on-click-modal="true">
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
            srcs: [],
            crops: null,
            bigImg:'',
            bigImgShow:false,
            styles:{
                width:'0px',
                Height:'0px'
            }
        }
    },
    components: {
        VueCoreImageUpload
    },
    props: {
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
            default: '/upload'

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
        
        if (this.sizeBox != null) {
                this.styles.width = this.sizeBox[0]+'px'
                this.styles.Height = this.sizeBox[0]+'px'
        }

        if (this.cropShow == true) {
            this.crops = 'local'
        } else {
            this.crops = false
        }
        
    },
    methods: {
        imageuploaded(res) {
           
            if(this.multiple == true){
                this.srcs.push(res[0])
            }else{
                this.srcs= []
                this.srcs.push(res[0])
            }
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

<style lang="scss" scoped>
 .imgBox{
        text-align: center;
        img{
            border: 1px solid #f0f0f0;
        }
    }

.imgList {
    display: inline-block;
    overflow: hidden;
    position: relative;
    li {
        float: left;
        width: 100px;
        height: 100px;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
        img {
            width: 100%;
            height:100%;
        }
        .doing{
            position: absolute;
            display: inline-block;
            left: 0;
            width:100%;
            height: 100%;
            top: 0;
            color: #8492A6;
            display: none;
            text-align: center;
            line-height: 100px;
            background-color: rgba(0,0,0,0.3);
            i{
                cursor: pointer;
                margin-right: 3px;
                font-size: 18px;
                &:hover{
                    font-size: 20px;
                }
            }
        }
        &:hover .doing{
            display: block;
        }
    }
   
}
.g-core-image-upload-btn{
    width:100px;
    height: 100px;
    line-height: 80px;
}
.imgList.mul .g-core-image-upload-btn{
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.2
}

</style>
