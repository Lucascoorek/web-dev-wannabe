<template>
  <div>
    <div v-if="post">
      <v-card>
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ post.userEmail }}</v-card-subtitle>
        <v-card-text>{{ post.content }}</v-card-text>
        <div class="primary--text">
          <v-card-text>
            <p>{{ post.date.dateToJs }} {{ post.date.dateToTime }}</p>
          </v-card-text>
        </div>
      </v-card>
    </div>
    <div v-if="user && user.email">
      <v-card class="mt-3">
        <v-card-actions>
          <v-btn text color="primary">
            Add a comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: "router-auth",
  // asyncData() {
  //   return {
  //     user: {
  //       email: null,
  //     },
  //   };
  // },
  // data() {
  //   return {
  //     user: {
  //       email: null,
  //     },
  //   };
  // },
  computed: {
    post() {
      return this.$store.state.posts.currentPost;
    },
    user() {
      return this.$store.state.users.user;
    },
  },
  created() {
    this.$fireStore
      .collection("posts")
      .doc(this.$route.params.post)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { title, content, date, userId, userEmail } = doc.data();
          const dateToJs = new Date(date.toDate()).toISOString().split("T")[0];
          const dateToTime = new Date(date.toDate())
            .toISOString()
            .split("T")[1]
            .split(".")[0];
          this.$store.commit("posts/addPost", {
            id: doc.id,
            title,
            content,
            date: { dateToJs, dateToTime },
            userId,
            userEmail,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // this.user = user;
        this.$fireStore
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.$store.commit("users/addUser", doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      }
    });
  },
};
</script>

<style></style>
