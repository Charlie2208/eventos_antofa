<template>
  <v-container fluid>
    <v-row wrap class="py-5">
      <span class="ml-5" color="primary" v-if="user !== null">{{
        this.user.email
      }}</span>
      <v-spacer></v-spacer>
      <v-btn class="mx-5" color="blue darken-1" dark @click="activarAddEvento"
        >Agregar Nuevo Evento</v-btn
      >
    </v-row>
    <v-row justify="center" v-if="filtrarUsuario.length > 0">
      <v-subheader>Administración de eventos</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in filtrarUsuario"
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
                <v-btn
                  class="mx-2 white--text"
                  color="blue"
                  @click="activarUpdate(message)"
                  >Editar
                  <v-icon class="mr-2"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2 white--text"
                  color="red"
                  @click="deleteItem(message.id)"
                  >Eliminar
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </td>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row v-else justify="center">
      <v-alert border="bottom" color="pink darken-1" dark>
        Aún no has agregado un evento
      </v-alert>
    </v-row>
    <v-dialog v-model="dialogAdd">
      <v-card>
        <v-card-title class="text-h5">Agregando Evento</v-card-title>
        <v-card-text>
          <v-form ref="formEventos">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Nombre del evento"
                    :rules="nameRules"
                    v-model="evento.nombre"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="items"
                    :menu-props="{ top: true, offsetY: true }"
                    label="Categorías"
                    v-model="evento.categoria"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Lugar"
                    :rules="nameRules"
                    hint="Ejemplo: Teatro Municipal"
                    v-model="evento.lugar"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Dirección"
                    :rules="nameRules"
                    hint="Ejemplo: Avenida Arturo Prat 103"
                    v-model="evento.direccion"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="Hora"
                    value="12:30:00"
                    type="time"
                    suffix="PST"
                    v-model="evento.hora"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Fecha"
                    hint="Ejemplo: 22-05-22"
                    :rules="dateRules"
                    v-model="evento.fecha"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Link de la imágen"
                    v-model="evento.src"
                    :rules="linkRules"
                    hint="Ejemplo: http://www.google.com/imagen"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="evento.descripcion" color="teal">
                    <template v-slot:label>
                      <div>Descripción</div>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-btn
                color="green darken-2"
                class="mr-4"
                dark
                @click="addEventoForm"
                >Agregar Evento</v-btn
              >
              <v-btn color="error" class="mr-4" @click="reset">
                Limpiar Formulario
              </v-btn>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate">
      <v-card>
        <v-card-title class="text-h5">Editar Evento</v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Nombre del evento"
                    :rules="nameRules"
                    v-model="evento.nombre"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="items"
                    :menu-props="{ top: true, offsetY: true }"
                    label="Categorías"
                    v-model="evento.categoria"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Lugar"
                    :rules="nameRules"
                    hint="Ejemplo: Teatro Municipal"
                    v-model="evento.lugar"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Dirección"
                    :rules="nameRules"
                    hint="Ejemplo: Avenida Arturo Prat 103"
                    v-model="evento.direccion"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="Hora"
                    value="12:30:00"
                    type="time"
                    suffix="PST"
                    v-model="evento.hora"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Fecha"
                    hint="Ejemplo: 22-05-22"
                    :rules="dateRules"
                    v-model="evento.fecha"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    required
                    label="Link de la imágen"
                    v-model="evento.src"
                    :rules="linkRules"
                    hint="Ejemplo: http://www.google.com/imagen"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="evento.descripcion" color="teal">
                    <template v-slot:label>
                      <div>Descripción</div>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-btn
                color="green darken-2"
                class="mr-4"
                dark
                @click="updateEventoForm"
                >Editar</v-btn
              >
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Estás seguro de eliminar este evento?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteEventoItems"
            >Si</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> Evento creado con éxito </v-card-title>

        <v-card-text> Para ver el evento el evento pulsa el botón </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="pushHome">
            Cerrar alerta
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
export default {
  data() {
    return {
      eventosUsuario: [],
      evento: {
        nombre: "",
        src: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        direccion: "",
        hora: "",
      },
      items: ["Música", "Teatro", "Cine", "Literatura", "Otro"],
      user: null,
      dialog: false,
      dialogAdd: false,
      dialogDelete: false,
      dialogUpdate: false,
      nameRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
      ],
      dateRules: [
        (v) =>
          /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(v) ||
          "Formato de fecha incorrecto",
      ],
      linkRules: [
        (v) =>
          /^(ftp|http|https):\/\/[^ "]+$/.test(v) ||
          "Formato de link incorrecto",
      ],
    };
  },
  async mounted() {
    if (this.eventos.length === 0) {
      await this.get_eventos();
      console.log("se solicitó evento");
      return;
    }
  },
  methods: {
    ...mapActions([
      "add_evento",
      "delete_evento",
      "update_evento",
      "get_eventos",
    ]),
    pushHome() {
      this.$router.push("/");
      this.dialog = false;
    },
    activarAddEvento() {
      this.dialogAdd = true;
    },
    addEventoForm() {
      this.add_evento({ ...this.evento });
      this.dialog = true;
    },
    deleteItem(id) {
      this.deleteEventoId = id;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteEventoItems() {
      this.delete_evento(this.deleteEventoId);
      this.dialogDelete = false;
    },
    activarUpdate(item) {
      this.dialogUpdate = true;
      this.evento = item;
    },
    updateEventoForm() {
      this.update_evento({ ...this.evento });
      this.evento = {};
      this.dialogUpdate = false;
    },

    reset() {
      this.$refs.formEventos.reset();
    },
  },
  computed: {
    ...mapState(["eventos"]),
    filtrarUsuario() {
      const { uid } = this.$route.params;
      this.eventosUsuario = this.eventos.filter((item) => item.uid === uid);
      return this.eventosUsuario;
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
  },
};
</script>