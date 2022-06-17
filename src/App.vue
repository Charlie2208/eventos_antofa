<template>
  <v-app class="app">
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",

  components: { NavBar, Footer },

  data: () => ({
    //
  }),
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap");

#app {
  font-family: 'Inter', sans-serif;
}
</style>