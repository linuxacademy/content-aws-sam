import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import { BootstrapVue } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

console.log("Importing auth-config.js")
import AuthConfig from "./auth-config"

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Amplify.configure({ Auth: AuthConfig });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
