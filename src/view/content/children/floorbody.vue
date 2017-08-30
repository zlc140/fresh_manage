<template>
<div class="floorBody">
    <div class="title">
        <img :src="titleImage.path" v-if="titleImage != null"/>
        <h2 v-else>{{title}}</h2>
    </div>
    <div class="floor_box">
        <ul v-if="this.type=='FLOOR_GOODS'" class="proList">
            <li v-for="(item,index) in lists" :key="index">
                <img :src="item.image.path" />
                 <dl v-if="item.goods.length>0">
                    <dd v-for="(child,index) in item.goods" :key="index">
                       <p> {{child.goodsTitle}}</p>
                    </dd>
                </dl>
            </li>
        </ul>
        <ul v-if="this.type=='FLOOR_IMAGES'" class="imgesList">
            <li v-for="(item ,index) in this.lists[0].images" :key="index">
                <img :src = "item.path"/>
            </li>
        </ul>
         </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            listLoading:false
        }
    },
    props:{
        titleImage:{
            type:Object,
            default:null
        },
        title:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:''
        },
        lists:{
            type:Array,
            default:[]
        }
    },
    mounted(){

        console.log(this.type,this.lists)
    }
}
</script>

<style lang="scss">
.floorBody{
    .title{
        width:600px;
        height:40px;
        overflow: hidden;
        text-align: center;
        img{
            margin: 0 auto;
        }
        h2{
            font-size: 18px;
            color:#888;
            text-align: left;
        }
    }
}
.about_pro{
    li{
        border-right: 1px solid #f0f0f0;
        display: inline-block;
        width:60px;height: 80px;
        line-height: 20px;
        img{
            width:60px;
            height: 60px;
            margin: 5px 0;
        }
    }
}
</style>
