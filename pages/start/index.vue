<template>
  <div class="d-flex flex-column justify-center align-center">
    <h1 class="display-2 font-weight-light">Start</h1>
    <div v-if="user">
      <p>{{ user }}</p>
      <v-card max-width="500" class="mx-auto">
        <v-toolbar color="pink" dark>
          <v-toolbar-title>Posts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <v-list-item-group multiple active-class="pink--text">
            <template v-for="(item, index) in posts">
              <v-list-item
                :key="item.id"
                :to="{
                  name: 'start-post',
                  params: { post: item.title.replace(/ /gi, '-'), id: item.id },
                }"
                router
                exact
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="item.title"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-text="item.title"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="item.date"
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
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  fetch() {
    if (this.user) {
      this.$store.commit("posts/setLoading", true);
      this.$fireStore
        .collection("posts")
        .get()
        .then((querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((doc) => {
            const { title, content, date } = doc.data();
            const dateToJs = new Date(date.toDate())
              .toISOString()
              .split("T")[0];
            posts.push({ id: doc.id, title, content, date: dateToJs });
          });
          this.$store.commit({
            type: "posts/addPosts",
            posts,
          });
        });
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user.email,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
    }),
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
};
</script>
<style scoped></style>
