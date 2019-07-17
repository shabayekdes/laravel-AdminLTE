<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <passport-clients></passport-clients>
                <passport-authorized-clients></passport-authorized-clients>
                <passport-personal-access-tokens></passport-personal-access-tokens>
            </div>
        </div>
    </div>
</template>

<script>
    import Clients from "./passport/Clients.vue"
    import AuthorizedClients from "./passport/AuthorizedClients.vue"
    import PersonalAccessTokens from "./passport/PersonalAccessTokens.vue"
    export default {
        components:{
            "passport-clients":Clients,
            "passport-authorized-clients":AuthorizedClients,
            "passport-personal-access-tokens":PersonalAccessTokens
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
