// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'




// base/global options
// these options can be overridden 
// by the options in the .open(options) 
// function.






Vue.config.productionTip = false
Vue.use(Vuetify)

sync(store,router)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
 store,
  template: '<App/>',
  components: { App,
    
   }
})
