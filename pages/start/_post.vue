<template>
  <div class="single-post">
    <div class="mb-2" @click="$router.push({ name: 'start' })">
      <v-btn icon color="secondary">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </div>
    <div v-if="currentPost">
      <v-card>
        <div class="d-flex justify-space-between">
          <v-card-subtitle
            class="primary--text"
            v-text="currentPost.userEmail"
          ></v-card-subtitle>
          <v-card-subtitle
            class="secondary--text"
            v-text="
              currentPost.date.dateToJs + ' ' + currentPost.date.dateToTime
            "
          >
          </v-card-subtitle>
        </div>
        <v-card-title
          class="text-center text-h5"
          v-text="currentPost.title"
        ></v-card-title>
        <v-card-text v-text="currentPost.content"></v-card-text>
      </v-card>
    </div>
    <div v-if="user && user.email" class="mt-5 d-flex justify-center">
      <v-btn color="primary" @click.stop="showAddCommentModal = true">
        Add a comment
      </v-btn>
    </div>
    <AddCommentDialog v-model="showAddCommentModal" />
    <div>
      <h3 class="font-weight-light text-center my-5">Comments</h3>
      <v-divider></v-divider>
      <div v-if="currentPost.comments.length">
        <v-card
          v-for="(comment, index) in currentPost.comments"
          :key="comment.id"
          class="mb-3"
        >
          <div class="d-flex justify-space-between">
            <v-card-subtitle
              class="primary--text"
              v-text="comment.userEmail"
            ></v-card-subtitle>

            <v-card-subtitle
              class="secondary--text"
              v-text="comment.date.dateToJs + ' ' + comment.date.dateToTime"
            >
            </v-card-subtitle>
          </div>

          <v-card-subtitle v-text="comment.content"></v-card-subtitle>
          <v-divider
            v-if="index + 1 < currentPost.comments.length"
            :key="index"
          ></v-divider>
        </v-card>
      </div>
      <div v-else><p>No comments on this post yet...</p></div>
    </div>
  </div>
</template>

<script>
import AddCommentDialog from "@/components/addCommentDialog";
export default {
  components: {
    AddCommentDialog,
  },
  // middleware: "router-auth",
  // asyncData() {
  //   return {
  //     user: {
  //       email: null,
  //     },
  //   };
  // },
  data() {
    return {
      showAddCommentModal: false,
      unsubscribe: null,
    };
  },
  computed: {
    currentPost() {
      return this.$store.state.posts.currentPost;
    },
    user() {
      return this.$store.state.users.user;
    },
  },
  created() {
    const postRef = this.$fireStore
      .collection("posts")
      .doc(this.$route.params.post);

    postRef
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

    postRef.collection("comments").onSnapshot(
      (querySnapshot) => {
        const comments = [];

        querySnapshot.forEach((doc) => {
          const { content, date, userEmail } = doc.data();
          const dateToJs = new Date(date.toDate()).toISOString().split("T")[0];
          const dateToTime = new Date(date.toDate())
            .toISOString()
            .split("T")[1]
            .split(".")[0];
          comments.push({
            id: doc.id,
            content,
            date: { dateToJs, dateToTime },
            userEmail,
          });
        });

        this.loading = false;
        this.$store.commit({
          type: "posts/addComments",
          comments,
        });
      },
      (err) => {
        if (this.unsubscribe) this.unsubscribe();
      }
    );

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

<style scoped>
.single-post {
  max-width: 600px;
  margin: 0 auto;
}
</style>
