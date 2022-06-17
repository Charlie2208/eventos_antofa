<template>
  <v-container>
    <v-row class="py-3">
      <div>
        <v-icon>mdi-calendar</v-icon>
        <router-link to="/" flat class="mx-2 links_eventosCategorias"
          >Eventos</router-link
        >
      </div>
      <div>
        <v-icon>mdi-scatter-plot</v-icon>
        <router-link to="/" flat class="links_eventosCategorias"
          >Categorias</router-link
        >
      </div>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-row>
    <Carousel />

    <v-row align="center" class="py-5">
      <h1 class="font-weight-medium mx-5">Esta Semana en Antofagasta</h1>
      <v-btn rounded small color="primary" dark> Ver todo </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue-grey" class="ma-2 white--text">
        Subir Evento
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            v-for="(evento, i) in eventos"
            :key="i"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="evento.src"
              >
                <v-card-title>{{ evento.nombre }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">
                {{ evento.nombre }}
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ evento.descripcion }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text> Compartir </v-btn>

                <v-btn color="orange" text> Explore </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="d-none d-md-block">
        <!-- <h2 class="font-weight-medium">Lista Antofa Music</h2> -->
        <iframe
          src="https://open.spotify.com/embed/playlist/4Sim8snGbus9RZ913b2kyM?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <div>
          <GoogleMap
            :latitude="-23.646686"
            :longitude="-70.396772"
            :title="'Titulo Marcador'"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calendar from "@/components/Calendar.vue";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  name: "Home",
  components: { Carousel, Calendar, GoogleMap },
  data() {
    return {
      eventos: [
        {
          nombre: "Obra de teatro",
          src: "http://culturaantofagasta.cl/wp-content/uploads/2020/01/a-Teatro-Municipal-2.jpg",
          descripcion: "Obra de teatro a relizarse en el teatro municipal",
        },
        {
          nombre: "Concierto de música",
          src: "https://finde.latercera.com/wp-content/uploads/2022/04/Zero-Gravity-Ambassadors-3-ok-700x450.jpg",
          descripcion: "Concierto de Jazz",
        },
        {
          nombre: "Filzic 2022",
          src: "https://www.diarioantofagasta.cl/wp-content/uploads/2018/04/FILZIC2018_5TA_JORNADA-2.jpg",
          descripcion:
            "Feria Internacional del libro 2022 se presentará en el sitio cero del puerto de Antofagasta",
        },
        {
          nombre: "Dia del patrimonio",
          src: "https://www.registromuseoschile.cl/663/articles-60012_imagen_portada.thumb_i_portada.jpg",
          descripcion:
            "Día del patrimonio a celebrarse a lo largo del país, en la ciudad de Antofagasta estarán abiertos diversos museos",
        },
      ],
    };
  },
};
</script>
<style>
.links_eventosCategorias {
  text-decoration: none;
}
</style>
