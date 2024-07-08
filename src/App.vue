<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <MainScreen />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainScreen from './components/MainScreen.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainScreen
  }
});
</script>

<style>
* {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
