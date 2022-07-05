<template>
  <v-container fluid>
    <div class="text-left">
      <span class="ml-5" color="primary" size="50" v-if="user !== null">{{ this.user.email }}</span>
    </div>
    <v-row justify="center">
      <v-subheader>Administración de eventos</v-subheader>

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
            <v-card-text class="text--primary text-center">
              <td class="text-center">
                <v-btn class="mx-2 white--text" color="blue"
                  >Editar
                  <v-icon class="mr-2"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn class="mx-2 white--text" color="red"
                  >Eliminar
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </td>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
export default {
  data: () => ({
    user: null
  }),
  methods: {
    ...mapActions(["add_evento"]),
    addEventoForm() {
      this.add_evento({ ...this.evento });
      this.evento = {};
    },
    reset() {
      this.$refs.formEventos.reset();
    },
  },
  computed: {
    ...mapState(["eventos"]),
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
  },
};
</script>