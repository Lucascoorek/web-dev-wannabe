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
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          class="mb-1"
          label="Password"
          type="password"
          :counter="counterOne"
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
      counterOne: 0,
      buttonLoading: false,
    };
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
          this.$router.push({ name: "user" });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
