<template>
  <v-toolbar>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Break Point</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="">
      <!-- <v-btn flat @click="moveToDevices()">
        Devices
        <i class="fas fa-tablet-alt" style="margin-left: 5px; line-height: 10px;"></i>
      </v-btn> -->

      <v-btn flat @click="logout()">
        Logout
        <i class="fas fa-sign-out-alt" style="margin-left: 5px; line-height: 10px;"></i>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      hasToken: false
    };
  },

  created() {
    var self = this;
  },

  methods: {
    // moveToDevices() {
    //   this.$router.push({ path: `/pick` });
    // },
    logout() {
      localStorage.clear();
      this.hasToken = false;
      this.$router.push({ path: `/login` });
    }
  },
  components: {}
};
</script>

