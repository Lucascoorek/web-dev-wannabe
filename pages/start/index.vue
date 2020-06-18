<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1 class="display-2 font-weight-light">Start</h1>
    <div>
      <p v-if="user.email">{{ user.email }}</p>
      <v-card max-width="500" class="mx-auto">
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Posts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="user.email" icon @click.stop="showAddPostModal = true">
            <v-icon>mdi-email-plus</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <v-list-item-group multiple active-class="pink--text">
            <template v-for="(post, index) in posts">
              <v-list-item
                :key="post.id"
                :to="{
                  name: 'start-post',
                  params: {
                    post: post.id,
                  },
                }"
                router
                exact
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title
                      class="primary--text"
                      v-text="post.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="post.content.slice(0, 10) + '...'"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="secondary--text"
                      v-text="post.userEmail"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="post.date"
                    ></v-list-item-action-text>
                    <v-icon v-if="!active" color="grey lighten-1"
                      >mdi-star-circle-outline</v-icon
                    >

                    <v-icon v-else color="yellow">mdi-star-circle</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index + 1 < posts.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <AddPostDialog v-model="showAddPostModal" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import AddPostDialog from "@/components/addPostDialog";

export default {
  components: {
    AddPostDialog,
  },
  asyncData() {
    return {
      // posts: [],
      // user: {
      //   email: null,
      // },
      loading: false,
    };
  },

  data() {
    return {
      showAddPostModal: false,
      unsubscribe: null,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.users.user,
      posts: (state) => state.posts.posts,
      // loading: (state) => state.posts.loading,
    }),
  },

  created() {
    this.loading = true;
    this.unsubscribe = this.$fireStore.collection("posts").onSnapshot(
      (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          const { title, content, date, userId, userEmail } = doc.data();
          // this.$fireStore.collection("").
          const dateToJs = new Date(date.toDate()).toISOString().split("T")[0];
          posts.push({
            id: doc.id,
            title,
            content,
            date: dateToJs,
            userId,
            userEmail,
          });
        });

        // this.posts = posts;
        this.loading = false;
        this.$store.commit({
          type: "posts/addPosts",
          posts,
        });
      },
      (err) => {
        if (this.unsubscribe) this.unsubscribe();
      }
    );

    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // this.user = user;
        // this.$store.commit({ type: "auth/addUser", email: user.email });
        // this.$store.commit("posts/setLoading", true);
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
<style scoped></style>
