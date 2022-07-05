<template>
  <v-container>
    <v-row class="py-3">
      <div>
        <v-icon>mdi-scatter-plot</v-icon>
        <router-link to="/" flat class="links_eventosCategorias black--text"
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
      <h1 class="font-weight-medium mx-5">Próximos Eventos en Antofagasta</h1>
      <v-btn rounded small color="primary" dark> Ver todo </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue-grey" class="ma-2 white--text" to="/agregareventos">
        Agregar Evento
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
              <v-card-text class="text--primary">
                <div>Lugar: {{ evento.lugar }}</div>
              
              
                <div>Dirección: {{ evento.direccion }}</div>
              
              
                <div>Hora: {{ evento.hora }}</div>
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
          style="border-radius: 12px"
          src="https://open.spotify.com/embed/playlist/4Sim8snGbus9RZ913b2kyM?utm_source=generator&theme=0"
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
        <v-card class="mx-auto mt-3" max-width="400">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ estacion.Estacion }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Estado: {{ estacion.Estado }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="text-h2" cols="8">
                {{ estacion.Temp }}&deg;C
              </v-col>
              <v-col cols="4">
                <v-img
                  v-if="
                    estacion.Estado === 'Nublado' ||
                    estacion.Estado === 'Escasa nubosidad' || 
                    estacion.Estado === 'Nubosidad parcial' ||
                    estacion.Estado === 'Cubierto'
                  "
                  src="https://cdn-icons-png.flaticon.com/512/1140/1140045.png"
                  alt="Sunny image"
                  width="100%"
                ></v-img>
                <v-img
                  v-else
                  src="https://cdn-icons-png.flaticon.com/512/890/890347.png"
                  alt="Sunny image"
                  width="100%"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-list-item>
            <v-list-item-icon> Humedad </v-list-item-icon>
            <v-list-item-subtitle>{{ estacion.Humedad }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text> Full Report </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Calendar from "@/components/Calendar.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: { Carousel, Calendar, GoogleMap },
  created() {
    axios
      .get("https://api.gael.cloud/general/public/clima/SCFA")
      .then(({ data }) => {
        this.estacion = data;
      })
      .catch((e) => console.log(e));
      
      this.get_eventos();
  },
  data() {
    return {
      estacion: [],
    };
  },
  methods: {
    ...mapActions(["get_eventos"])
  },
  computed: {
    ...mapState(["eventos"])
  },
};
</script>
<style>
.links_eventosCategorias {
  text-decoration: none;
  color: black;
}
</style>
