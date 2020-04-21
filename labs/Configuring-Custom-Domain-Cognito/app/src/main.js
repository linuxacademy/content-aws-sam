import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import { BootstrapVue } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: '',
    userPoolWebClientId: '',
    oauth: {
      domain: '',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://www.',
      redirectSignOut: 'https://www.',
      responseType: 'code'
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
