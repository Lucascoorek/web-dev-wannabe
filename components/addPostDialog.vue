<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-card-title>
            <span class="headline">Add post</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="Post title"
                    hint="Add a meaningful title"
                    :rules="titleRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="content"
                    :rules="titleRules"
                    label="Post content"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetForm">Cancel</v-btn>
            <v-btn
              type="submit"
              :loading="buttonLoading"
              :disabled="!valid"
              color="blue darken-1"
              text
              >Save</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddPostDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      buttonLoading: false,
      valid: false,
      title: "",
      titleRules: [(v) => !!v || "Tile is required"],
      content: "",
    };
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    ...mapState({
      user: (state) => state.auth.user,
      // posts: (state) => state.posts.posts,
      // loading: (state) => state.posts.loading,
    }),
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    submit() {
      if (this.user.uid) {
        this.buttonLoading = true;
        this.$fireStore
          .collection("posts")
          .add({
            title: this.title.trim(),
            content: this.content.trim(),
            date: this.$fireStoreObj.Timestamp.fromDate(new Date()),
            userId: this.user.uid,
            userEmail: this.user.email,
          })
          .then((docRef) => {
            // console.log(docRef.id);
            this.buttonLoading = false;
            this.resetForm();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style></style>
