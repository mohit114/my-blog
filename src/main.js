// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store/store'
import firebase from 'firebase'
import tinymce from 'vue-tinymce-editor'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
Vue.component('tinymce', tinymce)

Vue.use(Vuetify)
Vue.use(Loading)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false
let app;
let config = {
  apiKey: "AIzaSyC_uuwkyfuOsMCQFCBU_zLJqCXYHcWHjWE",
  authDomain: "testproject-199612.firebaseapp.com",
  databaseURL: "https://testproject-199612.firebaseio.com",
  projectId: "testproject-199612",
  storageBucket: "gs://testproject-199612.appspot.com",
  messagingSenderId: "389254633516"
};
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('getBlogs');
    this.$store.dispatch('getNotifications');
  }
})


/* eslint-disable no-new */

