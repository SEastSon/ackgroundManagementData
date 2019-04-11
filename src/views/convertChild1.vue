<template>
  <div>
    <div
           v-if="loade"
          class="loadess"
       >
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554894070556&di=7b815f09656a84735279830755d429a8&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D700%3Bq%3D50%2Fsign%3D17507ae5ae86c91708035039f90601f2%2F58ee3d6d55fbb2fbc18cc60f464a20a44623dc0c.jpg" alt="">
        </div>
    <div class="box">
      <ul v-if="datas!=undefined">
        <li v-for="(item,index) in datasa" :key="index">
          <div>
            <img :src="item.img" alt>
          </div>
          <div>
            <p>
              商品详情:
              <a href="#">{{item.name}}</a>
            </p>
            <p>
              所需积分:
              <a href="#">{{item.Jf}}</a>
            </p>
            <p>
              数量:
              <a href="#">{{item.num}}</a>
            </p>
          </div>
        </li>
      </ul>
      <ul v-if="datasa.length==0" class="Dhjl">兑换记录为空，快去兑换中心兑换</ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyID: "",
      datas: [],
      loade:true
    };
  },
  computed:{
      datasa:function(){
        return this.datas.filter(item => {
                return item.users == this.ss.name;
          });
      }
  },
  props: {
    ss: 0
  },
  created() {
    this.keyID = this.$route.query.id;
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/Xqconent.json")
      .then(res => {
         this.loade=false;
        var arr = [];
        for (var key in res.data) {
          arr.push(res.data[key]);
        }
        this.datas = arr
      });
  }
};
</script>
<style scoped>
.box {
  width: 1200px;
  margin: 200px auto;
}
.loadess{
    width: 100%;
    height: 100%;
    background: #201f24;
    left:0;
    position: fixed;
    top:0;
    z-index: 99999;
}
.loadess>img{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 700px;
  height: 500px;
  margin: auto;
}
.box > ul {
  width: 100%;
  height: 100%;
}
.box > ul > li {
  width: 30%;
  height: 200px;
  float: left;
  margin-left: 20px;
  margin-bottom: 29px;
  display: flex;
  border-radius: 10px;
  padding-left: 20px;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  transition: all 0.5s;
}
.box > ul > li > div:nth-of-type(1) {
  width: 50%;
  height: 67;
  padding: 50px 0px;
  padding-left: 10px;
}
.box > ul > li > div:nth-of-type(1) > img {
  width: 100%;
  height: 100%;
}
.box > ul > li > div:nth-of-type(2) {
  width: 50%;
  height: 100%;
  padding-top: 33px;
  padding-left: 20px;
  padding-right: 10px;
}
.box > ul > li > div:nth-of-type(2) > p {
  text-align: left;
  margin-bottom: 10px;
  font-weight: bold;
}
.box > ul > li > div:nth-of-type(2) > p > a {
  color: red;
  text-decoration: none;
}
.box > ul > li:hover {
  box-shadow: 4px 10px 5px rgba(0, 0, 0, 0.3);
  transform: translateY(4px);
}
.Dhjl {
  margin-top: 440px !important;
  font-size: 20px;
  color: red;
  font-weight: bold;
}
</style>
