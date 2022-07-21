<template>
  <v-carousel cycle height="400">
    <v-carousel-item
      v-for="(item, i) in eventos.slice(0,4)"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapState } from "vuex";

  export default {
      name: "Carousel",
    data () {
      return {

      }
    },
  computed: {
    ...mapState(["eventos"])
  },

  }
</script>

