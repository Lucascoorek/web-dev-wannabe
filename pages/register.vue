<template>
  <v-row align="center" justify="center" class="text-center">
    <v-col cols="12" sm="6">
      <h1 class="font-weight-light">Register form</h1>
      <v-form ref="form" v-model="valid" class="mx-7" @submit.prevent="submit">
        <v-text-field
          v-model="email"
          class="mb-1 mt-6"
          label="Email"
          :rules="emailRules"
          required
          outlined
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          class="mb-1"
          label="Password"
          :rules="passwordRulesOne"
          type="password"
          :counter="counterOne"
          required
          outlined
        >
        </v-text-field>
        <v-text-field
          v-model="passwordRepeat"
          class="mb-1"
          label="Repeat password"
          :rules="passwordRulesTwo"
          type="password"
          :counter="counterTwo"
          required
          outlined
        >
        </v-text-field>
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
        <v-btn text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
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
      passwordRulesOne: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password min lenght 6 characters",
      ],
      passwordRepeat: "",
      passwordRulesTwo: [
        (v) => !!v || "Repeat password",
        (v) => v === this.password || "Passwords not match",
      ],
      counterOne: 0,
      counterTwo: 0,
      buttonLoading: false,
      snackbar: false,
      snackbarText: "",
    };
  },
  methods: {
    submit() {
      this.buttonLoading = true;
      this.$store
        .dispatch({
          type: "auth/registerUser",
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$refs.form.reset();
          this.buttonLoading = false;
          this.$router.push({ name: "user" });
        })
        .catch((err) => {
          this.$refs.form.reset();
          this.buttonLoading = false;
          this.snackbar = true;
          this.snackbarText = err;
        });
    },
  },
};
</script>

<style></style>
