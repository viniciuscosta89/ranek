<template>
  <section>
    <transition mode="out-in">
      <div v-if="compras">
        <h2 class="o-heading">Compras</h2>
        <div class="c-user-products" v-for="(compra, index) in compras" :key="index">
          <ProductItem
            class="c-user-products__item"
            v-if="compra.produto"
            :produto="compra.produto"
          >
            <p class="c-user-products__seller">
              <span class="c-user-products__seller-title">Vendedor: </span>
              <span class="c-user-products__seller-name">{{ compra.vendedor_id }}</span>
            </p>
          </ProductItem>
        </div>
      </div>
      <LoadingPage v-else />
    </transition>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
  name: 'UserPurchases',
  components: {
    ProductItem,
  },
  data() {
    return {
      compras: null,
    };
  },
  computed: {
    ...mapState(['user', 'login']),
  },
  methods: {
    getPurchases() {
      api.get('/transacao?tipo=comprador_id')
        .then((resp) => {
          this.compras = resp.data;
        });
    },
  },
  watch: {
    login() {
      this.getPurchases();
    },
  },
  created() {
    if (this.login) {
      this.getPurchases();
    }
    document.title = 'Compras - Usuário | Ranek';
  },
};
</script>

<style>

</style>
