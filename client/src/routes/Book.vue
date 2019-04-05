<template>
  <div class="container">
    <div v-for="timeInterval in calculateInterval()" :key="timeInterval.time" class="point">
      <v-flex xs12>
        <v-card class="black--text" :class="{'red':!timeInterval.isFree}">
          <v-layout>
            <v-flex xs5>
              <div class="point-icon">
                <i class="far fa-clock"></i>
                {{timeInterval.time}}
              </div>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div class="buttons">
                  <v-btn v-if="timeInterval.isFree" @click="book(timeInterval.time)">Book</v-btn>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </div>
  </div>
</template>

<script>
import { startGame, getAllMatches } from "@/apis/match.js";

export default {
  name: "app",
  data() {
    return {
      minHour: 9,
      maxHour: 23,
      intervalTime: 0.5,
      allMatches: []
    };
  },

  async mounted() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.$router.push({ path: `/login` });
    }

    var matches = await getAllMatches(token);
    this.allMatches = matches;
  },

  methods: {
    async book(time) {
      const hours = parseInt(time.split(":")[0]);
      const minutes = parseInt(time.split(":")[1]);

      var date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);

      const deviceId = this.$route.query.pointId;

      const match = await startGame(
        deviceId,
        [localStorage.getItem("user_name")],
        localStorage.getItem("token"),
        date
      );

      this.$router.push({ path: `/pick` });
    },
    calculateInterval() {
      var array = [];
      for (var i = this.minHour; i <= this.maxHour; i += this.intervalTime)
        array.push(i);

      array = array.map(item => {
        item = item.toString();

        if (item.indexOf(".") >= 0) {
          let _hour = item.split(".")[0];
          if (_hour.length == 1) return `0${_hour}:30`;

          return `${_hour}:30`;
        } else {
          if (item.length == 1) return `0${item}:00`;

          return `${item}:00`;
        }
      });

      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        newArray.push({
          time: array[i],
          isFree: Math.random() > 0.5
        });
      }

      return newArray;
    }
  }
};

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};
</script>

<style>
.container {
  margin: auto;
  height: 100vh;
  padding: 15px 0;
}

.point {
  max-width: 400px;
  padding: 5px;
  margin: 5px auto;
}
.point-icon {
  height: 100%;
  vertical-align: middle;
  line-height: 66px;
  text-align: center;
  font-size: 24px;
}

.notFree {
  background: rgb(175, 14, 14) !important;
}

.buttons {
  display: block;
}

.v-card__title--primary {
  padding: 6px !important;
  padding-left: 25px;
}
</style>