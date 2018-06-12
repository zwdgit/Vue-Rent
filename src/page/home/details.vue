<template>
  <div>
    <div>
    <mu-appbar :title="'详情'" class="Top-Class" titleClass="titleClass">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne"/>
    </mu-appbar>
    <div class="seize-seat-top"></div>
    <div class="text-decoration">
      <mu-list-item :title="item.nickName + ' | ' + '#' + item.info.type" :describeText="item.info.releaseDate">
        <mu-avatar src="http://localhost:8081/icon.png" slot="leftAvatar"/>
        <mu-icon value="person_add" slot="right"/>
      </mu-list-item>
      <mu-divider/>
      <mu-card-text>
        {{item.info.introduction}}
        <mu-badge class="demo-badge-content">#{{item.info.label}}</mu-badge>
      </mu-card-text>

      <mu-grid-tile v-for="items in item.pictureList" :key="items.id">
        <img v-lazy="'http://localhost:8081/'+items.picturePath" width="95%">
        <span slot="title">{{item.info.releaseDate}}</span>
        <span slot="subTitle"><b>{{item.nickName}}</b></span>
      </mu-grid-tile>

      <mu-divider/>
    </div>
    <mu-paper class="demo-paper" >
      <mu-content-block style="text-align: left;font-size: medium">
        留言·{{commentNum}}
      </mu-content-block>
    </mu-paper>

    <!--评论-->
    <div class="comments-container" v-for="comment in comments_data" :key="comment.name">
    <mu-list-item :title="comment[1]" :describeText="comment[0]">
      <mu-avatar src="http://localhost:8081/icon.png" slot="leftAvatar"/>
    </mu-list-item>
      <mu-divider />
    </div>
      <mu-divider style="height: 50px;background-color:rgb(250,250,250)"/>
    </div>
    <!--点赞、发表评论-->
    <div class="topic-bottom" >
      <mu-checkbox uncheckIcon="favorite_border" checkedIcon="favorite" @change="liked"/>
      <mu-checkbox uncheckIcon="chat_bubble_outline" checkedIcon="chat_bubble" @change="Topic_Input"
                   style="margin-left: 13px"/>
      <mu-text-field style="color:white" class="field-input"  v-show="topic_input" hintText="请输入你的评论" v-model="comment.content"/>
      <mu-flat-button v-show="topic_input" label="发送" style="margin-top: -0.6em" icon="send" color="#fafafa" @click="sendOut"/>
    </div>
    <mu-dialog :open="dialog" @close="close">
      检测到您还未登录，是否跳转到登录界面？
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="enter" label="确定"/>
    </mu-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        Details_Data: {},
        Comments: false,
        item: '',
        topic_input: false,
        cols: 1,
        commentNum: 0,
        color: 'white',
        like: false,
        dialog:false,
        comment:{
          infoId:'',
          userId:'',
          content:''
        },
        comments_data:''
      }
    },
    created() {
      console.log("details")
      this.item = JSON.parse(sessionStorage.getItem("item"))
      this.comment.infoId = this.item.info.id
      this.comment.userId = this.$store.state.id
      this.findComments()
    },
    beforeDestroy() {
      if (this.like) {
        let params = new URLSearchParams()
        params.append("infoId", this.infoId)
        params.append("userId", this.userId)
        let url = "http://localhost:8081/api/thumbs_up"
        axios.post(url, params)
      }
    },
    methods: {
      findComments(){
        let url = "http://localhost:8081/api/findComments?infoId="+this.comment.infoId
        axios.get(url).then(res=>{
          if (res.data.code===200){
            this.comments_data=res.data.data
            this.commentNum=this.comments_data.length
          }
        })
      },
      sendOut(){
        let url = "http://localhost:8081/api/sendOut"
        axios.post(url,JSON.stringify(this.comment),{
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res=>{
          if (res.data.code===200){
            this.$toast.center('评论成功！')
            this.topic_input=!this.topic_input
            this.findComments()
          }
        })
      },
      liked() {
        this.like = !this.like
      },
      RouterOne() {
        this.$router.go(-1);
      },
      Topic_Input() {
        let id=this.$store.state.id
        if (id > 0) {
          this.topic_input = !this.topic_input
        }else{
          this.dialog=true
        }
      },
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      enter () {
        this.dialog = false
        this.$router.push("/login")
      }
    }
  }
</script>
<style scoped lang="less">
  .mu-text-field-input{

  }
  .mu-text-field {
    margin-top: -.8em;
    margin-left: 5px;
    height: 20px;
    background-color: white;

  }

  .demo-paper {
    display: inline-block;
    height: 40px;
    width: 100%;
    text-align: center;
  }

  .Top-Class {
    background-color: #3d4955;
    position: fixed;
    top: 0;
    color: rgba(255, 255, 255, 0.9);
    z-index: 2;
  }

  .demo-badge-content {
    background-color: #ffab00;
    color: #ffffff;
    padding-left: 4px;
    padding-right: 4px;
  }

  .topic .text {
    position: absolute;
    bottom: 0;
  }

  .details_img {
    height: 0;
  }

  .text-decoration {
    background-color: #fff;
    margin-bottom: .5em;
  }

  .topic-bottom {
    background-color: #3D4955;
    height: 3.5em;
    display: flex;
    position: fixed;
    bottom: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    width: 100%;
    padding: 1em;
    color: #fff;
  }

  .topic-bottom .mu-icon-button {
    margin-top: -.5em;
  }


  /*上边距*/
  .seize-seat-top {
    margin-top: 55px;
  }
</style>
