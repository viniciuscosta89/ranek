<!-- eslint-disable max-len -->
<template>
  <form class="o-form o-form--grid">

    <div v-if="showLoginData" class="o-form__user">
      <label class="o-form__label" for="name">Nome</label>
      <input class="o-form__input" type="text" id="name" name="name" v-model="nome">

      <label class="o-form__label" for="email">E-mail</label>
      <input class="o-form__input" type="email" id="email" name="email" v-model="email">

      <label class="o-form__label" for="password">Senha</label>
      <input class="o-form__input" type="password" id="password" name="password" v-model="senha">
    </div>

    <label class="o-form__label" for="cep">CEP</label>
    <input class="o-form__input" type="text" id="cep" name="cep" v-model="cep" @keyup="preencherCep">

    <label class="o-form__label" for="street">Rua</label>
    <input class="o-form__input" type="text" id="street" name="street" v-model="rua">

    <label class="o-form__label" for="number">Número</label>
    <input class="o-form__input" type="number" id="number" name="number" v-model="numero">

    <label class="o-form__label" for="bairro">Bairro</label>
    <input class="o-form__input" type="text" id="bairro" name="bairro" v-model="bairro">

    <label class="o-form__label" for="city">Cidade</label>
    <input class="o-form__input" type="text" id="city" name="city" v-model="cidade">

    <label class="o-form__label" for="state">Estado</label>
    <input class="o-form__input" type="text" id="state" name="state" v-model="estado">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from '@/helpers.js';
import { getCep } from '@/services.js';

export default {
  name: 'UserForm',
  computed: {
    ...mapFields({
      fields: ['nome', 'email', 'senha', 'rua', 'cep', 'numero', 'bairro', 'cidade', 'estado'],
      base: 'user',
      mutation: 'UPDATE_USER',
    }),
    showLoginData() {
      return (!this.$store.state.login || this.$route.name === 'usuario-editar');
    },
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 8) {
        getCep(cep).then((resp) => {
          this.rua = resp.data.logradouro;
          this.bairro = resp.data.bairro;
          this.cidade = resp.data.localidade;
          this.estado = resp.data.uf;
        });
      }
    },
  },
};
</script>
