import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UserPhone: '',
        id:'',
    },
    mutations: {
        LoginPhone (state, phone) {
            state.UserPhone = phone;
            sessionStorage.setItem('userphone', JSON.stringify(state.UserPhone))
        },
        SetId(state,id){
          state.id=id;
          sessionStorage.setItem('id',JSON.stringify(state.id))
        }
    },
})
