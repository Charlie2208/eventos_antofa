import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from "vue2-google-maps";
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_KEY,
  },
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
