<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" @submit.prevent="submit">
          <v-card-title>
            <span class="headline">Add post</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="title"
                    label="Post title"
                    hint="Add a meaningful title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea v-model="content" label="Post content">
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetForm">Cancel</v-btn>
            <v-btn type="submit" color="blue darken-1" text>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AddPostDialog",
  props: {
    value: Boolean,
  },
  data() {
    return {
      title: "",
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
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    submit() {
      console.log({ title: this.title, content: this.content });
      this.resetForm();
    },
  },
};
</script>

<style></style>
