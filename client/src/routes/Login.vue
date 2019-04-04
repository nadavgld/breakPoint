<template>
  <div class="login">
    <h1>{{name}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      name: 'Login'
    }
  },
  name: 'home',
  components: {
  }
}
</script>
