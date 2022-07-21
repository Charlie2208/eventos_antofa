<template>
  <v-container
    class="d-flex flex-column justify-space-between align-center py-5"
  >
    <v-img :src="eventoViewId.src" width="500" class="mx-3"></v-img>
    <h1 class="py-3">{{ eventoViewId.nombre }}</h1>
    <p class="text-justify">
      {{ eventoViewId.descripcion }}
    </p>
    <p class="text-justify">Lugar: {{ eventoViewId.lugar }}</p>
    <p class="text-justify">Dirección: {{ eventoViewId.direccion }}</p>
    <p class="text-justify">Fecha: {{ formatDate(eventoViewId.fechaDb) }},</p>
    <p class="text-justify">Hora: {{ eventoViewId.hora }}</p>

    <GoogleMap
      :latitude="-23.646686"
      :longitude="-70.396772"
      :title="'Titulo Marcador'"
      :width="'20%'"
    />
    
  </v-container>
</template>


<script>
import moment from "moment";
import { mapState } from "vuex";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  name: "EventoView",
  components: { GoogleMap },
  data() {
    return {};
  },
  methods: {
    formatDate(fecha) {
      return moment(fecha.toDate().toDateString()).format("DD/MM/YYYY");
    },
  },
  computed: {
    ...mapState(["eventos"]),

    eventoViewId() {
      const { eventos } = this;
      const { id } = this.$route.params;
      const evento = eventos.find((p) => p.id == id);
      return evento;
    },
  },
  mounted(){
      window.scrollTo(0, 0)
  }
};
</script>
