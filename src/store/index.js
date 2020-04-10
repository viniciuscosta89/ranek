import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    userProducts: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.userProducts = payload;
    },
    ADD_UPDATE_USER_PRODUCTS(state, payload) {
      state.userProducts.unshit(payload);
    },
  },
  actions: {
    getUserProducts(context) {
      return api.get(`/produto?usuario_id=${context.state.user.id}`)
        .then((resp) => {
          context.commit('UPDATE_USER_PRODUCTS', resp.data);
        });
    },
    getUser(context) {
      return api.get('/usuario/')
        .then((resp) => {
          context.commit('UPDATE_USER', resp.data);
          context.commit('UPDATE_LOGIN', true);
        });
    },
    createUser(context, payload) {
      context.commit('UPDATE_USER', { id: payload.email });
      return api.post('/usuario', payload);
    },
    loginUser(context, payload) {
      return api.login({
        username: payload.email,
        password: payload.senha,
      }).then((resp) => {
        window.localStorage.token = `Bearer ${resp.data.token}`;
      });
    },
    logoutUser(context) {
      context.commit('UPDATE_USER', {
        id: '',
        nome: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
      window.localStorage.removeItem('token');
      context.commit('UPDATE_LOGIN', false);
    },
  },
  modules: {
  },
});
