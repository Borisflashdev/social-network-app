<template>
    <div class="wrapper-big">
        <base-dialog :show="editAcc" @close="editAcc = false">
            <template v-slot:header>
                <p class="acc-details-title">Account Details</p>
            </template>
        </base-dialog>

        <div class="card user-card">
            <div class="wrapper">
                <h2>BokiKing333</h2>
            </div>
            <div class="btn-wrapper">
                <base-button class="delete-btn btn">Delete Account</base-button>
                <base-button class="btn" @click="editAcc = true">Edit Account</base-button><br>
                <base-button class="btn">Logout</base-button>
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
            @likeCom="likeCom"
            ></base-comment>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            editAcc: false,
            comment: '',
            commentsData: [],
            comIdLike: null
        }
    },
    methods: {
      // Shone
      likeCom() {
        this.renderComments()
      },
        async addComment() {
            if (this.comment === '') {
                return;
            }
            // const author = this.$store.state.userName;

            await axios.post(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments.json`, {
                comment: this.comment,
                likes: 0,
                dislikes: 0
                // author: author,
            });

            this.comment = '';
            this.renderComments();
        },
        renderComments() {
            axios.get(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments.json`).then((responseData) => {
                const comments = [];
                for (const id in responseData.data) {
                    comments.push({
                        id: id, 
                        com: responseData.data[id].comment,
                        likes: responseData.data[id].likes,
                        dislikes: responseData.data[id].dislikes
                    });
                }
                this.commentsData = comments;
            });
        }
    },
    created() {
        this.renderComments();
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
  height: 180px !important;
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

.delete-btn {
    background-color: #d9534f !important;
}

.delete-btn:hover,
.delete-btn:focus {
  background-color: red !important;
  box-shadow:0 0 8px 0 red !important;
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
</style>