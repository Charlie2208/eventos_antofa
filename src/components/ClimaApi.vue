<template>
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
        </v-card>
</template>
<script>
import axios from "axios";
export default {
    name: "ClimaApi",
    data(){
        return {
            estacion: [],
        }
    },
    created() {
    axios
      .get("https://api.gael.cloud/general/public/clima/SCFA")
      .then(({ data }) => {
        this.estacion = data;
      })
      .catch((e) => console.log(e));
  },
}
</script>