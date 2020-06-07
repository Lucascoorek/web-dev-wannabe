<template>
  <v-row align="center" justify="center" class="text-center">
    <v-col cols="12">
      <h1 class="display-2 font-weight-light primary--text text--darken-1 mb-7">
        Web Dev Wannabe
      </h1>
      <p class="headline font-weight-light secondary--text mb-7">
        A social platform for newcomers to help each other get into web dev
        industry
      </p>
      <v-btn color="accent" nuxt to="/user">Enter app</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "landing",
  components: {},
};
</script>
<style scoped>
.headline {
  word-break: normal;
}
</style>
