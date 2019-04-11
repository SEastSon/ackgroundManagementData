<template>
  <div class="Converts">
       <div
           v-if="loade"
          class="loadess"
       >
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554894070556&di=7b815f09656a84735279830755d429a8&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D700%3Bq%3D50%2Fsign%3D17507ae5ae86c91708035039f90601f2%2F58ee3d6d55fbb2fbc18cc60f464a20a44623dc0c.jpg" alt="">
        </div>
    <div class="layout">
      <h3 class="red">个人中心</h3>
      <div>
        <Header>
          <img :src="datas.ulseImg">
          <div class="mes">
            <p class="ms">您的基本信息</p>
            <p class="names">
              会员:
              <a href="#">{{datas.name}}</a>
            </p>
            <p>
              电话:
              <a href="#">{{datas.phone}}</a>
            </p>
            <p>
              积分:
              <a href="#">{{datas.integral}}</a>
            </p>
            <router-link :to="{path:'/cChild1',query:{id:jqId}}" class="expoedd">兑换记录</router-link>
            <router-link :to="{path:'/cChild2',query:{id:jqId}}" class="expoedd">兑换中心</router-link>
          </div>
        </Header>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: "",
      jqId: "",
      loade:true
    };
  },
  created() {
    this.jqId = this.$route.query.id;
    this.$http
      .get(
        "https://wd2770399022cueylv.wilddogio.com/user/user/" +
          this.jqId +
          ".json"
      )
      .then(res => {
        this.datas = res.data;
          this.loade=false;
      });
  }
};
</script>
<style scoped>
.red {
  color: red;
  font-size: 40px;
  text-align: center;
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
.layout {
  width: 100%;
  height: 100%;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background-image: url('../assets/bjt.png');
  background-size: cover;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  height: 969px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 50px;
}
.mes {
  width: 100%;
  position: absolute;
  text-align: center;
}
.ms {
  font-size: 24px;
}
.name {
  margin-top: 10px;
}
span {
  margin-left: 150px;
}
router-link-active {
  text-decoration: none;
}
.expoedd {
  text-decoration: none;
  color: #000;
  padding: 4px 10px;
  border-radius: 5px;
  background: #fff;
  margin-right: 30px;
  font-weight: bold;
}
.expoedd:hover {
  background: #f0889a;
  color: #fff;
}
header p a {
  text-decoration: none;
  color: hotpink;
  font-weight: bold;
}
header p:nth-of-type(1) {
  margin-top: 30px;
}
header p {
  width: 200px;
  margin: 0 auto;
  text-align: left;
  height: 30px;
  padding-left: 30px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
</style>
