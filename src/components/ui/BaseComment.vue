<template>
    <div>
      <!-- Debug data -->
      <!-- <pre style="color: white">{{ commentData }}</pre> -->
      <!-- Debug Data -->
        <div class="card">
            <p>{{ commentData.com }}</p>
            <hr>
            <div class="actions">
                <div>
                    <span @click.prevent="likeCom" class="action-btn" :class="{liked: isLiked}">
                      {{ commentData.likes }}
                      <font-awesome-icon icon="fa-solid fa-thumbs-up" />Like
                    </span>

                    <span @click.prevent="dislikeCom" class="action action-btn" :class="{disliked: isDisliked}">
                      {{ commentData.dislikes }}
                      <font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike
                    </span>
                </div>
                <div>
                    <span class="author">By {{ commentData.author }}</span>
                    <base-button @click="deleteComment" v-show="isComment">Delete</base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['commentData'],
    // Ovo ti je visak
    // emits: ['likeCom'],
    data() {
        return {
            isLiked: false,
            isDisliked: false,
            likesUpdate: null,
            dislikesUpdate: null,
            likesIdUpdate: [],
            dislikesIdUpdate: []
        }
    },
    computed: {
        isComment() {
            const commentData = this.commentData;
            const email = localStorage.getItem('email');
            if (commentData.author === email) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        async deleteComment() {
            const commentId = this.commentData.id;

            await axios.delete(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentId}.json`).then((responseData) => {
                console.log(responseData);
            });

            this.$emit('updateCom');
        },
        async likeCom() {
            const commentData = this.commentData;
            const id = commentData.id;

            if (this.isLiked === false && this.isDisliked === false) {
                this.dislikesUpdate = commentData.dislikes;
                this.likesUpdate = commentData.likes + 1;
            } else if (this.isLiked === false && this.isDisliked === true) {
                this.dislikesUpdate = commentData.dislikes - 1;
                this.likesUpdate = commentData.likes + 1;
                this.isDisliked = false;
            } else if (this.isLiked === true) {
                this.dislikesUpdate = commentData.dislikes;
                this.likesUpdate = commentData.likes - 1;
            }

            // Ovde sam ti dodao await da bi se posle toga izvrsio $emit
            // Takodje sam stavio da je patch a ne put
            // Put se koristi ako saljes sve podatke, a patch ako saljes parcijalno,
            // u ovom slucaju saljemo samo likes
            // Izmenio sam i objekat koji se salje u patch, stavio sam commentData.likes + 1, znaci hocemo uvjek da povecamo za 1.
            // Kada stvis comentData.likes++ vue ga renderuje interno, tj uradi update state, a necemo to.
            await axios.patch(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`, {
                // comment: commentData.com
                dislikes: this.dislikesUpdate,
                likes: this.likesUpdate,
                dislikesId: this.dislikesIdUpdate,
                likesId: this.likesIdUpdate
            });

            this.isLiked = !this.isLiked

            // Emitujemo da smo uradili patch pa da u komponenti iznad fetchujemo podatke opet

            this.$emit('updateCom');

        },
        async dislikeCom() {
            const commentData = this.commentData;
            const id = commentData.id;

            if (this.isDisliked === false && this.isLiked === false) {
                this.dislikesUpdate = commentData.dislikes + 1;
                this.likesUpdate = commentData.likes;
                console.log(1);
            } else if (this.isDisliked === false && this.isLiked === true) {
                this.dislikesUpdate = commentData.dislikes + 1;
                this.likesUpdate = commentData.likes - 1;
                this.isLiked = false;
                console.log(2);
            } else if (this.isDisliked === true) {
                this.dislikesUpdate = commentData.dislikes - 1;
                this.likesUpdate = commentData.likes;
                console.log(3);
            }

            await axios.patch(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`, {
                // comment: commentData.com,
                dislikes: this.dislikesUpdate,
                likes:  this.likesUpdate,
                dislikesId: this.dislikesIdUpdate,
                likesId: this.likesIdUpdate
            });

            this.isDisliked = !this.isDisliked;

            this.$emit('updateCom');
        }
    }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: white;
  margin-top: 2rem;
}

.actions {
    display: flex;
    justify-content: space-between;
}

.action {
    margin-left: 16px;
}

.action-btn {
    cursor: pointer;
}

.author {
    margin-right: 10px;
}
</style>