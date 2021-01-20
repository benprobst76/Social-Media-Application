<template>
  <v-app id="app">
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// COMPONENTS
import Navbar from './components/Layout/AppNavbar';
export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import './src/assets/main.scss';
#app {
  background: #d6dfe2;
}
</style>
