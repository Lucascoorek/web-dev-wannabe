<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-card-title>
            <span class="headline">Add comment</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="content"
                    :rules="contentRules"
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
  name: "AddCommentDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      buttonLoading: false,
      valid: false,
      content: "",
      contentRules: [(v) => !!v || "Some comment is required"],
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
      currentPost: (state) => state.posts.currentPost,
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
          .doc(this.currentPost.id)
          .collection("comments")
          .doc()
          .set({
            content: this.content,
            userEmail: this.user.email,
            date: this.$fireStoreObj.Timestamp.fromDate(new Date()),
          })

          .then((docRef) => {
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
