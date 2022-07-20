<template>
    <div>
        <div class="card">
            <p>{{ commentData.com }}</p>
            <hr>
            <div class="actions">
                <div>
                    <span @click.prevent="likeCom" class="action-btn">{{ commentData.likes }} <font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like</span>
                    <span class="action action-btn">{{ commentData.dislikes }} <font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike</span>
                </div>
                <span>By BokiKing333</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['commentData'],
    emits: ['likeCom'],
    data() {
        return {
            isLiked: false,
            likesUpdate: null
        }
    },
    methods: {
        async likeCom() {
            const commentData = this.commentData;
            const id = commentData.id;

            if (this.isLiked === false) {
                this.likesUpdate = commentData.likes++;
            } else if (this.isLiked === true) {
                this.likesUpdate = commentData.likes--;
            }

            axios.put(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`, {
                comment: commentData.com,
                dislikes: commentData.dislikes,
                likes: this.likesUpdate
            });

            this.isLiked = !this.isLiked;
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
</style>