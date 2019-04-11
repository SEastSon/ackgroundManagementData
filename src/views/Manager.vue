<template>
  <div class="manager">
    <div class="layout" :style="{paddingBottom:!onShow?'800px':'220px'}">
      <h3 class="red">管理员</h3>
      <div class="text">
        <input
          type="text"
          placeholder="搜索"
          class="ipt"
          v-model="keyCode"
          @keyup.enter="keyUp(keyCode)"
        >
        <router-link to="/changea" class="change">积分商品管理</router-link>
      </div>
      <table>
        <tr>
          <td>序号</td>
          <td>会员名</td>
          <td>电话</td>
          <td>积分</td>
          <td colspan="2" class="add" @click="showAdd">增加</td>
        </tr>
        <tr v-for="(item,index) in flag?dataUserSeach:dataUsers" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.user}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.integral}}</td>
          <td>
            <a  @click="updata(item.id,item.ids)">修改</a>
          </td>
          <td>
            <a @click="deletes(item.id)">删除</a>
          </td>
        </tr>
      </table>
      <div @click="onAdd()" class="onLoade" v-text="onText" v-if="onShow"></div>
    </div>

    <div class="fiex" v-if="show">
      <div class="center">
        <span class="close" @click="closes">X</span>
        <p v-if="text" class="errText">格式错误</p>
        <label for>
          头像:
          <input type="text" @keyup="modKep" placeholder="请上传网络地址" v-model="Img">
        </label>
        <label for>
          姓名:
          <input type="text" @keyup="modKep" placeholder="请输入2-4位汉字" v-model="user">
        </label>
        <label for>
          电话:
          <input type="text" @keyup="modKep" placeholder="请输入11为手机号码" v-model="opinc">
        </label>
        <label for>
          账号:
          <input type="text" @keyup="modKep" placeholder="只含有汉字、数字、字母、下划线" v-model="Zh">
        </label>
        <label for>
          密码:
          <input type="text" @keyup="modKep" placeholder="由数字、26个英文字母或者下划线组成的字符串" v-model="pas">
        </label>
        <label for>
          积分:
          <input type="text" @keyup="modKep" placeholder="积分不可超出100000" v-model="fen">
        </label>
        <button @click.stop="add()" v-text="upData" ref="but">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manager",
  data() {
    return {
      dataUser: [],
      dataUserSeach: [],
      user: "",
      opinc: "",
      pas: "",
      fen: "",
      dis: 0,
      Zh: "",
      Img: "",
      show: false,
      upData: "增加",
      idSX: 0,
      idSID: "",
      keyCode: "",
      flag: false,
      dataUsers: [],
      num: 1,
      onText: "加载更多",
      onShow: false,
      text: false,
      disa: false
    };
  },
  created() {
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/user.json")
      .then(res => {
        for (var key in res.data.user) {
          var obj = {};
          obj.user = res.data.user[key].name;
          obj.integral = res.data.user[key].integral;
          obj.ulseImg = res.data.user[key].ulseImg;
          obj.phone = res.data.user[key].phone;
          obj.id = key;
          this.dataUser.push(obj);
          if (this.dataUser.length < 10) {
            this.onShow = false;
            this.dataUsers = this.dataUser;
          } else {
            this.onShow = true;
            this.dataUsers = this.dataUser.slice(0, 10);
          }
          this.dis = this.dataUser[this.dataUser.length - 1].ids;
        }
      });
  },
  methods: {
    //匹配输入格式
    modKep() {
      //判断头像格式是否正确
      //this.Img.indexOf('http')==-1

      //匹配姓名是否正确
      var reg = /^[\u4e00-\u9fa5]{2,4}$/;

      // //匹配手机号是否正确
      var ipone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

      // //匹配账号是否正确
      var user = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

      // //密码匹配是否正确
      var regMm = /^\w+$/;

      if (
        this.Img.indexOf("http") != -1 ||
        (this.Img == "" && reg.test(this.user)) ||
        (this.user == "" && ipone.test(this.opinc)) ||
        (this.opinc == "" && user.test(this.Zh)) ||
        (this.Zh == "" && regMm.test(this.pas)) ||
        (this.pas == "" && this.fen <= 100000) ||
        this.fen == ""
      ) {
        this.text = false;
      } else {
        this.text = true;
      }

      if (this.text) {
        this.$refs.but.disabled = true;
      } else {
        this.$refs.but.disabled = false;
      }
    },
    onAdd() {
      this.num++;
      this.dataUsers = this.dataUser.slice(0, this.num * 10);
      if (this.dataUsers.length >= this.dataUser.length) {
        this.onText = "没有更多了";
        return false;
      }
    },
    keyUp(val) {
      this.flag = true;
      let value = this.dataUser.filter(item => {
        return item.user.indexOf(val) != -1;
      });
      this.dataUserSeach = value;
      if (value.length < 10) {
        this.onShow = false;
      } else {
        this.onShow = true;
      }
    },
    showAdd() {
      this.upData = "增加";
      this.show = true;
    },
    closes() {
      this.show = false;
    },
    deletes(ids) {
      this.$http
        .delete(
          "https://wd2770399022cueylv.wilddogio.com/user/user/" + ids + ".json"
        )
        .then(res => {
            alert('用户已删除');
              window.location.reload();
        });
    },
    updata(idx, ids) {
      this.idSX = ids;
      this.idSID = idx;
      this.upData = "修改";
      this.show = true;
      this.$http
        .get(
          "https://wd2770399022cueylv.wilddogio.com/user/user/" + idx + ".json"
        )
        .then(res => {
          this.fen = res.data.integral;
          this.user = res.data.name;
          this.opinc = res.data.phone;
          this.Zh = res.data.user;
          this.pas = res.data.password;
          this.Img = res.data.ulseImg;
        });
    },
    add() {
      if (
        this.user == "" ||
        this.opinc == "" ||
        this.Zh == "" ||
        this.pas == "" ||
        this.fen == ""
      ) {
        alert("内容不可为空");
        this.$refs.but.disabled = true;
        return false;
      } else {
        this.$refs.but.disabled = false;
      }
      var obj = {};
      obj.name = this.user;
      (obj.phone = this.opinc), (obj.password = this.pas);
      obj.integral = this.fen;
      obj.commodity = {};
      obj.ulseImg = this.Img;
      obj.user = this.Zh;
      if (this.upData == "增加") {
        this.$http
          .post("https://wd2770399022cueylv.wilddogio.com/user/user.json", obj)
          .then(res => {
            alert("用户已增加");
            window.location.reload();
            this.show = false;
          });
      } else if (this.upData == "修改") {
        this.$http
          .put(
            "https://wd2770399022cueylv.wilddogio.com/user/user/" +
              this.idSID +
              ".json",
            obj
          )
          .then(res => {
            alert("用户已修改");
            window.location.reload();
          });
      }
    }
  }
};
</script>
<style scoped>
a {
  color: #fff;
  font-size: 12px;
  padding: 4px;
  text-decoration: none;
  background: #b7730f;
  border: none;
  margin-left: 10px;
}
a:hover {
  background: coral;
  color: #000;
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
  background-image: url('../assets/bjt.png');
  background-size: cover;
  height: auto;
  padding-bottom: 220px;
  top: 0;
  left: 0;
  width: 100%;
}
.errText {
  position: absolute;
  top: -3px;
  font-size: 12px;
  color: red;
  font-weight: bold;
  left: 80px;
}
.onLoade {
  width: 300px;
  height: 30px;
  background: orange;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  margin: 30px auto;
  border-radius: 5px;
  cursor: pointer;
}
.change {
  position: absolute;
  right: 0;
}
table {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
  line-height: 36px;
  color: #000;
  font-size: 18px;
  cursor: pointer;
}
table > tr:nth-of-type(1) {
  background: orange;
}
table > tr {
  background: #ccc;
}
table > tr:not(:first-child):hover {
  color: #fff;
  background: darkcyan;
}
.text {
  width: 500px;
  height: 40px;
  float: right;
  display: flex;
  margin-top: -40px;
  margin-right: 200px;
  justify-content: space-between;
  position: relative;
}
.text > input {
  margin-top: 0px;
  position: absolute;
  right: 100px;
}
.add {
  width: 100px;
  height: 30px;
  border: 2px solid #000;
  box-sizing: border-box;
  background: orange;
  cursor: pointer;
}
.ipt {
  width: 100px;
  height: 20px;
  outline: none;
  padding-left: 10px;
  border-radius: 50px;
  transition: all 0.5s;
  border: none;
}
.ipt:hover {
  width: 200px;
}
.add:hover {
  background: coral;
}
.fiex {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
}
.center {
  width: 400px;
  height: 430px;
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
</style>
