<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      right
      app
    >
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-auto-fix</v-icon></v-btn
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <span>{{ title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Default",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Web Dev Wananbe",
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user.email;
    },
  },
  methods: {
    logout() {
      this.drawer = false;
      this.$store.dispatch("auth/removeUser").then(() => {
        this.$router.push({ name: "start" });
      });
    },
  },
};
</script>
