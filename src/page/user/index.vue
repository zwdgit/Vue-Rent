<template>
  <div>
    <!--<img :src="modify_data.background" style="width:100%;position:fixed">-->
    <mu-appbar title="用户中心" class="Top-Class"/>
    <div class="seize-seat-top"></div>
    <div class="TempLate">
      <div class="User-Card-Zw"></div>
      <mu-card class="UserCard-Top">
        <mu-list-item @click="ToModifydate" class="Top-list-item"
                      :title="modify_data.nickName" :describeText="modify_data.introduction">
          <mu-avatar src="http://localhost:8081/icon.png" slot="leftAvatar"/>
          <mu-icon value="account_circle" slot="right"/>
        </mu-list-item>
        <mu-flexbox>
          <mu-flexbox-item>
            <mu-flat-button @click="User_Follow" label="关注" icon="person_add" class="User-Top-Btn-Left"/>
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-flat-button @click="ToUser_issue('collect')" label="收藏" icon="grade" class="User-Top-Btn-Left"/>
          </mu-flexbox-item>
          <mu-flexbox-item>
            <mu-flat-button @click="ToUser_issue('dotpraise')" label="点赞" icon="thumb_up" class="User-Top-Btn"/>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-card>
      <mu-card class="UserCard-Top">
        <mu-list-item title="我发布的帖子" @click="ToUser_issue('issue')">
          <mu-icon slot="right" value="chevron_right" color="#9e9e9e"/>
        </mu-list-item>
        <mu-list-item title="我发布的评论" to="/user/discuss" style="border-top: 1px solid #eeeeee">
          <mu-icon slot="right" value="chevron_right" color="#9e9e9e"/>
        </mu-list-item>
      </mu-card>
      <mu-card class="UserCard-Top">
        <mu-list-item title="身份认证" to="/user/cellphone">
          <mu-icon slot="right" value="chevron_right" color="#9e9e9e"/>
        </mu-list-item>
        <mu-list-item title="手机绑定" to="/user/cellphone">
          <mu-icon slot="right" value="chevron_right" color="#9e9e9e"/>
        </mu-list-item>
        <mu-list-item title="修改资料" to="/user/modifydata" style="border-top: 1px solid #eeeeee">
          <mu-icon slot="right" value="chevron_right" color="#9e9e9e"/>
        </mu-list-item>
      </mu-card>

      <mu-card class="UserCard-Top">
        <mu-flat-button label="退出当前账号" @click="End_User" class="User-Top-Btn" color="rgb(244, 67, 54)"/>
      </mu-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 'user',
        bottomNavColor: 'user',
      }
    },
    created() {
      this.modify_data=JSON.parse(sessionStorage.getItem("User_Data"));
    },
    computed: {
      PhoneValue() {
        return this.$store.state.UserPhone;
      }
    },
    methods: {
      ToModifydate(){
        sessionStorage.setItem("modify_data",JSON.stringify(this.modify_data));
        this.$router.push('/user/modifydata');
      },
      handleChange(val) {
        this.bottomNav = val
      },
      End_User() {
        this.$store.commit('LoginPhone', '');
        sessionStorage.removeItem('userphone');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('modify_data');
        this.$router.push('/home');
      },
      ToUser_issue(label) {
        sessionStorage.setItem("UserTo", JSON.stringify(label))
        this.$router.push('/user/issue');
      },
      User_Follow() {
        this.$router.push('/user/follow')
      },
    }
  }
</script>

<style scoped lang="less">
  .Top-Class {
    background-color: #3d4955;
    position: fixed;
    top: 0;
    padding: 0;
    text-align: center;
    font-size: 1.2em;
  }
  .seize-seat-top {
    height: 56px;
  }
  .TempLate {
    padding: 1em;
    width: 100%;
    height: 100%;
  }
  .mu-paper {
    position: fixed;
    width: 100%;
    bottom: 0;
    table-layout: fixed;
  }
  .mu-card {
    border-radius: 0.3em;
    margin-top: 5%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .UserCard-Top {
    border-radius: 0.3em;
    margin-top: 5%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .Top-list-item {
    border-bottom: 1px solid #eeeeee;
  }

  .demo-paper {
    display: inline-block;
    height: 100px;
    width: 100px;
    margin: 20px;
    text-align: center;
    background-color: #474a4f;
  }
  .demo-paper .mu-avatar {
    height: 100px;
    width: 100px;
  }
  .mu-avatar-inner img {
    width: 3em;
    height: 3em;
  }
  .User-Top-Btn-Left {
    width: 100%;
    height: 3em;
    border-right: 1px solid #eeeeee;
  }
  .User-Top-Btn {
    width: 100%;
    height: 3em;
  }
  .User-Bottom-Btn {
    width: 100%;
    height: 5em;
    padding: 1em;
    line-height: 2em;
  }
</style>
