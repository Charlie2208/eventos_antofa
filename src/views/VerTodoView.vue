<template>
  <v-container fluid>
    <v-row justify="center">
      <v-subheader>Todos los eventos</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in eventos"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px">
                  <img :src="message.src" />
                </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <strong v-html="message.nombre"></strong>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <v-chip
                  v-if="message.direccion"
                  :color="`${message.color} lighten-4`"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                  Lugar: {{ message.lugar }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text class="text--primary">
              <div>Descripción: {{ message.descripcion }}</div>
              <div>Lugar: {{ message.lugar }}</div>

              <div>Dirección: {{ message.direccion }}</div>

              <div>Hora: {{ message.hora }}</div>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
        evento: {
        nombre: "",
        src: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        direccion: "",
        hora: "",
      },
      }
  },
  computed: {
    ...mapState(["eventos"]),
  },
  
};
</script>