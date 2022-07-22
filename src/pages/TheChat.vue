<template>
    <div class="wrapper-big">
        <base-dialog :show="logOut" @close="logOut = false">
            <template v-slot:header>
                <p class="acc-details-title">Are you sure you want to log out?</p>
            </template>
            <template v-slot:actions>
                <base-button @click="logout">Yes</base-button>
                <base-button @click="logOut = false">Cancle</base-button>
            </template>
        </base-dialog>

        <div class="card user-card">
            <div class="wrapper">
                <h2>{{ userName }}</h2>
            </div>
            <div class="btn-wrapper">
                <base-button @click="home">Home</base-button>
                <base-button class="btn" @click="logoutBtn">Logout</base-button>
            </div>
        </div>

        <div class="comments-card">
            <div class="card comments-input">
                <textarea id="" cols="100" rows="5" v-model="comment"></textarea>
                <base-button class="comment-btn" @click="addComment">Add Comment</base-button>
            </div>
            <base-comment 
            v-for="commentData in commentsData" 
            :key="commentData.id" 
            :commentData="commentData"
            @updateCom="updateCom"
            ></base-comment>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  components: { BaseButton },
    data() {
        return {
            logOut: false,
            comment: '',
            commentsData: [],
            comIdLike: null
        }
    },
    computed: {
        userName() {
            return this.$store.state.email;
        }
    },
    methods: {
      // Shone
      updateCom() {
        this.renderComments()
      },
        async addComment() {
            if (this.comment === '') {
                return;
            }
            const author = this.$store.state.email;

            await axios.post(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments.json`, {
                comment: this.comment,
                likes: 0,
                dislikes: 0,
                author: author,
                likesId: ['likes'],
                dislikesId: ['dislikes']
            });

            this.comment = '';
            this.renderComments();
        },
        renderComments() {
            axios.get(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments.json`).then((responseData) => {
                const comments = [];
                for (const id in responseData.data) {
                    comments.unshift({
                        id: id, 
                        com: responseData.data[id].comment,
                        likes: responseData.data[id].likes,
                        dislikes: responseData.data[id].dislikes,
                        author: responseData.data[id].author,
                        likesId: responseData.data[id].likesId,
                        dislikesId: responseData.data[id].dislikesId
                    });
                }
                this.commentsData = comments;
            });
        },
        logoutBtn() {
            this.logOut = true;
        },
        logout() {
            this.$store.state.email = null;
            this.$store.state.token = null;
            this.$store.state.userId = null;
            this.$store.state.tokenExpiration = null;
            this.logOut = false;

            localStorage.clear('token');
            localStorage.clear('userId');
            localStorage.clear('email');

            this.$router.replace('/home');
        },
        home() {
            this.$router.push('/home');
        }
    },
    created() {
        this.renderComments();
        console.log(this.$store.state.email);
    }
}
</script>

<style scoped>
.comment-btn {
    height: 50px;
    width: 150px;
    margin-top: 15px !important;
}

.comments-input {
    display: flex;
    justify-content: space-between;
}

.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: white;
}

.user-card {
  max-width: 20rem;
  margin-left: 2rem;
  height: 130px !important;
}

.wrapper {
    display: flex;
    justify-content: center;
}

.btn-wrapper {
    text-align: center;
}

.img {
    border: solid 3px black;
    height: 130px;
    width: 130px;
    border-radius: 100px;
}

.acc-details-title {
    margin: 0px;
}

.wrapper-big {
    display: flex;
    justify-content: space-between;
}

.comments-card {
    width: 80%;
    margin-left: 2rem;
    margin-right: 2rem;
}

.btn {
    margin: 0.5rem;
}

.btn-link {
    color: white !important;
    text-decoration: none !important;
}
</style>