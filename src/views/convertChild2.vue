<template>
  <div>
     <div
           v-if="loade"
          class="loadess"
       >
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554894070556&di=7b815f09656a84735279830755d429a8&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D700%3Bq%3D50%2Fsign%3D17507ae5ae86c91708035039f90601f2%2F58ee3d6d55fbb2fbc18cc60f464a20a44623dc0c.jpg" alt="">
        </div>
    <div class="tips" v-if="tipss">
      <div>
        <p>兑换记录已存在该商品，是否兑换?</p>
        <p>
          <span @click="tipsS">是</span>
          <span @click="tipsN">否</span>
        </p>
      </div>
    </div>
    <input type="text" placeholder="搜索商品"
    @keyup.enter="Seach()"
    v-model="seachText"
    class="seach">
    <div class="box">
      <ul>
        <li v-for="(item,index) in key?shopDataNew:shopData" :key="index">
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
              <a href="#">{{item.integral}}</a>
            </p>
            <p>
              库存:
              <a href="#">{{item.num}}</a>
            </p>
            <button class="Dhshop" @click="Dhshops(index,item)">
              兑换
              <div class="DhNum" v-if="index==idx?true:false">
                <div @click.stop="renJ(item.num,item.integral)">-</div>
                <p>
                  <span>num:&nbsp;</span>
                  <input type="text" disabled v-model="num">
                </p>
                <p>
                  <span>sum:&nbsp;</span>
                  <input type="text" disabled v-model="sum">
                </p>
                <div @click.stop="adds(item.num,item.integral)">+</div>
                <button v-show="Tj" @click.stop="Tjs(item)">提交</button>
              </div>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopData: [],
      num: 0,
      showNode: false,
      idx: 33333,
      falg: true,
      sum: 0,
      Tj: false,
      query: "",
      ifs: "",
      tipss: false,
      seachText:'',
      shopDataNew:[],
      key:false,
      loade:true
    };
  },
  props: {
    ss: 0
  },
  created() {
    this.query = this.$route.query.id;
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/management.json")
      .then(res => {
        this.loade=false;
        for (var key in res.data) {
          var obj = res.data[key];
          obj.ids = key;
          this.shopData.push(obj);
          if (res.data[key].num <= 0) {
            //商品数量为0的时候删除商品
            this.$http
              .delete(
                "https://wd2770399022cueylv.wilddogio.com/management/" +
                  key +
                  ".json"
              )
              .then(res => {
                window.location.reload();
              });
          }
        }
      });
  },
  methods: {
    //搜索商品
    Seach(){
      this.shopDataNew = this.shopData.filter((item)=>{
          return item.name.indexOf(this.seachText)!=-1;
        })
        this.key = true;
    },

    Dhshops(idxs, item) {
      this.num = 0;
      this.sum = 0;
      if(this.ss.integral<=parseInt(item.integral)){
           alert("您的积分已不足")
            this.idx=9999999;
            return false;
      }else{
        //判断是否已兑换
          for (var key in this.ss.commodity) {
            if (this.ss.commodity[key].name == item.name) {
              alert("商品已兑换，请勿反复操作");
              this.Tj = false;
              return false;
            }
          }
          this.idx = idxs;
      }
      this.$http
        .get("https://wd2770399022cueylv.wilddogio.com/Xqconent.json")
        .then(res => {
          var arr = [];
          for (var key in res.data) {
            res.data[key].id = key;
            arr.push(res.data[key]);
          }
          this.ifs = arr.filter(items => {
            if (items.users == this.ss.name && item.name == items.name) {
              return items.id;
            } else {
              return "";
            }
          });
          if (this.ifs.length != 0) {
            this.tipss = true;
          }
        });
    },
    tipsS() {
      this.tipss = false;
    },
    tipsN() {
      this.tipss = false;
      this.idx = 666;
    },
    adds(num, Jf) {
      this.num++;
      this.sum = this.num * Jf;
      if (this.ss.integral <= this.sum) {
        alert("你的积分不够");
        this.Tj = false;
        return false;
      } else if (this.num >= num) {
        alert("数量以超出库存范围");
        this.Tj = false;
        return false;
      } else {
        this.Tj = true;
      }
    },
    renJ(num, Jf) {
      this.num--;
      this.sum = this.num * Jf;
      if (this.num < 1) {
        alert("数量不可为负数");
        this.Tj = false;
        return false;
      } else if (this.ss.integral <= this.sum) {
        alert("你的积分不够");
        this.Tj = false;
        return false;
      } else if (this.num >= num) {
        alert("数量以超出库存范围");
        this.Tj = false;
        return false;
      }
      this.Tj = true;
    },
    //提交数量
    Tjs(item) {




      this.idx = 999;
      var objs = this.ss;
      objs.integral = objs.integral - this.sum;



      if (objs.integral <= 0) {
        objs.integral = 0;
      }
      var childObj = {
        name: item.name,
        Jf: item.integral,
        img: item.img,
        num: this.num,
        users: this.ss.name
      };
      //修改个人积分
      this.$http
        .put(
          "https://wd2770399022cueylv.wilddogio.com/user/user/" +
            this.query +
            ".json",
          objs
        )
        .then(res => {});
      //修改商品数量
      var itemObj = item;
      itemObj.num = itemObj.num - this.num;
      this.$http
        .put(
          "https://wd2770399022cueylv.wilddogio.com/management/" +
            itemObj.ids +
            ".json",
          itemObj
        )
        .then(res => {});

      //判断是否重复添加兑换记录
      this.$http
        .get("https://wd2770399022cueylv.wilddogio.com/Xqconent.json")
        .then(res => {
          var arr = [];
          for (var key in res.data) {
            res.data[key].id = key;
            arr.push(res.data[key]);
          }
          this.ifs = arr.filter(items => {
            if (items.users == this.ss.name && item.name == items.name) {
              return items.id;
            } else {
              return "";
            }
          });
          if (this.ifs.length == 0) {
            this.$http
              .post(
                "https://wd2770399022cueylv.wilddogio.com/Xqconent.json",
                childObj
              )
              .then(res => {
                alert("兑换商品成功");
              });
          } else {
            childObj.num = this.num + this.ifs[0].num;
            this.$http
              .put(
                "https://wd2770399022cueylv.wilddogio.com/Xqconent/" +
                  this.ifs[0].id +
                  ".json",
                childObj
              )
              .then(res => {
                alert("兑换商品成功");
              });
          }
        });
    }
  }
};
</script>

<style scoped>
.box {
  width: 1200px;
  background: red;
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
.seach{
  width: 80px;
  height: 25px;
  padding-left:10px;
  position: fixed;
  border-radius: 10px;
  border: 0;
  outline: none;
  top:130px;
  right:20px;
  z-index: 99999;
  transition: all .5s;
}
.seach:hover{
  width: 200px;
}

.tips {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 444;
  background-color: rgba(0, 0, 0, 0.6);
}

.tips > div {
  width: 400px;
  height: 200px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  padding-top: 40px;
  box-sizing: border-box;
}

.tips > div > p {
  color: black;
  font-weight: bold;
}

.tips > div > p:nth-of-type(2) {
  display: inline-block;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
}

.tips > div > p:nth-of-type(2) > span {
  background: orange;
  padding: 2px 20px;
  color: purple;
  box-sizing: border-box;
  border-radius: 5px;
  line-height: 28px;
  cursor: pointer;
}

.tips > div > p:nth-of-type(2) > span:hover {
  background: aqua;
}

.box > ul {
  width: 100%;
  height: 100%;
}

.box > ul > li {
  width: 30%;
  height: 243px;
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
.Dhshop {
  width: 70px;
  height: 30px;
  background: red;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
}

.Dhshop:hover {
  background: chocolate;
}

.DhNum {
  width: 250px;
  height: 20px;
  top: 48px;
  position: absolute;
  left: 50%;
  margin-left: -230px;
  display: flex;
  justify-content: space-between;
}

.DhNum > div {
  width: 20px;
  height: 20px;
  background: #999;
  border-radius: 50%;
  line-height: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.DhNum > div:hover {
  background: cadetblue;
}

.DhNum > p {
  margin: 0;
}

.DhNum > p > input {
  width: 30px;
  color: blue;
  font-weight: bold;
  text-align: center;
}

.DhNum > p:nth-of-type(2) > input {
  width: 60px;
}

.DhNum > button {
  height: 22px;
  background: red;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  line-height: 2px;
  position: absolute;
  right: -50px;
  top: -2px;
  outline: none;
  cursor: pointer;
}

.DhNum > p > span {
  color: #000;
}
</style>
