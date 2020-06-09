<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1 class="display-2 font-weight-light">Start</h1>
    <p v-if="user">{{ user }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user.email;
    },
  },
  created() {
    if (this.user) {
      this.$fireStore
        .collection("posts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id);
            const data = doc.data();
            console.log(data);
          });
        });
    }
  },
};
</script>
<style scoped></style>
