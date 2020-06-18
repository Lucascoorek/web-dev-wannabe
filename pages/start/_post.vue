<template>
  <div>
    <div v-if="currentPost">
      <v-card>
        <v-card-title>{{ currentPost.title }}</v-card-title>
        <v-card-subtitle>{{ currentPost.userEmail }}</v-card-subtitle>
        <v-card-text>{{ currentPost.content }}</v-card-text>
        <div class="primary--text">
          <v-card-text>
            <p>
              {{ currentPost.date.dateToJs }} {{ currentPost.date.dateToTime }}
            </p>
          </v-card-text>
        </div>
      </v-card>
    </div>
    <div v-if="user && user.email">
      <v-card class="mt-3">
        <v-card-actions>
          <v-btn text color="primary" @click.stop="showAddCommentModal = true">
            Add a comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <AddCommentDialog v-model="showAddCommentModal" />
    <div>
      <p v-for="comment in currentPost.comments" :key="comment.id">
        {{ comment.content }} <span>{{ comment.userEmail }}</span>
      </p>
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

<style></style>
