<!-- eslint-disable max-len -->
<template>
  <form class="o-form add-product">
    <label class="o-form__label" for="name">Nome</label>
    <input class="o-form__input o-form__input--block" type="text" name="name" id="name" v-model="produto.nome">

    <label class="o-form__label" for="price">Preço</label>
    <input class="o-form__input o-form__input--block" type="number" name="price" id="price" v-model="produto.preco">

    <label class="o-form__label" for="photos">Fotos</label>
    <input class="o-form__input o-form__input--block" type="file" name="photos" id="photos" ref="fotos" multiple>

    <label class="o-form__label" for="description">Descrição</label>
    <textarea class="o-form__input o-form__input--block" name="description" id="description" v-model="produto.descricao" />

    <input class="c-btn c-btn--primary" type="button" value="Adicionar Produto" @click.prevent="addProduct">

  </form>
</template>

<script>
import { api } from '@/services.js';

export default {
  name: 'AddProduct',
  data() {
    return {
      produto: {
        nome: '',
        preco: '',
        descricao: '',
        fotos: null,
        vendido: 'false',
      },
    };
  },
  methods: {
    formatProduct() {
      const form = new FormData();
      const { files } = this.$refs.fotos;

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < files.length; index++) {
        form.append(files[index].name, files[index]);
      }

      form.append('nome', this.produto.nome);
      form.append('preco', this.produto.preco);
      form.append('descricao', this.produto.descricao);
      form.append('vendido', this.produto.vendido);
      form.append('usuario_id', this.$store.state.user.id);

      return form;
    },
    async addProduct(event) {
      const produto = this.formatProduct();
      const button = event.currentTarget;
      button.value = 'Adicionando...';
      button.setAttribute('disabled', true);

      await api.post('/produto', produto);
      await this.$store.dispatch('getUserProducts');

      button.value = 'Adicionar Produto';
      button.removeAttribute('disabled');
    },
  },

};
</script>

<style>

</style>
