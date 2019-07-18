import Dashboard from "~/components/Dashboard.vue";
import Developer from "~/components/Developer.vue";
import Users from "~/components/Users.vue";
import Profile from "~/components/Profile.vue";

export default [
    { path: "/admin", component: Dashboard },
    { path: "/admin/developer", component: Developer },
    { path: "/admin/users", component: Users },
    { path: "/admin/profile", component: Profile }
];
