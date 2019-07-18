import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "~/components/Dashboard.vue";
import Developer from "~/components/Developer.vue";
import Users from "~/components/Users.vue";
import Profile from "~/components/Profile.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/admin", component: Dashboard },
    { path: "/admin/developer", component: Developer },
    { path: "/admin/users", component: Users },
    { path: "/admin/profile", component: Profile }
];

export default new VueRouter({
    mode: "history",
    routes // short for `routes: routes`
});
