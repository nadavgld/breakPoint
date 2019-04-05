<template>
  <div class="login">
    <div class="points-container">
      <div
        v-for="(point, index) in Points"
        :key="point.name"
        class="point"
        @click="pickPoint($event, point, index)"
      >
        <v-flex xs12>
          <v-card :color="computeColor(index)" class="white--text">
            <v-layout>
              <v-flex xs5>
                <div class="point-icon">
                  <i :class="computeIcon(point.name)"></i>
                </div>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{point.name}}</div>
                    <div>{{point.description}}</div>
                    <div
                      class="mt bold"
                    >{{!point.activeMatchId || point.activeMatchId.length == 0 ? "Is Free!" : "Occupied"}}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
              Player capacity
              <v-spacer></v-spacer>
              <div v-for="index in point.minPlayers">
                <i class="users fas fa-user"></i>
              </div>
              <div v-for="index in (point.maxPlayers - point.minPlayers)">
                <i class="users max-players fas fa-user"></i>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </div>

    <div class="modal" v-if="showModal && selectedPoint">
      <div class="point-modal">
        <div class="close-button" @click="showModal = false">X</div>
        <div class="selected-point"></div>
        <div class="modal-buttons">
          <v-btn
            color="green"
            :disabled="selectedPoint.activeMatchId.length > 0"
            class="playnow-button"
            @click="playnow(selectedPoint)"
          >Play Now!</v-btn>
          <v-btn color="blue" class="book-button" @click="book(selectedPoint)">Book 4 Later</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById } from "@/apis/users.js";
import { getAllDevices, joinDeviceLobby } from "@/apis/device.js";

// @ is an alias to /src

export default {
  data() {
    return {
      name: "Point Picker",
      Points: [],
      PointIcons: {
        "Sony PlayStation": "fas fa-gamepad",
        Gym: "fas fa-dumbbell",
        "Ping Pong": "fas fa-table-tennis",
        Guitar: "fas fa-guitar",
        "Dog Walking": "fas fa-dog"
      },
      PointColors: ["#F69314", "#C40B13", "#621295", "#00BDAA"],
      selectedPoint: undefined,
      showModal: false
    };
  },

  async mounted() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.$router.push({ path: `/login` });

      return;
    }

    this.$socket.emit("register", { email: localStorage.getItem('email') });

    var devices = await getAllDevices(token);
    console.log(devices);
    this.Points = [...devices];

    const userId = localStorage.getItem("userId");
    var userData = await getUserById(userId, token);

    if (userData) {
      console.log(userData);
    }
  },

  methods: {
    computeIcon(name) {
      return this.PointIcons[name];
    },
    computeColor(index) {
      return this.PointColors[index % this.PointColors.length];
    },
    pickPoint(event, point, index) {
      this.selectedPoint = point;
      this.showModal = true;
    },
    async playnow(point) {
      var hasJoin = await joinDeviceLobby(
        point._id,
        localStorage.getItem("token")
      );

      this.$router.push({
        path: `/play?pointId=${this.selectedPoint._id}`
      });
    },
    book(point) {
      this.$router.push({ path: `/book?pointId=${this.selectedPoint._id}` });
    }
  },
  components: {}
};
</script>

<style scoped>
.playnow-button {
  width: 250px;
  height: 80px;
  font-size: 40px;
}

.close-button:hover {
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
}
.modal-buttons {
  margin: auto;
  display: contents;
}

.bold {
  font-weight: bolder;
}

.modal {
  width: 100%;
  height: 100%;
  background: #33333340;
  z-index: 5;
  top: 0;
  left: 0;
  position: fixed;
}
.point-modal {
  width: 300px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  background: rgb(233, 230, 230);
  box-shadow: 2px 2px 12px 15px #33333340;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mt {
  margin-top: 30px !important;
}

.point-icon {
  font-size: 70px;
  line-height: 120px;
  text-align: center;
  height: 100%;
}
.point {
  max-width: 400px;
  padding: 5px;
  margin: 5px auto;
}

.point:hover {
  cursor: pointer;
}
.points-container {
  margin: auto;
  height: 100%;
  padding: 15px 0;
}

.users {
  padding: 0 2px;
  text-shadow: 1px 1px 1px #00000040;
}

.max-players {
  color: #33333380;
}

.occupied {
  animation: shake 1s ease;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

