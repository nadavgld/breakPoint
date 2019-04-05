<template>
  <div class="container">
    <div v-for="index in calculateInterval()" :key="index" class="point">
      <v-flex xs12>
        <v-card class="black--text">
          <v-layout>
            <v-flex xs5>
              <div class="point-icon">
                <i class="far fa-clock"></i>
                {{index}}
              </div>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div class="buttons">
                  <v-btn> Book </v-btn>
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
export default {
  name: "app",
  data() {
    return {
      minHour: 9,
      maxHour: 23,
      intervalTime: 0.5
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.$router.push({ path: `/login` });
    }
  },

  methods: {
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

      return array;
    }
  }
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

.buttons{
  display: none;
}

.point:hover .buttons{
  display: block;
}


.v-card__title--primary{
  padding: 6px !important;
  padding-left: 25px;
}

</style>