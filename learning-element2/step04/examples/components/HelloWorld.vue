<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <JSX></JSX>
  </div>
</template>

<script>
import JSX from './JSX.vue';
export default {
  name: 'HelloWord',
  components: { JSX },
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
