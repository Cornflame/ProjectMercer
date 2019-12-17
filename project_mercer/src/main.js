import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'

import EncounterAPIService from "./services/EncounterServices"

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$encounter_api=EncounterAPIService

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
