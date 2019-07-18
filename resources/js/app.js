require("./bootstrap");

import Vue from "vue";
import router from "~/router";
import store from "~/store";

import moment from "moment";
import { Form, HasError, AlertError } from "vform";
import VueProgressBar from "vue-progressbar";
import swal from "sweetalert2";

window.swal = swal;
const toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;

Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    height: "2px"
});

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

// let routes = [
//     { path: '/dashboard', component: require('./components/Dashboard.vue') },
//     { path: '/developer', component: require('./components/Developer.vue') },
//     { path: '/users', component: require('./components/Users.vue') },
//     { path: '/profile', component: require('./components/Profile.vue') }
//   ]

// const router = new VueRouter({
//     mode: 'history',
//     routes // short for `routes: routes`
// })
Vue.filter("upText", text => text.charAt(0).toUpperCase() + text.slice(1));
Vue.filter("humanData", created => moment(created).format("MMMM Do YYYY"));

window.Fire = new Vue();
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Vue.component('example-component', require('~/components/ExampleComponent.vue'));

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    store,
    router
});
