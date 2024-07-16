<template>
  <LoadSpinner />
  <AppointmentList />
</template>

<script lang="ts" setup>
</script>

<style>
* {
  margin: 0px;
  --custom-pink: rgb(243, 109, 131);
  --custom-gray: rgb(197, 219, 231);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.debug {
  background-color: lightgray;
  padding: 5px;
  font-size: small;
}
</style>
