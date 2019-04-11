<template>
  <div class="hello">
    <div class="header">
      <div class="ipt">
        <input type="text" placeholder="搜索商品" @keyup.enter="keyUp()" v-model="keyVal" id="ipt">
        <div class="iptButton" @click="addShop()">添加商品</div>
        <router-link to="/" class="rouA">退出登录</router-link>
      </div>
    </div>
    <div class="box">
      <ul>
        <li v-for="(item,index) in shopDataNew" :key="index">
          <span class="delate" title="删除商品" @click="delateShop(item.ids)">X</span>
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
              数量:
              <a href="#">{{item.num}}</a>
            </p>
            <button @click="updataShop(item,item.ids)">修改商品</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="fiex" v-if="showDate">
      <div class="center">
        <span class="close" @click="closeShop">X</span>
        <label for>
          商品图片:
          <input type="text" v-model="Mode.img" placeholder="请上传网络链接">
        </label>
        <label for>
          商品名称:
          <input type="text" v-model="Mode.name" placeholder="商品名称不可超出3个字符">
        </label>
        <label for>
          所需积分:
          <input type="text" v-model="Mode.integral" placeholder="请输入积分">
        </label>
        <label for>
          存货数量:
          <input type="number" v-model="Mode.num" placeholder="请输入存货数量">
        </label>
        <button v-text="updatText" @click="UpdateS()"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopData: [],
      updatText: "修改商品",
      Mode: {},
      showDate: false,
      //商品id
      shopId: "",
      shopDataNew: [],
      b: 7,
      scrollFlag: false,
      keyVal: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  created() {
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/management.json")
      .then(res => {
        for (var key in res.data) {
          var obj = res.data[key];
          obj.ids = key;
          this.shopData.push(obj);
          this.shopDataNew = this.shopData.slice(0, 6);
        }
      });
  },
  methods: {
    //滚轮事件
    scrollToTop() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let height =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      that.scrollTop = scrollTop;
      if (that.scrollTop >= 30 && this.keyVal == "") {
        if (this.scrollFlag == false) {
          this.scrollFlag = true;
        } else {
          this.scrollFlag = false;
          this.b++;
          setTimeout(() => {
            this.shopDataNew = this.shopData.slice(0, this.b);
          }, 1000);
        }
      }
    },

    //删除商品
    delateShop(item) {
      this.$http
        .delete(
          "https://wd2770399022cueylv.wilddogio.com/management/" +
            item +
            ".json"
        )

        .then(res => {
          alert("商品已删除");
          window.location.reload();
        });
    },
    //修改商品
    updataShop(item, idx) {
      this.updatText = "修改商品";
      this.showDate = true;
      this.Mode = item;
      this.shopId = idx;
    },
    //添加商品
    addShop() {
      this.Mode = {
        name: "",
        img: "",
        integral: "",
        num: ""
      };
      this.updatText = "添加商品";
      this.showDate = true;
    },
    //修改商品/增加商品
    UpdateS() {
      if (this.updatText == "修改商品") {
        this.$http
          .put(
            "https://wd2770399022cueylv.wilddogio.com/management/" +
              this.shopId +
              ".json",
            this.Mode
          )
          .then(res => {
            alert("商品已修改");
            window.location.reload();
          });
      }
      if (this.updatText == "添加商品") {
        this.$http
          .post(
            "https://wd2770399022cueylv.wilddogio.com/management.json",
            this.Mode
          )
          .then(res => {
            alert("商品已添加");
            window.location.reload();
          });
      }
    },
    //关闭--》修改商品/增加商品
    closeShop() {
      this.showDate = false;
    },
    //搜索商品
    keyUp() {
      let val = this.shopData.filter(item => {
        return item.name.indexOf(this.keyVal) != -1;
      });
      this.shopDataNew = val;
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

.hello {
  width: 99.4%;
  height: auto;
  position: absolute;
  top: 0;
  background-image: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1642310028,62835869&fm=26&gp=0.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 600px;
  /* box-sizing: border-box; */
}

.header {
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  padding-right: 130px;
  z-index: 1;
}

.ipt {
  width: 550px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  float: right;
}

#ipt {
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-top: 10px;
  padding-left: 20px;
}

.iptButton {
  height: 30px;
  background: #fff;
  border-radius: 50px;
  font-size: 14px;
  line-height: 30px;
  width: 100px;
  color: #000;
  margin-top: 10px;
  cursor: pointer;
}

.iptButton:hover {
  background: crimson;
  color: #fff;
  font-weight: bold;
}

#tc {
  color: cornflowerblue;
  line-height: 50px;
  color: red;
  font-weight: bold;
}

.box {
  width: 1200px;
  height: auto;
  background: red;
  margin: 100px auto;
}

.box > ul {
  width: 100%;
  height: 100%;
}

.box > ul > li {
  width: 30%;
  height: 300px;
  float: left;
  margin-left: 29px;
  margin-bottom: 29px;
  display: flex;
  background: #fff;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  transition: all 0.5s;
}

.box > ul > li > div:nth-of-type(1) {
  width: 50%;
  height: 100%;
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
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 10px;
}

.box > ul > li > div:nth-of-type(2) > p {
  float: left;
  margin-bottom: 10px;
  font-weight: bold;
}

.box > ul > li > div:nth-of-type(2) > p > a {
  color: red;
  text-decoration: none;
}

.box > ul > li > div:nth-of-type(2) > button {
  background: orange;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border-radius: 6px;
  outline: none;
  position: absolute;
  bottom: 100px;
  left: 62%;
  cursor: pointer;
}

.box > ul > li > div:nth-of-type(2) > button:hover {
  background: orangered;
}

.delate {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  right: -8px;
  top: -8px;
  line-height: 30px;
  color: red;
  border: 1px solid #ccc;
  font-weight: bold;
  display: none;
}

.box > ul > li:hover .delate {
  display: block;
}

.box > ul > li:hover {
  box-shadow: 4px 10px 5px rgba(0, 0, 0, 0.3);
  transform: translateY(4px);
}

.delate:hover {
  background: red;
  color: #fff;
}

.fiex {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.center {
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  padding: 40px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.close {
  position: absolute;
  right: 20px;
  top: 10px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.center label {
  display: block;
}

.center label input {
  width: 200px;
  height: 30px;
  margin-bottom: 20px;
  outline: none;
  padding-left: 5px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #ccc;
}

.center button {
  width: 200px;
  height: 30px;
  background: orange;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  outline: none;
  font-weight: bold;
  line-height: 27px;
  text-align: center;
}

.rouA {
  line-height: 50px;
  color: red;
  text-decoration: none;
}

.rouA:hover {
  text-decoration: underline;
  color: blue;
}
</style>
