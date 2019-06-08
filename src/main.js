import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import VCharts from 'v-charts';
import iEditor from 'iview-editor';
import 'iview/dist/styles/iview.css';
import 'iview-editor/dist/iview-editor.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import vueQuillEditor from 'vue-quill-editor'
import './registerServiceWorker'
import bus from './lib'
import PubSub from 'pubsub.js'
import axios from 'axios'
Vue.use(vueQuillEditor);
Vue.prototype.$ajax = axios;
Vue.prototype.$BUS = bus;
Vue.prototype.$SUB = PubSub;
// Vue.prototype = {
//   $ajax:axios,
//   $BUS:bus,
//   $SUB:PubSub,
// };
Vue.use(iView);
Vue.use(VCharts);
Vue.use(iEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
