<template>
    <div>
      <!-- Debug data -->
      <pre style="color: white">{{ commentData }}</pre>
      <!-- Debug Data -->
        <div class="card">
            <p>{{ commentData.com }}</p>
            <hr>
            <div class="actions">
                <div>
                    <span @click.prevent="likeCom" class="action-btn">
                      {{ commentData.likes }}
                      <font-awesome-icon icon="fa-solid fa-thumbs-up" />Like
                    </span>

                    <span class="action action-btn">
                      {{ commentData.dislikes }}
                      <font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike
                    </span>
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
    // Ovo ti je visak
    // emits: ['likeCom'],
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

            // if (this.isLiked === false) {
            //     this.likesUpdate = commentData.likes++;
            // } else if (this.isLiked === true) {
            //     this.likesUpdate = commentData.likes--;
            // }

            // Ovde sam ti dodao await da bi se posle toga izvrsio $emit
            // Takodje sam stavio da je patch a ne put
            // Put se koristi ako saljes sve podatke, a patch ako saljes parcijalno,
            // u ovom slucaju saljemo samo likes
            // Izmenio sam i objekat koji se salje u patch, stavio sam commentData.likes + 1, znaci hocemo uvjek da povecamo za 1.
            // Kada stvis comentData.likes++ vue ga renderuje interno, tj uradi update state, a necemo to.
            await axios.patch(`https://social-network-app-e1fd3-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`, {
                // comment: commentData.com,
                likes: commentData.likes + 1
            });

            // Emitujemo da smo uradili patch pa da u komponenti iznad fetchujemo podatke opet
            this.$emit('likeCom')

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