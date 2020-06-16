<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="title"
                    label="Add your position"
                    hint="Wannabe/Junior/Regular/Senior?"
                    :rules="titleRules"
                    required
                  ></v-text-field>
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
      titleRules: [(v) => !!v || "Position is required"],
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
          .collection("users")
          .doc(this.user.uid)
          .set(
            {
              position: this.title,
            },
            { merge: true }
          )
          .then(() => {
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
