<template>
  <section class="products__container">
    <div v-for="product in products" :key="product.id" class="product">
      <img
        v-if="product.fotos"
        :src="product.fotos[0].src"
        :alt="product.fotos[0].titulo"
      />
      <p class="product__price">{{ product.preco }}</p>
      <h2 class="product__title">{{ product.nome }}</h2>
      <p class="product__description">{{ product.descricao }}</p>
    </div>
  </section>
</template>

<script>
import { api } from '@/services';

export default {
  data() {
    return {
      products: null,
    };
  },
  methods: {
    getProducts() {
      api.get('/produto')
        .then((resp) => {
          this.products = resp.data;
        });
    },
  },
  created() {
    this.getProducts();
  },

};
</script>

<style>

</style>
