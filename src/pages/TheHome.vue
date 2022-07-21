<template>
    <base-card class="wrapper">
        <h1>Welcome to Our Page!</h1>
        <p>A Social Networking App or SNA (sometimes called a Social Networking Site) is an online platform which people use to 
        build social networks or social relationships with other people who share similar personal or career content, interests, 
        activities, backgrounds or real-life connections.</p>
        <p>
            <router-link to="/chat" class="link" v-if="isAuth">Go to Chat</router-link>
            <router-link to="/signup" class="link" v-else>Register</router-link>
        </p>
    </base-card>
</template>

<script>
export default {
    computed: {
        isAuth() {
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>

<style scoped>
h1 {
    margin-top: 0px;
    color: black;
}

p {
    color: black;
}

span {
    text-decoration: underline;
    cursor: pointer;
    color: #aaa;
}

span:hover {
    color: white;
}

.link {
    color: #aaa;
}

.link:hover {
    color: black;
}

.wrapper {
    text-align: center;
}
</style>