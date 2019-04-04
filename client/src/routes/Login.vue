<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-form ref="form" class="break-form" v-model="valid" lazy-validation>
      <div>
        <v-text-field v-model="name" :counter="20" label="Name" required></v-text-field>
        <div class="red--text left" v-if="err">{{err}}</div>
      </div>

      <v-btn class="mt" color="red" @click="login">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      name: "Login",
      username: "",
      err: ""
    };
  },
  methods: {
    login() {
      if (Math.random() > 0.5) {
        this.err = "";

        return true;
      }

      this.err = "Username already exists";
    }
  },
  name: "home",
  components: {}
};
</script>

<style scoped>
.login {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.left {
  text-align: left;
}

.mt {
  margin-top: 30px !important;
}

.break-form {
  margin: auto;
  width: 350px;
  display: flex;
  flex-direction: column;
}
</style>

