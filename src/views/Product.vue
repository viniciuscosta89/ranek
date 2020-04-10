<template>
  <section>
    <div v-if="produto" class="c-product">
      <ul class="c-product__photos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img class="c-product__photo" :src="foto.src" :alt="foto.titulo">
        </li>
      </ul>

      <div class="c-product__info">
        <h1 class="c-product__info-title">{{ produto.nome }}</h1>
        <p class="c-product__info-price">{{ produto.preco | priceNumber }}</p>
        <p class="c-product__info-description">{{ produto.descricao }}</p>

        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <button
            class="c-btn c-btn--primary c-btn--block"
            v-if="!checkout"
            @click="checkout = true"
          >
            Comprar
          </button>
          <Checkout v-else :produto="produto" />
        </transition>

        <button class="c-btn c-btn--primary" v-else disabled>Produto Vendido</button>

      </div>
    </div>

    <LoadingPage v-else />
  </section>
</template>

<script>
import { api } from '@/services.js';
import Checkout from '@/components/Checkout.vue';

export default {
  name: 'produto',
  components: {
    Checkout,
  },
  props: ['id'],
  data() {
    return {
      produto: null,
      checkout: false,
      vendido: false,
    };
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`)
        .then((resp) => {
          this.produto = resp.data;
          document.title = `${this.produto.nome} | Ranek`;
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style>

</style>
