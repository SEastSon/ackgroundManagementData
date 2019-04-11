<template>
  <div class="login">
    <div class="denglu">
      <img src="../assets/4.jpg" alt>
      <div class="kuang">
        <div class="xuan">
          <span class="right" @click="Yh()" :style="{opacity:Hy?1:0.4}">会员</span>
          <span class="right" @click="Admins()" :style="{opacity:Admin?1:0.4}">管理员</span>
        </div>
        <div class="xiang">
          <div class="Hy" v-if="Hy">
            <div class="one">
              <div class="login-label">
                <span class="spans" v-if="err">用户名输入错误!!!</span>
              </div>
              <input
                type="text"
                class="itxt"
                placeholder="只含有汉字、数字、字母、下划线"
                v-model="user"
                @keyup="ipt()"
              >
            </div>
            <div>
              <div class="login-labe">
                <span class="spans" v-if="err1">密码输入错误!!!</span>
              </div>
              <input
                type="password"
                class="itxt"
                placeholder="由数字、26个英文字母或者下划线组成的字符串"
                v-model="password"
                @keyup="ipt()"
              >
            </div>
          </div>
          <div class="admin" v-if="Admin">
            <div class="one">
              <div class="login-label">
                <span class="spans" v-if="err">用户名输入错误!!!</span>
              </div>
              <input
                type="text"
                class="itxt"
                placeholder="只含有汉字、数字、字母、下划线"
                v-model="user"
                @keyup="ipt()"
              >
            </div>
            <div>
              <div class="login-labe">
                <span class="spans" v-if="err1">密码输入错误!!!</span>
              </div>
              <input
                type="password"
                class="itxt"
                placeholder="由数字、26个英文字母或者下划线组成的字符串"
                v-model="password"
                @keyup="ipt()"
              >
            </div>
          </div>
          <button  @click="login()">
            <router-link to class="btn" v-text="admin+'登录'"></router-link>
          </button>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      Hy: true,
      Admin: false,
      err: false,
      err1: false,
      user: "",
      password: "",
      dataUser: [],
      objUrl: {},
      admin: "会员",
      adminUser: {}
    };
  },
  created() {
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/user.json")
      .then(res => {
        for (var key in res.data.user) {
          var obj = {};
          obj.user = res.data.user[key].user;
          obj.pas = res.data.user[key].password;
          obj.id = key;
          this.dataUser.push(obj);
        }
      });
    this.$http
      .get("https://wd2770399022cueylv.wilddogio.com/admin.json")
      .then(res => {
        this.adminUser = res.data.admin;
      });
  },
  methods: {
    Yh() {
      this.Hy = true;
      this.Admin = false;
      this.admin = "会员";
    },
    Admins() {
      this.Hy = false;
      this.Admin = true;
      this.admin = "管理员";
    },
    ipt() {
      // 只含有汉字、数字、字母、下划线，下划线位置不限：
      var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
      // 由数字、26个英文字母或者下划线组成的字符串
      var regMm = /^\w+$/;
      if (regMm.test(this.password) || this.password == "") {
        this.err1 = false;
      } else {
        this.err1 = true;
      }
      if (reg.test(this.user) || this.user == "") {
        this.err = false;
      } else {
        this.err = true;
      }
    },
    login() {
      if (this.user == "" || this.password == "") {
        alert("内容不可为空");
      }
      if (this.admin == "会员") {
        var flag = this.dataUser.filter(item => {
          return item.user == this.user && item.pas == this.password;
        });
        if (flag.length != 0) {
          this.$router.push({
            path: "/Converts",
            query: {
              id: flag[0].id
            }
          });
        } else {
          alert("用户输入错误");
          return false;
        }
      } else if (this.admin == "管理员") {
        if (
          this.adminUser.pas == this.password &&
          this.adminUser.user == this.user
        ) {
          this.$router.push({
            path: "/manager"
          });
        } else {
          alert("用户输入错误");
        }
      }
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
}
.denglu {
  width: 100%;
  height: 969px;
  margin: 0 auto;
}
.denglu img {
  width: 100%;
  height: 99.7%;
}
.kuang {
  width: 535px;
  height:490px;
  position: absolute;
  top: 155px;
  right: 235px;
  background-image: url(../assets/2.jpg);
  border-radius: 39% 5% 5% 5%;
}
.xuan {
  font-size: 20px;
  width: 200px;
  float: right;
  margin-right: 100px;
  padding-top: 50px;
}
.right {
  color: #fff;
  margin-right: 50px;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.2;
  font-weight: bold;
}
.left {
  color: #fff;
  text-decoration: none;
}
.xiang {
  width: 400px;
  height: 260px;
  margin-top: 200px;
  margin-left: 68px;
  padding-top: 30px;
}
.itxt {
  outline: none;
  line-height: 18px;
  height: 18px;
  border: 0;
  padding: 10px 0 10px 50px;
  width: 310px;
  float: none;
  font-size: 14px;
  font-family: "\5b8b\4f53";
}
.login-label {
  position: relative;
  z-index: 3;
  top: 38px;
  left: 20px;
  width: 38px;
  height: 38px;
  background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/pwd-icons-new.png)
    no-repeat;
}
.spans {
  position: absolute;
  top: -30px;
  width: 300px;
  left: -70px;
  font-size: 13px;
  color: red;
  letter-spacing: 2px;
  font-weight: bold;
}
.login-labe {
  position: relative;
  z-index: 3;
  top: 38px;
  left: 20px;
  width: 38px;
  height: 38px;
  background: url(//misc.360buyimg.com/user/passport/1.0.0/widget/login-form-2018-0827/i/pwd-icons-new.png)
    no-repeat;
  background-position: -48px 0;
}
button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
  border-radius: 8%;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}
button > a {
  color: #000;
  font-weight: bold;
}
button:hover {
  background-color: beige;
}
button:hover a {
  color: red;
}
.btn {
  font-size: 16px;
  text-decoration: none;
}
</style>

