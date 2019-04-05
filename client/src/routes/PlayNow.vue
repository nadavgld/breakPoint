<template>
  <div>
    <div class="play-container">
      <div v-for="(user, index) in participants" :key="user.username" class="user">
        <i v-if="index > 0" class="users fas fa-user"></i>
        <i v-if="index ==0" class="users fas fa-user-secret"></i>
        {{user}}
      </div>
    </div>
    <div class="buttons">
      <v-btn
        :disabled="this.participants.length < this.currentDevice.minPlayers"
        v-if="showStartGame"
        class="white--text mt start-game-button"
        color="#E30921"
        @click="startGame"
      >Start Game</v-btn>

      <v-btn class="white--text mt start-game-button" color="blue" @click="cancelGame">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
import {
  getAllDevices,
  joinDeviceLobby,
  getDeviceById,
  cancelLobbyWaiting
} from "@/apis/device.js";

export default {
  data() {
    return {
      name: "playNow",
      currentDevice: undefined,
      deviceId: undefined,
      participants: []
    };
  },

  async mounted() {
    const token = localStorage.getItem("token");
    this.deviceId = this.$route.query.pointId;

    if (!token) {
      this.$router.push({ path: `/login` });

      return;
    }

    var device = await getDeviceById(this.deviceId, token);

    this.currentDevice = device;
    this.participants = [...device.lobby];
  },

  methods: {
    startGame() {},

    async cancelGame() {
      await cancelLobbyWaiting(this.deviceId, localStorage.getItem("token"));
      
      this.$router.push({ path: `/pick` });
    }
  },

  computed: {
    showStartGame: function() {
      var currentUser = localStorage.getItem("user_name");

      return (
        this.participants[0] === currentUser &&
        this.participants.length >= this.currentDevice.minPlayers
      );
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

.buttons {
  display: flex;
  position: fixed;
  botom: 0;
  bottom: 5px;
  margin: auto;
  transform: translate(-50%, -50%);
  left: 50%;
}

.play-container {
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 160px;
  left: 50%;
  transform: translate(-50%, 0%);
  text-transform: capitalize;
  max-height: calc(100% - 150px);
}
.start-game-button {
  width: 150px;
}
</style>
