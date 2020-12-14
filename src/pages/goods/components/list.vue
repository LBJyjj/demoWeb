<template>
<div>
    
 
  <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" >
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" >
      </el-table-column>
       <el-table-column prop="price" label="商品价格" >
      </el-table-column>
       <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="scope"> 
          <img :src="$imgUrl+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1"
            >是</el-button
          >
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1"
            >是</el-button
          >
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

</div>
</template>
<script>
import {reqGoodsDel} from '../../../util/request'
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
       ...mapGetters({
           list:'goods/list'
       })
    },
components:{
 },
data () {
 return {
 }
},
methods:{
    ...mapActions({
        requestGoodsList:"goods/requestGoodsList"
    }),
    edit(id){
        this.$emit('edit',id)
    },
     del(id){
      reqGoodsDel({id:id}).then((res)=>{
          alert('删除成功')
          this.requestGoodsList()
      })
    }
},
mounted(){
    this.requestGoodsList()
}
}
</script>
<style scoped>
img{
    width: 100px;
    height: 100px;
    margin-left:30px;
}

</style>