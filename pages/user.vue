<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1 class="display-2 font-weight-light">User</h1>
    <p v-if="user">{{ user }}</p>
  </div>
</template>
<script>
export default {
  middleware: "router-auth",
  // async asyncData({ app }) {
  //   const user = await app.$$fireAuth.currentUser;
  //   return {
  //     user: user.email,
  //   };
  // },

  asyncData() {
    return {
      user: null,
    };
  },
  // computed: {
  //   user() {
  //     return this.$store.state.auth.user.email;
  //   },
  // },

  created() {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // this.$store.commit({ type: "auth/addUser", email: user.email });
        this.user = user.email;
      }
    });
  },
};
</script>
<style scoped></style>
