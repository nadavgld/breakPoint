<template>
  <div>
    <div class="play-container">   
    <video id="preview"></video>
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

  sockets: {
    new_user_in_room: newUser => {
      this.participants.push(newUser);
    },
    user_left_room: user => {
      this.participants = this.participants.filter(p => p !== user);
    }
  },

  async mounted() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        alert(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
  },

  methods: {},
  computed: {},
  components: {},


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
