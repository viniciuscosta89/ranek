<template>
  <section>
    <transition mode="out-in">
    <div v-if="vendas" key="vendas">
      <h2 class="o-heading">Vendas</h2>
      <div class="c-user-products" v-for="(venda, index) in vendas" :key="index">
        <ProductItem
          class="c-user-products__item"
          v-if="venda.produto"
          :produto="venda.produto"
        >
          <p class="c-user-products__seller">
            <span class="c-user-products__seller-title">Comprador: </span>
            <span class="c-user-products__seller-name">{{ venda.comprador_id }}</span>
          </p>
        </ProductItem>
        <div class="c-user-products__delivery">
          <h3 class="o-heading">Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoadingPage v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
  name: 'UserSales',
  components: {
    ProductItem,
  },
  data() {
    return {
      vendas: null,
    };
  },
  computed: {
    ...mapState(['user', 'login']),
  },
  methods: {
    getSales() {
      api.get('/transacao?tipo=vendedor_id')
        .then((resp) => {
          this.vendas = resp.data;
        });
    },
  },
  watch: {
    login() {
      this.getSales();
    },
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  },
};
</script>

<style>

</style>
