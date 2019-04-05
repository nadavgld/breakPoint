<template>
  <div class="close-game-container">
    <div class="timer">{{formatedMinutes}}:{{formatedSeconds}}</div>
    <v-btn class="white--text mt close-game-button" color="#E30921">Close Game</v-btn>
  </div>
</template>

<script>
import { getmatchById } from "@/apis/match.js";

export default {
  data() {
    return {
      minutes: 25,
      formatedMinutes: "00",
      seconds: 0,
      formatedSeconds: "00",
      matchId: null,
      currentMatch: null
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    this.matchId = this.$route.query.matchId;

    if (!token || !this.matchId) {
      this.$router.push({ path: `/login` });
      return;
    }

    this.currentMatch = await getmatchById(this.matchId, token);

    console.log(this.currentMatch);

    var diff =
      (new Date().getTime() - new Date(this.currentMatch.time).getTime()) /
      1000;
    diff /= 60;

    this.minutes = Math.abs(Math.round(this.currentMatch.duration - diff));

    this.startTimer();
  },
  methods: {
    startTimer() {
      var that = this;
      var x = setInterval(function() {
        if (that.seconds > 0) {
          that.seconds -= 1;
          that.formatedSeconds = that.getFormatedTime(that.seconds);
        } else if (that.minutes > 0) {
          that.minutes -= 1;
          that.seconds = 59;
          that.formatedSeconds = that.getFormatedTime(that.seconds);
          that.formatedMinutes = that.getFormatedTime(that.minutes);
        } else {
          clearInterval(x);
        }
      }, 1000);
    },
    getFormatedTime(number) {
      return number <= 9 ? "0" + number : number;
    }
  },
  name: "home",
  components: {}
};
</script>

<style scoped>
.timer {
  font-size: 32px;
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
  font-family: "Share Tech Mono", monospace;
  color: #000000;
  text-align: center;
  text-shadow: 0 0 20px rgba(10, 175, 230, 0);
}
.close-game-container {
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.close-game-button {
}
</style>