<template>
 <div>
  <div id="main"></div>
 </div>
</template>


<script>
import * as echarts from "echarts"
import{mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            list:'classify/list'
        })
    },
   components:{
   },
   data() {
   return {

}
   },
   methods:{
       ...mapActions({
           requestCateList:'classify/requestCateList'
       })
   },
 
    mounted(){
        this.requestCateList()
    },
     watch:{
    list:{
        handler(){
           var myChart = echarts.init(document.getElementById('main'));


        var option = {
            title: {
                text: '产品分类'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: this.list.map(item=>item.children?item.children.length:0)
            }]
        };

 
        myChart.setOption(option); 
        },
        deep:true
    },
     }
}
</script>

<style>
   #main {
       margin-top: 60px;
      width: 1600px;
      height: 600px;
      border: 1px solid #ccc;
      text-align: center;
   }
</style>