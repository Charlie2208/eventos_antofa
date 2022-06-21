<template>
  <v-app id="fondo-animado">
    <h1 class="text-center h-1">Regístrate</h1>
    <v-form v-model="valid" ref="formRegister">
      <v-row justify="center">
        <v-col cols="8" md="4">
          <v-text-field v-model="user.name" label="Nombre" :rules="nameRules" />
          <v-text-field
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          />
          <!-- <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
          /> -->
          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contraseña"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <!-- <v-text-field
            v-model="user.passwordRepit"
            label="Repit Password"
            :rules="passwordRepitRules"
          /> -->
          <v-text-field
            v-model="user.passwordRepit"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRepitRules"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Repite Contraseña"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn
            color="primary"
            class="mr-2"
            :disabled="!valid"
            @click="registrarUser"
            >Iniciar Sesión</v-btn
          >
          <v-btn color="error" @click="reset">Resetear</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>

<script>
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

export default {
  data() {
    return {
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
        passwordRepit: "",
      },
      show1: false,
      show2: false,
      nameRules: [(v) => !!v || "No existe"],
      emailRules: [
        (v) => (v && !!v.trim()) || "Escribe algo, no espacios!",
        (v) => !!v || "No existe",
        (v) =>
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Formato de email incorrecto",
      ],
      passwordRules: [
        (v) => !!v || "No existe",
        (v) => (v && v.length > 5) || "Password debe ser sobre 6 carácteres",
      ],
      passwordRepitRules: [
        (v) => !!v || "No existe",
        (v) => v === this.user.password || "No coinciden las contraseñas",
      ],
    };
  },
//   methods: {
//     async registrarUser() {
//       try {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           this.user.email,
//           this.user.password
//         );
//         this.$router.push({ name: 'login' })
//         console.log(userCredential);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     reset() {
//       console.log("reset...");
//       this.$refs.formRegister.reset();
//     },
//   },
};
</script>

<style>


#fondo-animado {
  background: linear-gradient(45deg,#bcddf8, #ffffff, #4aadff);
  background-size: 400% 400%;
  position: relative;
  animation: cambiar 10s ease-in-out infinite;

}

@keyframes cambiar {
  0%{background-position: 0 50%;}
  50%{background-position: 100% 50%;}
  100%{background-position: 0 50%;}
}

</style>
