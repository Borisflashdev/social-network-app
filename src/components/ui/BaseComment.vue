<template>
    <div>
        <div class="card">
            <p>{{ commentData.com }}</p>
            <hr>
            <div class="actions">
                <div>
                    <span><font-awesome-icon icon="fa-solid fa-thumbs-up" /> Like</span>
                    <span class="action"><font-awesome-icon icon="fa-solid fa-thumbs-down" /> Dislike</span>
                </div>
                <span>By BokiKing333</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['commentData'],
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
</style>