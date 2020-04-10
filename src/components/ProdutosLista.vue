<template>
  <section class="c-products__container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="c-products" key="produtos">

        <div v-for="(produto, key) in produtos" :key="key + 1" class="c-products__item">
          <router-link :to="{ name: 'produto', params: { id: produto.id }}">
            <img
              v-if="produto.fotos"
              class="c-product__img"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="c-product__price">{{ produto.preco | priceNumber }}</p>
            <h2 class="c-product__title">{{ produto.nome }}</h2>
            <p class="c-product__description">{{ produto.descricao }}</p>
          </router-link>
        </div>

        <ProductsPagination :totalProdutos="totalProdutos" :productsPerPage="productsPerPage" />
      </div>

      <div v-else-if="produtos && produtos.length === 0" key="no-products">
        <p class="c-products--no-results">Busca sem resultados. Tente buscar outro termo.</p>
      </div>

      <LoadingPage v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import { api } from '@/services';
import { serialize } from '@/helpers';
import ProductsPagination from './ProductsPagination.vue';

export default {
  components: {
    ProductsPagination,
  },
  data() {
    return {
      produtos: null,
      productsPerPage: 9,
      totalProdutos: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);

      return `/produto?_limit=${this.productsPerPage}${query}`;
    },
  },
  methods: {
    getProducts() {
      this.produtos = null;
      api.get(this.url).then((response) => {
        this.totalProdutos = Number(response.headers['x-total-count']);
        this.produtos = response.data;
      });
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },

};
</script>
