<template>
  <div>
    <div class="play-container">
      <h1>Currently waiting for a match..</h1>
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
      >Take a Break</v-btn>

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

import { startGame } from "@/apis/match.js";

export default {
  data() {
    return {
      name: "playNow",
      currentDevice: undefined,
      deviceId: undefined,
      participants: []
    };
  },

  sockets: {
    new_user_in_room(newUser) {
      this.participants.push(newUser);
    },
    user_left_room(user) {
      this.participants = this.participants.filter(p => p !== user);
    },
    match_started(matchId) {
      this.$router.push({ path: `/closeGame?matchId=${matchId}` });
    }
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
    async startGame() {
      const match = await startGame(
        this.deviceId,
        this.participants,
        localStorage.getItem("token")
      );

      this.$router.push({ path: `/closeGame?matchId=${match._id}` });
    },

    async cancelGame() {
      await cancelLobbyWaiting(this.deviceId, localStorage.getItem("token"));

      this.$router.push({ path: `/pick` });
    }
  },

  computed: {
    showStartGame: function() {
      var currentUser = localStorage.getItem("user_name");

      if (
        !this.participants ||
        !this.currentDevice ||
        this.participants.length == 0
      )
        return false;

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
h1 {
  margin: 5px 0;
  color: crimson;
  font-size: 25px;
  font-family: inherit;
  letter-spacing: 1px;
}

.user {
  font-size: 24px;
  padding-top: 15px;
  text-align: center;
  /* padding-left: 42vw; */
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
  width: 100%;
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  top: 75px;
  left: 50%;
  -webkit-transform: translate(-50%, 0%);
  text-transform: capitalize;
  max-height: calc(100% - 150px);
  overflow: hidden;
  transform-origin: bottom;
}
.start-game-button {
  width: 150px;
}

@media only screen and (max-width: 500px) {
  .start-game-button {
    width: 100px;
    font-size: 12px;
  }

  .user {
    font-size: 32px;
    padding-top: 10px;
    text-align: left;
    padding-left: 10vw;
  }
}
</style>
