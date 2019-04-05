<template>
  <div id="app">
    <Navbar />
    <router-view v-on:login="login(hasLogin)"/>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  },

  methods: {
    login(bool){
      console.log(bool);
    }
  }
};
</script>
