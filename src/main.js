import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import firebase from "firebase";

Vue.use(Vuetify);

Vue.config.productionTip = false;

//Firebase setup
var firebaseConfig = {
  apiKey: "AIzaSyBqJ1n35jijJkBDo2iRQ5rJlYu7tSkCW98",
  authDomain: "image-upload-9a257.firebaseapp.com",
  databaseURL: "https://image-upload-9a257.firebaseio.com",
  projectId: "image-upload-9a257",
  storageBucket: "image-upload-9a257.appspot.com",
  messagingSenderId: "602998381201",
  appId: "1:602998381201:web:695a2af6becf7fea31bd30",
  measurementId: "G-22C0PFKNG7"



};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
