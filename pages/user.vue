<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1 class="display-2 font-weight-light">User</h1>
    <div v-if="user" class="text-center">
      <h1 class="font-weight-light">{{ user.email }}</h1>
      <p>Your positon: {{ position }}</p>
      <v-btn icon @click.stop="showUsernameModal = true">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
      <AddUsernameDialog v-model="showUsernameModal" />
    </div>
  </div>
</template>
<script>
import AddUsernameDialog from "@/components/addUsernameDialog";
export default {
  // middleware: "router-auth",
  components: {
    AddUsernameDialog,
  },
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
  data() {
    return {
      showUsernameModal: false,
      unsubscribe: null,
      updatedPosition: null,
    };
  },
  computed: {
    position() {
      return this.$store.state.auth.user.position;
    },
  },

  created() {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.unsubscribe = this.$fireStore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              if (doc.data() && doc.data().position) {
                this.$store.commit("auth/addUserPosition", doc.data().position);
                // this.user.position = doc.data().position;
              }
            },
            (err) => {
              if (this.unsubscribe) this.unsubscribe();
            }
          );
      }
    });
  },
};
</script>
<style scoped></style>
