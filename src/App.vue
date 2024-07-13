<template>
  <AppointmentList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppointmentList from './components/Appointment/AppointmentList.vue';
export default defineComponent({
  name: 'App',
  components: {
    AppointmentList
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
