import Vue from 'vue'
import App from './App.vue'

import EncounterAPIServices from "./services/EncounterServices";

Vue.prototype.$encounter_api=EncounterAPIServices

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
