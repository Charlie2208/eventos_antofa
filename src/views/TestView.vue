<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ estacion.Estacion }}
        </v-list-item-title>
        <v-list-item-subtitle>Estado: {{estacion.Estado}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="text-h2" cols="6"> {{ estacion.Temp }}&deg;C </v-col>
        <v-col cols="6">
          <v-img src="https://www.municipalidaddeantofagasta.cl/images/noticias/Logo1.jpeg" alt="Sunny image" width="100%"></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
        Humedad
      </v-list-item-icon>
      <v-list-item-subtitle>{{ estacion.Humedad }}</v-list-item-subtitle>
    </v-list-item>




    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text> Full Report </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "TestView",
  created() {
    axios
      .get("https://api.gael.cloud/general/public/clima/SCFA")
      .then(({ data }) => {
        this.estacion = data;
      })
      .catch((e) => console.log(e));
  },
  data() {
    return {
      estacion: [],
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      time: 0,
      forecast: [
        {
          day: "Tuesday",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0",
        },
        {
          day: "Wednesday",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0",
        },
        { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
      ],
    };
  },
};
</script>