<template>
  <div class="hello">
     <div
           v-if="loade"
          class="loadess"
       >
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554894070556&di=7b815f09656a84735279830755d429a8&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D700%3Bq%3D50%2Fsign%3D17507ae5ae86c91708035039f90601f2%2F58ee3d6d55fbb2fbc18cc60f464a20a44623dc0c.jpg" alt="">
        </div>
    <div class="layout">
      <table>
        <tr>
          <td>头像</td>
          <td>会员名</td>
          <td>电话</td>
          <td>积分</td>
        </tr>
        <tr class="tr">
          <td>
            <img :src="datas.ulseImg" alt v-if="msg">
          </td>
          <td v-if="msg">{{datas.name}}</td>
          <td v-if="msg">{{datas.phone}}</td>
          <td v-if="msg">{{datas.integral}}</td>
        </tr>
      </table>
      <h1 class="Jl JlNext">
        <router-link to="/" exact>返回首页</router-link>
      </h1>
      <h1 class="Jl">
        <router-link :to="{name:'child1',query:{id:keyID}}"  exact>兑换记录</router-link>
      </h1>
      <h1 class="Jl JlZx">
        <router-link :to="{name:'child2',query:{id:keyID}}" exact>兑换中心</router-link>
      </h1>
      <router-view class="aaa" :ss="datas"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: true,
      datas: [],
      keyID: "",
      loade:true
    };
  },
  created() {
    this.keyID = this.$route.query.id;
    if (this.keyID == undefined) {
      alert("网路延迟，请返回重试");
      this.msg = false;
    } else {
      this.msg = true;
      this.$http
        .get(
          "https://wd2770399022cueylv.wilddogio.com/user/user/" +
            this.keyID +
            ".json"
        )
        .then(res => {
          this.loade=false;
          this.datas = res.data;
        });
    }
  }
};
</script>
<style scoped>
* {
  list-style: none;
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
.red {
  color: red;
  font-size: 40px;
  text-align: center;
}
.layout {
  background: #f5f7f9;
  position: absolute;
  border-radius: 4px;
  overflow: hidden;
  background-image: url("../assets/bjt.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: auto;
  top: 0;
  left: 0;
  padding-bottom: 800px;
  width: 100%;
}
table {
  width: 100%;
  height: auto;
  border: 1px solid #000;
  border-collapse: collapse;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-weight: bold;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
td {
  border: 1px solid #000;
}
table img {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%;
}
.tr > td {
  color: coral;
}
.Jl {
    width: 40px;
    height: 113px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    font-size: 20px;
    top: 134px;
    left: 0px;
    position: fixed;
    background-color: rgba(0,0,0,.7);
    border-top-right-radius:30px;
}
.Jl > a {
    display: inline-block;
    width: 40%;
    height: 80%;
    padding-right: 10px;
    padding-left: 10px;
    color: #fff;
    padding-top: 11px;
    font-size: 16px;
    margin-top: 0;
    text-decoration: none;

}
.Jl > a.router-link-active {
  color: red;
}
.Jl > a:hover {
  color: red;
}

.JlZx {
  top: 265px;
   border-top-right-radius:0%;
}
.JlNext {
  top: 397px;
  border-top-right-radius:0%;
   border-bottom-right-radius:30px;
}
</style>
