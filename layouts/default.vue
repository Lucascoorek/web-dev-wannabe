<template>
  <div>
    <v-app dark>
      <v-navigation-drawer v-model="drawer" fixed right app>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <div v-if="user">
            <v-list-item @click="logout">
              <v-list-item-action>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="'Logout'" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="item in notAuthItems"
              :key="item.title"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item
            v-for="item in authItems"
            v-else
            :key="item.title"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar fixed app>
        <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-app-bar>
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
      <v-footer fixed app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <v-spacer />
        <span>{{ title }}</span>
      </v-footer>
    </v-app>
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
  name: "Default",
  // async asyncData({ app }) {
  //   const user = await app.$$fireAuth.currentUser;
  //   return {
  //     user: user.email,
  //   };
  // },
  data() {
    return {
      user: null,
      dialog: true,
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Start",
          to: "/start",
        },
      ],
      authItems: [
        {
          icon: "mdi-account-plus",
          title: "Register",
          to: "/register",
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/login",
        },
      ],
      notAuthItems: [
        {
          icon: "mdi-chart-bubble",
          title: "User",
          to: "/user",
        },
      ],
      right: true,
      rightDrawer: false,
      title: "Web Dev Wananbe",
    };
  },

  computed: {
    ...mapState({
      // user: (state) => state.auth.user.email,
      loading: (state) => state.auth.user.loading,
    }),
  },
  created() {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // this.$store.commit({ type: "auth/addUser", email: user.email });
        this.user = user.email;
      }
    });
  },
  methods: {
    logout() {
      this.drawer = false;
      this.user = null;
      this.$store.dispatch("auth/removeUser").then(() => {
        this.$store.commit("users/removeUser");
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>
