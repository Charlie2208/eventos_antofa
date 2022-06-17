<template>
  <v-carousel cycle height="400">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
      name: "Carousel",
    data () {
      return {
        items: [
        {
          src: "http://culturaantofagasta.cl/wp-content/uploads/2020/01/a-Teatro-Municipal-2.jpg",
        },
        {
          src: "https://finde.latercera.com/wp-content/uploads/2022/04/Zero-Gravity-Ambassadors-3-ok-700x450.jpg",
        },
        {
          src: "https://www.diarioantofagasta.cl/wp-content/uploads/2018/04/FILZIC2018_5TA_JORNADA-2.jpg",
        },
        {
          src: "https://www.registromuseoschile.cl/663/articles-60012_imagen_portada.thumb_i_portada.jpg",
        },
      ],
      }
    },
  }
</script>

