<template>
  <div class="close-game-container">
      <div class="timer">{{formatedMinutes}}:{{formatedSeconds}} </div>
      <v-btn class="mt close-game-button" color="blue" @click="login">Close Game</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      minutes: 25,
      formatedMinutes: "25",
      seconds: 0,
      formatedSeconds: "00"

    };
  },
  mounted(){
    this.startTimer();
  } ,
  methods: {
      startTimer() {
        var that = this;
        var x = setInterval(function() {
            if(that.seconds > 0) {
                that.seconds -= 1;
                that.formatedSeconds = that.getFormatedTime(that.seconds);
            }else if(that.minutes > 0) {
                that.minutes -= 1;
                that.seconds = 59
                that.formatedSeconds = that.getFormatedTime(that.seconds);
                that.formatedMinutes = that.getFormatedTime(that.minutes);
            } else {
                clearInterval(x);     
            }
        }, 1000);
  },
    getFormatedTime(number) {
        return number <=9 ? ("0" + number) : number;

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
    font-family: 'Share Tech Mono', monospace;
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
.close-game-button{

}
</style>