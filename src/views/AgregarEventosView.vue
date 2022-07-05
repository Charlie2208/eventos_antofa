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
        <v-btn color="green darken-2" class="mr-4" dark @click="addEventoForm"
          >Agregar Evento</v-btn
        >
        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Formulario
        </v-btn>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
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
      ...mapActions(["add_evento","get_eventos"]),
      addEventoForm() {
          this.add_evento({ ...this.evento });
          this.evento = {};
      },
      reset() {
          this.$refs.formEventos.reset()
      }
  },
  computed: {
      ...mapState(["eventos"]),
  },
  created() {
      this.get_eventos();
  }
};
</script>