<template>
  <div>
    <mu-appbar title="发表文章" titleClass="titleClass">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="RouterOne"/>
    </mu-appbar>
    <mu-raised-button label="请文明发言，珍惜您的账号" fullWidth disabled></mu-raised-button>
    <mu-card class="top_class">
      <mu-radio v-for="item in Home_Label" :key="item.type" :label="item.name" :nativeValue="item.name"
                v-model="publish_data.type"/>
    </mu-card>
    <mu-card style="margin-bottom: 1em;padding: 1em;">
      <mu-text-field hintText="主题" :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="10"
                     fullWidth v-model="publish_data.introduction"/>
      <br/>
      <mu-text-field hintText="内容(请保证在100个字以内)" helpText="利用空格分段增加可读性" :errorText="multiLineInputErrorText"
                     @textOverflow="handleMultiLineOverflow" multiLine :rows="5" fullWidth :rowsMax="6"
                     :maxLength="100" v-model="publish_data.infoContent"/>
      <br/>
      <mu-select-field targetOrigin v-model="publish_data.labelId" :errorText="errorText" fullWidth :icon="LaBel_Icon">
        <mu-menu-item v-for="item in LaBel_Data" :key="item.icon" :value="item.name"
                      :title="item.name + '  |  ' + item.introduce" :leftIcon="item.icon"/>
      </mu-select-field>
    </mu-card>
    <mu-sub-header>切勿发布违规信息，否则后果自负！</mu-sub-header>
    <div class="center_class">
      <mu-raised-button label="验证" class="demo-raised-button" backgroundColor="#474a4f" fullWidth @click="temp"/>
      <br/><br/>
      <mu-raised-button label="立即发布" class="demo-raised-button" backgroundColor="#474a4f" fullWidth @click="publish"/>
      <br/><br/>
      <mu-raised-button label="取消" fullWidth @click="cancle"/>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        inputErrorText: '',
        multiLineInput: '',
        multiLineInputErrorText: '',
        game: '',
        LaBel_Data: '',
        LaBel_Icon: 'view_comfy',
        Home_Label: '',
        bottomSheet: false,
        list_icon: 'radio_button_unchecked',
        list_icon_color: '',
        publish_data: {
          userId: this.$store.state.id
        },
      }
    },
    computed: {
      errorText() {
        return this.game ? '' : '请选择标签,添加标签更容易被看到！'
      }
    },
    created() {
      axios.get('http://localhost:8081/api/homelabel')
        .then(res => {
          if (res.status === 200) {
            this.Home_Label = res.data.data;
            axios.get('http://localhost:8081/api/label')
              .then(res => {
                if (res.status === 200) {
                  this.LaBel_Data = res.data.data;
                }
              })
          }
        })
    },
    methods: {
      publish(){
        if (this.publish_data.userId>0){
          const url="http://localhost:8081/api/publish";
          const publishData=JSON.stringify(this.publish_data);
          axios.post(url,publishData,{
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res=>{
            let code=res.data.code;
            this.$toast.center('发布成功！');
            this.$router.go(-1)
          })
        } else {
          this.$toast.center('获取用户信息失败，请重新登录！');
          this.$router.push("login")
        }
      },
      cancle(){
        this.$router.go(-1)
      },
      temp() {
        console.log(JSON.stringify(this.publish_data));
      },
      handleInputOverflow(isOverflow) {
        this.inputErrorText = isOverflow ? '标题过长！' : ''
      },
      handleMultiLineOverflow(isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '内容字数超出！' : ''
      },
      label_Icon_data(key) {
        this.LaBel_Icon = key
      },
      closeBottomSheet() {
        this.bottomSheet = false
      },
      openBottomSheet() {
        this.bottomSheet = true
      },
      ListIcon() {
        this.list_icon = (this.list_icon === 'radio_button_unchecked' && 'radio_button_checked') || 'radio_button_unchecked';
        this.list_icon_color = (this.list_icon === 'radio_button_checked' && 'red') || '';
      },
      RouterOne() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped lang="less">
  .titleClass {
    text-align: center;
    font-size: 1em;
    margin-right: 15.2%;
  }

  .top_class {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 1em;
  }

  .center_class {
    margin-bottom: 1em;
    padding: 0 1em 0 1em;
  }
</style>
