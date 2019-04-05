<template>
  <div class="login">
    <img alt="Vue logo" width="250px" src="../assets/logo.png">
    <v-form ref="form" class="break-form" lazy-validation>
      <div>
        <v-text-field
          v-model="email"
          :counter="20"
          label="Email"
          placeholder="Your cool email!"
          required
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          type="password"
          v-model="password"
          :counter="20"
          label="Password"
          placeholder="Your **** password!"
          required
        ></v-text-field>
        <div class="red--text left" v-if="err">{{err}}</div>
      </div>
      <v-btn
        :disabled="!email || !password"
        class="mt login-button"
        color="red"
        @click="login"
      >Login</v-btn>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { loginUser } from "@/apis/auth.js";

export default {
  data() {
    return {
      name: "Login",
      email: "",
      password: "",
      err: ""
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    if (token) {
      if (this.$route.query.deviceId) {
        this.$router.push({
          path: `/play?pointId=${this.$route.query.deviceId}`
        });

        return;
      }
      
      this.$router.push({ path: `/pick` });
    }
  },
  methods: {
    async login() {
      const user = { email: this.email, password: this.password };

      var response = await loginUser(user);

      if (!response.token) {
        this.err = response.msg;
      } else {
        this.$emit("login", true);

        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user.id);
        localStorage.setItem("email", response.user.email);
        localStorage.setItem("user_name", response.user.name);

        this.$socket.emit("register", { email: response.user.email });

        if (this.$route.query.deviceId) {
          this.$router.push({
            path: `/play?pointId=${this.$route.query.deviceId}`
          });

          return;
        }
        this.$router.push({ path: `/pick` });
      }
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

.login-button {
  width: 50%;
  margin: auto;
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

