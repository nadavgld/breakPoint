<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Break Point</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      hasToken: false
    }
  },

  created() {
    var self = this;

  },

  methods: {
    logout() {
      localStorage.clear();
      this.hasToken = false;
      this.$router.push({ path: `/login` });
    },
  },
  components: {}
};
</script>

