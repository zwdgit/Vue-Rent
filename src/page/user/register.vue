<template>
  <div>
    <mu-appbar style="background-color: rgba(0,0,0,0);margin-top: 10px" v-bind:z-depth="0">
      <mu-icon-button icon="keyboard_return" slot="left" style="color: #515d6d" @click="RouterOne"/>
    </mu-appbar>
    <mu-content-block style="margin-top: 15%">
        <mu-flexbox orient="vertical">
          <mu-flexbox-item class="flexbox_1">
              注册
          </mu-flexbox-item>
          <mu-flexbox-item class="flexbox_2">
            <mu-paper class="demo-paper" :zDepth="2">
              <mu-text-field label="手机号" v-model="PhoneNumber" type="number" labelFloat/>
              <mu-text-field label="密码" v-model="password" type="password" labelFloat/>
            </mu-paper>
          </mu-flexbox-item>
          <mu-flexbox-item class="flexbox_3">
            <mu-raised-button label="注册" align="center"  class="my_button" @click="register" />
          </mu-flexbox-item>
        </mu-flexbox>
      <mu-content-block style="bottom:0;text-align:center;">
        已经有账号?<b @click="toLogin">登录</b>
      </mu-content-block>
    </mu-content-block>
    <mu-toast v-if="toast" :message="indexToast" @close="hideToast"
              style="text-align: center;background-color: #eee;color: #ea5545;border-radius:0;"/>
  </div>
</template>

<script>
  import MuFlexbox from "muse-ui/src/flexbox/flexbox";
  import MuFlexboxItem from "muse-ui/src/flexbox/flexboxItem";
  export default {
    components: {MuFlexboxItem, MuFlexbox},
    data() {
      return {
        PhoneNumber: '',
        password:'',
        toast:false,
      }
    },
    methods: {
      RouterOne() {
        this.$router.go(-1);
      },
      register(){
        let params = new URLSearchParams();
        let userName = this.PhoneNumber;
        let password = this.password;
        if (userName.length === 11) {
          if (password.length >= 6 && password.length <= 18) {
            let url = 'http://localhost:8081/api/register'
            params.append("userName", userName);
            params.append("password", password);
            params.append("nickName", userName);
            axios.post(url, params).then(res => {
              let code=res.data.code;
              console.log(code);
              if (code === 200) {
                console.log(code);
                console.log(res.data.data)
                sessionStorage.setItem("User_Data", JSON.stringify(res.data.data));
                this.$toast.center('注册成功!');
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
            this.indexToast = '密码为6-18位';
            this.showToast();
          }
        } else {
          this.indexToast = '请输入正确的手机号和密码';
          this.showToast();
        }
      },
      toLogin(){
        this.$router.push('/login');
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
<style scoped lang="less">
  .my_button{

  }
  .flexbox_1{
    text-align: center;
    font-size: x-large;
    line-height: 70px;
    color: #515d6d;
  }
  .flexbox_2{
    text-align: center;
    font-size: x-large;
    color: #515d6d;
  }
  .flexbox_3{
    text-align: center;
  }
  .demo-paper {
    display: inline-block;
    width: 90%;
    margin: 20px;
    text-align: center;
  }
</style>
