<template>
  <v-container>
    <v-row class="py-3">
      <div class="mx-3">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Categorias
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in remove_duplicates(eventos)" :key="index">
              <router-link
                :to="`/eventos/${item.categoria}`"
                flat
                class="links_eventosCategorias black--text"
                >{{ item.categoria }}</router-link
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer></v-spacer>

      <v-toolbar flat color="transparent">
        <v-text-field
          v-model="texto"
          append-icon="mdi-magnify"
          label="Buscar Evento"
          single-line
        ></v-text-field>
      </v-toolbar>
    </v-row>
    <Carousel class="py-1" />

    <v-row align="center" class="py-5">
      <h1 class="font-weight-medium mx-5">Próximos Eventos en Antofagasta</h1>
      <v-btn rounded small color="primary" dark to="/vertodo" class="mx-2">
        Ver todo
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue-grey" class="ma-2 white--text" @click="abrirAddEvento">
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
            v-for="(evento, i) in filtroEvento.slice(0,6)"
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

                <div>Fecha: {{ formatDate(evento.fechaDb) }}</div>

                <div>Hora: {{ evento.hora }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn text>
                  <ShareNetwork
                    network="facebook"
                    :url="`http://192.168.0.71:8080/evento/${evento.id}`"
                    :title="`${evento.nombre}`"
                    :description="`${evento.descripcion}`"
                    quote="The hot reload is so fast it\'s near instant. - Evan You"
                    hashtags="EventosAntofa,vite"
                    class="links_eventosCategorias"
                    
                  >
                    Compartir <v-icon>mdi-facebook</v-icon>
                  </ShareNetwork>
                </v-btn>
                <v-btn color="orange" text :to="`/evento/${evento.id}`">
                  Ver Más
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="d-none d-md-block">
        <iframe
          style="border-radius: 12px"
          src="https://open.spotify.com/embed/playlist/4Sim8snGbus9RZ913b2kyM?utm_source=generator&theme=0"
          width="100%"
          height="380"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <ClimaApi />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{}"> </template>

      <v-card>
        <v-card-title class="text-h5 red text-error white--text" dark>
          Error
        </v-card-title>

        <v-card-text class="py-3">
          ¡Debes crear una cuenta o iniciar sesión para agregar un evento!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Aceptar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from "moment";
import Carousel from "@/components/Carousel.vue";
import ClimaApi from "@/components/ClimaApi.vue";
import { mapActions, mapState } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default {
  name: "Home",
  components: { Carousel, ClimaApi },
  created() {
    this.get_eventos();

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
  },
  data() {
    return {
      dialog: false,
      texto: "",
      eventosFiltrados: [],
    };
  },
  methods: {
    ...mapActions(["get_eventos"]),

    async abrirAddEvento() {
      if (this.user) {
        this.$router.push("/agregareventos");
      } else {
        this.dialog = true;
      }
    },
    formatDate(fecha) {
      return moment(fecha.toDate().toDateString()).format("DD/MM/YYYY");
    },
    remove_duplicates(arreglo) {
    let no_duplicate = arreglo.filter((objeto, index, self) =>
     index === self.findIndex((t) => (t.categoria == objeto.categoria
    )));
    return no_duplicate 
  },
  },
  computed: {
    ...mapState(["eventos"]),
    filtroEvento() {
      return this.eventos.filter(
        (item) =>
          item.nombre.toLowerCase().indexOf(this.texto.toLowerCase()) !== -1
      );
    },
  },
};
</script>
<style>
.links_eventosCategorias {
  text-decoration: none;
  color: black;
}
</style>
