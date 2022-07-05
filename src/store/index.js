import Vue from 'vue'
import Vuex from 'vuex'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventos: []
  },
  mutations: {
    GET_EVENTOS(state, payload) {
      state.eventos = payload
    },
  },
  actions: {
    async get_eventos({ commit }) {
      try {
        const q = query(
          collection(db, "eventos"),
        );
        onSnapshot(q, (querySnapshot) => {
          const eventos = [];
          querySnapshot.forEach((doc) => {
            eventos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          commit("GET_EVENTOS", eventos);
        })
      } catch (error) {
        console.log(error);
      }
    },
    async add_evento({ commit }, evento) {
      try {
        await addDoc(collection(db, "eventos",), {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          direccion: evento.direccion,
          fecha: evento.fecha,
          hora: evento.hora,
          lugar: evento.lugar,
          src: evento.src
        });
      } catch (error) {
        console.log(error)
      }
    },
    async delete_evento({ commit }, id) {
      try {
        const docRef = doc(db, "eventos", id)
        await deleteDoc(docRef)
      } catch (error) {
        console.log(error)
      }
    },
    async update_evento({ commit }, evento) {
      try {
        const docRef = doc(db, "eventos", evento.id);
        await updateDoc(docRef, {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          direccion: evento.direccion,
          fecha: evento.fecha,
          hora: evento.hora,
          lugar: evento.lugar,
          src: evento.src
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
})
