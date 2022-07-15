<template>
  <v-app>
    <h1 class="text-center font-weight-medium py-5">Agregar Eventos</h1>

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
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="evento.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="evento.date"
                  label="Presiona para seleccionar fecha"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="evento.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(evento.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
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
        <v-btn color="green darken-2" class="mr-4" dark @click="addEventoForm"
          >Agregar Evento</v-btn
        >
        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Formulario
        </v-btn>
      </v-container>
    </v-form>

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
  </v-app>
</template>

<script>

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      evento: {
        nombre: "",
        categoria: "",
        src: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        direccion: "",
        hora: "",
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      imagenes:[],
      imagen: null,
      menu: false,
      modal: false,
      menu2: false,
      items: ["Música", "Teatro", "Cine", "Literatura", "Otro"],
      dialog: false,
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
  methods: {
    ...mapActions(["add_evento", "get_eventos"]),
    addEventoForm() {
      this.add_evento({ ...this.evento });
      this.dialog = true;
    },
    reset() {
      this.$refs.formEventos.reset();
    },
    pushHome() {
      this.$router.push("/");
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["eventos"]),
  },
  created() {
    this.get_eventos();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>