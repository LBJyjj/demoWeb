<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="changeEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="---请选择---" @change="changeCate">
            <el-option label="一级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="---请选择---">
            <el-option label="二级分类" :value="0"></el-option>
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <div class="upload">
            +
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isShow"
              type="file"
              class="file"
              @change="getFile"
            />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="---请选择---" @change="changeSpecs">
            <el-option label="规格分类" :value="0"></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="---请选择---" multiple>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in secondSpecs"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="width">
            <div id="div1" v-if='info.isShow'></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from 'wangeditor'
import { reqGoodsAdd, reqGoodsInfo, reqGoodsEdit,reqCateList } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "classify/list",
      total:'specs/total',
      specslist:"specs/list"
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      width: "160px",
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description:'',
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        
      },
      secondCate: [],
      secondSpecs:[],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "classify/requestCateList",
      requestSpecsTotal:"specs/requestSpecsTotal",
      requestGoodsList:"goods/requestGoodsList"

    }),
    changeEditor(){
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);

      let imgExtArr = [".jpg", ".png", "jpeg", ".gif"];
      let extName = file.name.slice(file.name.lastIndexOf("."));
      if (!imgExtArr.some((item) => item == extName)) {
        alert("文件格式不正确");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    hide() {
      this.info.isShow = false;
    },
    add() {
      this.form.description = this.editor.txt.html()
      reqGoodsAdd(this.form).then((res) => {
        alert("添加成功");
        this.hide();
        this.requestCateList();
      });
    },
    look(id) {
      reqGoodsInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.imgUrl = this.$imgUrl + this.form.img;
        this.form.id = id;
        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    updata() {
      this.form.description = this.editor.txt.html()
      console.log(this.form);
      reqGoodsEdit(this.form).then(res=>{
       this.hide();
       this.requestGoodsList()
     })
    },
    empty() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description:'',
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = null;
    },
    changeCate(){
        this.secondCate = this.list.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    changeSpecs(){
      this.form.specsattr = [];
      this.secondSpecs = this.specslist.find((item) => {
        return item.id == this.form.specsid;
      }).attrs;
  

    }
  },
  mounted() {
    this.requestCateList();
    this.requestSpecsTotal();
    
  },
};
</script>
<style scoped>
.upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  position: relative;
}
.upload .file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>