<template>
  <div class="home">
  </div>
</template>

<script>

export default {
  name: "home",

  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ path: `/login` });

      return;
    }else{
      this.$router.push({ path: `/pick` });

    }
  },
  components: {
  }
};
</script>
