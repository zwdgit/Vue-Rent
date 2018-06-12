<template>
  <div>
    <router-view></router-view>
    <mu-paper class="Bottom-Nav-Class">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="主页" icon="home" to="/home"/>
        <mu-bottom-nav-item value="exhibition" title="展集" icon="collections" to="/exhibition"/>
        <mu-float-button icon="add" @click="Publish"/>
        <mu-bottom-nav-item value="more" title="更多" icon="explore" to="more"/>
        <mu-bottom-nav-item value="user" title="我" icon="account_circle"/>
      </mu-bottom-nav>
    </mu-paper>
    <div class="seize-seat-bottom"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 'home',
        PhoneNumber: '',
        toast: false
      }
    },
    computed: {
      PhoneValue() {
        return this.$store.state.UserPhone;
      }
    },
    watch: {
      "$route": "BottomActive",
    },
    created() {
      this.BottomActive();
    },
    methods: {
      handleChange(val) {
        if (val === 'user') {
          this.GoUser();
        } else {
          this.bottomNav = val
        }
      },
      Publish() {
        console.log(this.PhoneValue)
        if (this.PhoneValue.length < '11') {
          this.$router.push('/login')
        } else {
          this.$router.push('/publish')
        }
      },
      GoUser() {
        if (this.PhoneValue.length < '11') {
          this.$router.push('/login');
        } else {
          this.$router.push('/user')
        }
      },
      BottomActive() {
        const routePath = this.$route.path;
        this.bottomNav = (routePath === '/home' && 'home') || (routePath === '/exhibition' && 'exhibition') || (routePath === '/more' && 'more') || (routePath === '/user' && 'user')
        console.log(this.bottomNav)
      },

    }
  }
</script>
<style lang="less">
  /*选中导航栏文字*/
  .mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-icon, .mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-text {
    color: #f7f7f7;
  }
</style>
<style scoped lang="less">


  .Bottom-Nav-Class {
    position: fixed;
    width: 100%;
    bottom: 0;
    table-layout: fixed;
  }

  /*导航栏背景*/
  .mu-bottom-nav {
    background-color: #3d4955;
  }

  .seize-seat-bottom {
    margin-top: 56px;
    height: 0.5em;
  }

  .mu-buttom-item {
    color: #f7f7f7;
  }

  .Login-Bottom {
    text-align: center;
  }

  .Login-Bottom-Icon img {
    width: 100%;
  }
</style>
