<template>
    <base-card class="wrapper">
        <div>
            <h1>Welcome to Our Page!</h1>
            <h2 v-if="!isAuth">Please Register <router-link to="/signup" class="link">Here</router-link></h2>
            <p>A Social Networking App or SNA (sometimes called a Social Networking Site) is an online platform which people use to 
            build social networks or social relationships with other people who share similar personal or career content, interests, 
            activities, backgrounds or real-life connections.</p>
        </div>
        <p>
            <router-link to="/chat" class="link" v-if="isAuth"><h2>Go to Chat</h2></router-link>
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

h2 {
    display: inline;
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