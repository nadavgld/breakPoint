<template>
  <div>
    <div class="play-container">
      <div v-for="(user, index) in participants" :key="user.username" class="user">
        <i v-if="index > 0" class="users fas fa-user"></i>
        <i v-if="index ==0" class="users fas fa-user-secret"></i>
        {{user}}
      </div>
    </div>
    <v-btn
      :disabled="this.participants.length < this.currentDevice.minPlayers"
      v-if="showStartGame"
      class="mt start-game-button"
      color="blue"
      @click="startGame"
    >Start Game</v-btn>
  </div>
</template>

<script>
import {
  getAllDevices,
  joinDeviceLobby,
  getDeviceById
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
    startGame() {}
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
