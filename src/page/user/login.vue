<template>
  <div >
    <!--<mu-popup position="bottom" popupClass="Login-popup-bottom" :open="LoginBottom" @close="LoginBottomClose">-->
      <mu-appbar style="background-color: rgba(0,0,0,0);margin-top: 10px" v-bind:z-depth="0">
        <mu-icon-button icon="keyboard_return" slot="left" style="color: #ea5545" @click="LoginBottomClose"/>
      </mu-appbar>
      <mu-content-block>
        <mu-sub-header class="subheader1">欢迎回来！</mu-sub-header>
        <!--<mu-sub-header class="subheader2">Hello there！</mu-sub-header>-->
        <!--<mu-sub-header class="subheader3">Welcome Back！</mu-sub-header>-->
        <mu-content-block style="height: 50px"/>
        <mu-text-field label="手机号" v-model="PhoneNumber" type="number" labelFloat/>
        <mu-text-field label="密码" v-model="password" type="password" labelFloat/>
        <mu-raised-button label="登录" class="my-raised-button" align="center" @click="login"/>
        <mu-content-block style="bottom:0;text-align :center;">
         还没有账号？<b @click="register">注册</b>
        </mu-content-block>
      </mu-content-block>
    <!--</mu-popup>-->
    <mu-toast v-if="toast" :message="indexToast" @close="hideToast"
              style="text-align: center;background-color: #eee;color: #ea5545;border-radius:0;"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 'home',
        PhoneNumber: '',
        password: '',
        toast:false,
        indexToast:'',
        inset: true,
      }
    },
    methods: {
      login() {
        const params = new URLSearchParams();
        const userName = this.PhoneNumber;
        const password = this.password;
        let url = 'http://localhost:8081/api/login'
        params.append("userName", userName);
        params.append("password", password);
        if (userName.length === 11) {
          if (password.length >= 6 && password.length <= 18) {
            axios.post(url, params).then(res => {
              let code=res.data.code;
              console.log(code);
              if (code === 200) {
                sessionStorage.setItem("User_Data", JSON.stringify(res.data.data));
                this.$toast.center('登录成功！');
                this.$store.commit('LoginPhone', this.PhoneNumber);
                this.$store.commit('SetId', res.data.data.id);
                this.$router.push('/user');
              }else {
                this.indexToast=res.data.message;
                this.showToast();
              }
            }).catch(err=> {
              this.indexToast = '网络请求失败';
              this.showToast();
            });
          } else {
            this.indexToast = '密码错误';
            this.showToast();
          }
        } else {
          this.indexToast = '请输入正确的手机号和密码';
          this.showToast();
        }

      },
      register() {
        this.$router.push('/register');
      },
      LoginBottomClose() {
        // this.LoginBottom = false
        this.$router.go(-1);
      },
      showToast() {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => {
          this.toast = false
        }, 2000)
      },
      hideToast() {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
    }
  }
</script>
<style lang="less">
  .my-raised-button {
    position: relative;
    left: 10%;
    margin-top: 40px;
    width: 80%;
    background-color: #ea5545;
    color: #f7f7f7;
  }
  /*弹出框样式*/
  .Login-popup-bottom {
    /*margin-bottom: 56px;*/
    width: 100%;
    height: 100%;
    background-color: #f7f7f7 !important;
  }

</style>
<style scoped lang="less">
  .mu-text-field {
    margin-left: 35px;
  }
  .mu-text-field-content input {
    color: #515d6d;
  }
  .mu-text-field-input {
    color: black;
  }

  .mu-text-field-content {
    padding-bottom: 0;
  }

  .seize-seat-bottom {
    margin-top: 56px;
    height: 0.5em;
  }

  .subheader1 {
    margin-top: 5px;
    margin-left: 15px;
    font-size: large;
    color: #ea5545;
    font-weight: bold;
    vertical-align: bottom;
  }

  .subheader2 {
    margin-top: 25px;
    margin-left: 15px;
    font-size: large;
    color: #000;
  }

  .subheader3 {
    margin-left: 15px;
    font-size: large;
    color: #000;
  }
</style>


