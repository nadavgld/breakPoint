<template>
  <div>{{$route.query.pointId}}</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      minHour: 7,
      maxHour: 23,
      intervalTime: .5
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    if (token) {
      this.$router.push({ path: `/pick` });
    }
  }
};
</script>

<style>
body,
html,
#app,
#dayspan {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100%;
}
</style>