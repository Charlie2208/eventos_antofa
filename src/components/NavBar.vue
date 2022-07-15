<template>
  <div>
    <v-app-bar app>
      <v-toolbar color="blue" height="40px">
        <v-app-bar-nav-icon
          @click="drawer = true"
          color="white"
          class="d-block d-md-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-btn text to="/" class="white--text">EventosAntofa</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="d-none d-md-block" >
          <v-btn text to="about" class="white--text">Sobre Nosotros</v-btn>
          
          <v-btn text :to="`/miseventos/${user.uid}`" class="white--text" v-if="user">Mis Eventos</v-btn>
          
          <v-btn text to="register" class="white--text" v-if="!user">Regístrate</v-btn>
          
          <v-btn text to="login" class="white--text" v-if="!user">Iniciar Sesión</v-btn>
          
          <v-btn  @click="cerrarSesion" v-if="user" color="blue" class="white--text">
            Cerrar Sesión<v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sobre Nosotros</v-list-item-title>
          </v-list-item>

          <v-list-item to="register" v-if="!user">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Regístrate</v-list-item-title>
          </v-list-item>
          <v-list-item to="login" v-if="!user">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Iniciar Sesión</v-list-item-title>
          </v-list-item>
          <v-list-item to="/agregareventos">
            <v-list-item-icon>
              <v-icon>mdi-cloud-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Agregar Evento</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user" @click="cerrarSesion">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user" :to="`/miseventos/${user.uid}`">
            <v-list-item-icon>
              <v-icon>mdi-cloud</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mis eventos</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { mapState, mapActions } from "vuex";
export default {
  name: "navbar",
  data: () => ({
    drawer: false,
    group: null,
    user:null,
  }),
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      this.user = user;
    });
    this.get_eventos();
  },
  methods: {
    async cerrarSesion() {
      await signOut(auth);
      this.$router.push("/login");
    },
    ...mapActions(["get_eventos"]),
  },
   computed: {
    ...mapState(["eventos"]),
  },

  
};
</script>