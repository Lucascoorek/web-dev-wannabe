<template>
  <v-row align="center" justify="center" class="text-center">
    <v-col cols="12" sm="6">
      <h1 class="font-weight-light">Login form</h1>
      <v-form ref="form" v-model="valid" class="mx-7" @submit.prevent="submit">
        <v-text-field
          v-model="email"
          class="mb-1 mt-6"
          label="Email"
          :rules="emailRules"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          class="mb-1"
          label="Password"
          :rules="passwordRules"
          type="password"
          :counter="counterOne"
          required
          outlined
        ></v-text-field>
        <v-btn
          :loading="buttonLoading"
          :disabled="!valid"
          type="submit"
          x-large
          block
          >Submit</v-btn
        >
      </v-form>
      <v-snackbar v-model="snackbar" color="error" top>
        {{ snackbarText }}
        <v-btn text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <div class="social">
        <p class="mt-4 title font-weight-light">Login with:</p>
        <div @click="githubLogin">
          <v-icon x-large>mdi-github</v-icon>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      counterOne: 0,
      buttonLoading: false,
      snackbar: false,
      snackbarText: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user.email,
    }),
  },
  created() {
    this.$store.commit("auth/setLoading", true);

    this.$fireAuth
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
        }
        // The signed-in user info.
        var user = result.user;
        this.$fireStore
          .collection("users")
          .doc(user.uid)
          .set({
            email: user.email,
          })
          .then(() => {
            this.$store.commit({
              type: "auth/addUser",
              email: user.email,
              uid: user.uid,
            });
          });

        this.$router.push({ name: "start" });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        if (errorCode === "auth/account-exists-with-different-credential") {
          this.snackbar = true;
          this.snackbarText = "An account already exists with the same email";
        }
        this.$store.commit("auth/setLoading", false);
      });
  },
  methods: {
    submit() {
      this.buttonLoading = true;
      this.$store
        .dispatch({
          type: "auth/loginUser",
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$refs.form.reset();
          this.buttonLoading = false;
          this.$router.push({ name: "start" });
        })
        .catch((err) => {
          this.$refs.form.reset();
          this.buttonLoading = false;
          this.snackbar = true;
          this.snackbarText = err;
        });
    },
    githubLogin() {
      const provider = new this.$fireAuthObj.GithubAuthProvider();
      this.$fireAuth.signInWithRedirect(provider);
    },
  },
};
</script>

<style scoped>
.social i {
  cursor: pointer;
}
.social i:hover,
.social i:focus {
  color: var(--v-primary-base);
}
</style>
