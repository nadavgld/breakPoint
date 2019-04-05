<template>
  <div>
    <div class="play-container">
      <div v-for="(user, index) in participants" :key="user.username" class="user">
        <i v-if="index > 0" class="users fas fa-user"></i>
        <i v-if="index ==0" class="users fas fa-user-secret"></i>
        {{user.username}}
      </div>
    </div>
    <v-btn
      v-if="showStartGame"
      class="mt start-game-button"
      color="blue"
      @click="startGame"
    >Start Game</v-btn>
  </div>
</template>

<script>
import { getAllDevices, joinDeviceLobby, getDeviceById } from "@/apis/device.js";

export default {
  data() {
    return {
      name: "playNow",
      currentDevice: undefined,
      deviceId: undefined,
      participants: [
        { username: "gal", userId: "i" },
        { username: "Inbar", userId: "ii" }
      ]
    };
  },

  async mounted() {
    const token = localStorage.getItem("token");
    this.deviceId = $route.query.pointId;

    if (!token) {
      this.$router.push({ path: `/login` });

      return;
    }

    var device = await getDeviceById(this.deviceId, token);
    console.log(device);
  },

  computed: {
    showStartGame: function() {
      var currentUserId = localStorage.getItem("userId");
      //return this.participants.filter(e => e.userId === currentUserId).length > 0;
      return true;
    }
  },
  components: {}
};
</script>

<style scoped>
.user {
  font-size: 32px;
  padding-top: 10px;
  text-align: left;
}
.play-container {
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 160px;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
  max-height: calc(100% - 150px);
}
.start-game-button {
  position: fixed;
  botom: 0;
  bottom: 5px;
  margin: auto;
  transform: translate(-50%, -50%);
  left: 50%;
}
</style>
