<template>
  <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="8">
            <v-row>
            <v-col
                cols="12"
                sm="6"
                md="6"
                v-for="(evento, i) in filtrarEvento"
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

                    <!-- <v-btn color="orange" text @click="$router.push(`/evento/${evento.id}`)"> Ver Más </v-btn> -->
                    <v-btn color="orange" text :to="`/evento/${evento.id}`"> Ver Más </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data(){
        return {
            eventosFiltrados:[],
        }
    },
  async mounted() {
    if (this.eventos.length === 0) {
     await this.get_eventos();
      console.log("se solicitó evento")
      return 
    }
  },
  computed: {
    ...mapState(["eventos"]),
    filtrarEvento(){
        const { categoria } = this.$route.params;
        this.eventosFiltrados = this.eventos.filter((item)=> item.categoria === categoria)
        return this.eventosFiltrados
    }
  },
  methods: {
    ...mapActions(["get_eventos"]),
  },
};
</script>