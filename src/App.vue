<template>
  <v-app>
    <v-navigation-drawer
      v-if="showDrawer"
      :mini-variant="mini"
      clipped
      app
    ></v-navigation-drawer>
    <v-toolbar clipped-left dark app color="primary">
      <v-toolbar-title>Spotivue</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <!-- <router-link to="/">Home</router-link> | -->
        <!-- <router-link to="/about">About</router-link> -->
        <router-view />
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    showDrawer: true,
    items: [],
    mini: true,
    right: null
  }),
  methods: {
    toggleDrawer() {
      if (this.showDrawer) {
        this.mini = !this.mini;
      } else {
        this.mini = false;
        this.showDrawer = !this.showDrawer;
      }
    }
  },
  created() {
    if (window.innerWidth < 1280) {
      this.showDrawer = false;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
