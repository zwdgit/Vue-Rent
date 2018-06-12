<template>
  <div>
    <mu-appbar title="个人资料" title-class="modify_titleClass" style="background-color: #3d4955">
      <mu-icon-button icon="close" slot="left" @click="back" />
    </mu-appbar>

    <mu-sub-header>基本资料</mu-sub-header>
    <mu-text-field class="FyData-TopInput" label="昵称" icon="contacts" labelFloat :value="modify_data.nickName" v-model="modify_data.nickName"/>
    <mu-text-field class="FyData-TopInput" label="微信" icon="comment" labelFloat :value="modify_data.weChat" v-model="modify_data.weChat"/>
    <mu-sub-header>详细资料</mu-sub-header>
    <!--选择性别-->
    <mu-list-item :title="modify_data.sex" v-model="modify_data.sex" style="border-bottom: 1px solid #eeeeee;" class="FyData-TopInput"
                  @click="opengenderSheet">
      <mu-icon value="chevron_right" slot="right"/>
      <mu-icon value="wc" slot="left"/>
    </mu-list-item>
    <!--选择地区-->
    <mu-list-item :title="modify_data.region" v-model="modify_data.region" class="FyData-TopInput" @click="openregion">
      <mu-icon value="chevron_right" slot="right"/>
      <mu-icon value="location_on" slot="left"/>
    </mu-list-item>

    <mu-sub-header>实名认证(认证成功后不可修改)</mu-sub-header>
    <mu-text-field class="FyData-TopInput" hintText="真实姓名" icon="assignment_ind" :value="modify_data.realName" v-model="modify_data.realName" :disabled="modify_data.state===1"/>
    <mu-text-field class="FyData-TopInput" hintText="身份证号" icon="sort" :value="modify_data.idNum" v-model="modify_data.idNum" :disabled="modify_data.state===1"/>
    <mu-sub-header>想找什么(可在发现 - 寻找Ta中展示)</mu-sub-header>
    <div class="label_radio"  v-model="modify_data.direction">
      <mu-radio label="室友" name="group" nativeValue="室友" v-model="modify_data.direction"/>
      <mu-radio label="交友" name="group" nativeValue="交友" v-model="modify_data.direction"/>
    </div>
    <mu-sub-header>个性签名</mu-sub-header>
    <mu-text-field class="signature-input" hintText="让别人快速了解你..." :errorText="multiLineInputErrorText"
                   @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100" :value="modify_data.introduction" v-model="modify_data.introduction"/>
    <mu-bottom-sheet :open="genderSheet" @close="closegenderSheet">
      <mu-list @itemClick="closegenderSheet">
        <mu-list-item title="男" @click="GenDerSheet('男')"/>
        <mu-list-item title="女" @click="GenDerSheet('女')"/>
      </mu-list>
    </mu-bottom-sheet>

    <mu-popup position="bottom" popupClass="modifydata-popup-bottom" :open="bottomPopup" @close="closeregion">
      <mu-row gutter class="Bottom-region-button">
        <mu-col width="33" tablet="50" desktop="50">
          <mu-raised-button label="取消" class="demo-raised-button" @click="closeregion" primary fullWidth/>
        </mu-col>
        <mu-col width="33" tablet="50" desktop="50">
          <mu-raised-button label="确定" class="demo-raised-button"
                            backgroundColor="rgb(244, 67, 54)" fullWidth @click="myConfirm"/>
        </mu-col>
      </mu-row>
      <mu-content-block>
        <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
      </mu-content-block>
    </mu-popup>
    <mu-raised-button label="保存" class="BlackList-Btn" style="margin-top: 2em;" backgroundColor="rgb(244, 67, 54)"
                      to="/user" fullWidth @click="saveUserInfo"/>
    <mu-raised-button label="返回个人中心" class="BlackList-Btn" to="/user" primary fullWidth/>
  </div>
</template>
<script>
  import city from './city'
  const address=city.data().address;
  export default {
    data() {
      return {
        value: '1',
        gender: '请选择性别',
        genderSheet: false,
        regionLabel: '请选择地区',
        bottomSheet: false,
        bottomPopup: false,
        input: '',
        inputErrorText: '',
        multiLineInput: '',
        multiLineInputErrorText: '',
        addressSlots: [
          {
            width: '100%',
            textAlign: 'center',
            values: Object.keys(address)
          }, {
            width: '100%',
            textAlign: 'center',
            values: ['北京']
          }
        ],
        address:['北京', '北京'],
        addressProvince: '北京',
        addressCity: '北京',
      }
    },
    created() {
      this.modify_data=JSON.parse(sessionStorage.getItem("User_Data"));
    },
    methods: {
      addressChange (value, index) {
        switch (index) {
          case 0:
            this.addressProvince = value
            const arr = address[value]
            this.addressSlots[1].values = arr
            this.addressCity = arr[0]
            break
          case 1:
            this.addressCity = value
            break
        }
        this.address = [this.addressProvince, this.addressCity]
      },
      back() {
        this.$router.push('/user')
      },

      closegenderSheet() {
        this.genderSheet = !this.genderSheet
      },
      handleChange(value) {
        this.value = value
      },

      opengenderSheet() {
        this.genderSheet = true
      },
      GenDerSheet(gender) {
        this.modify_data.sex = gender;
      },
      myConfirm(){
        this.modify_data.region=this.addressProvince+" " +this.addressCity;
        this.bottomPopup = false;
      },
      openregion() {
        this.bottomPopup = true
      },
      closeregion() {
        this.bottomPopup = false
      },
      handleMultiLineOverflow(isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '超过了！！！！' : ''
      },
      saveUserInfo(){
        const url="http://localhost:8081/api/save";
        const userInfo=JSON.stringify(this.modify_data);
        axios.post(url, userInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(
          sessionStorage.setItem("User_Data",JSON.stringify(this.modify_data))
        );
      }
    }
  }

</script>
<style scoped lang="less">
  .mu-text-field-input {
    color: #000;
  }

  .modifydata-popup-bottom {
    width: 100%;
  }

  .modify_titleClass {
    background-color: #3d4955;
    font-size: 17px;
  }
  .my-top {
    position: fixed;
    top: 0;
    font-size: small;
  }

  .label_radio {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #fff;
  }

  .FyData-TopInput {
    margin: 0;
    width: 100%;
    background-color: #fff;
  }

  .BlackList-Btn {
    margin-top: 1em;
    width: 96%;
    margin-left: 2%;
  }

  .Bottom-region-button {
    padding: 0.5em;
    border-bottom: 1px solid #eeeeee;
  }

  .signature-input {
    background-color: #fff;
    width: 100%;
    padding: 1em;
  }

  .seize-seat-top {
    height: 56px;
  }
</style>
