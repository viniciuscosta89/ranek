<template>
  <section>
    <h2 class="o-heading">Adicionar Produto</h2>
    <AddProduct />

    <h2 class="o-heading">Seus Produtos</h2>

    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="(produto, index) in userProducts" :key="index + 1">
        <ProductItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="c-btn c-btn--delete" @click="deleteProduct(produto.id)">Deletar</button>
        </ProductItem>
      </li>
    </transition-group>


  </section>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue';
import ProductItem from '@/components/ProductItem.vue';
import { mapState, mapActions } from 'vuex';
import { api } from '@/services.js';

export default {
  name: 'UserProducts',
  components: {
    AddProduct,
    ProductItem,
  },
  computed: {
    ...mapState(['login', 'user', 'userProducts']),
  },
  methods: {
    ...mapActions(['getUserProducts']),
    deleteProduct(id) {
      // eslint-disable-next-line no-alert
      const confirmar = window.confirm('Deseja remover este produto');
      if (confirmar) {
        api.delete(`/produto/${id}`)
          .then(() => {
            this.getUserProducts();
          })
          .catch((error) => {
            this.errors.push(error.response.data.message);
          });
      }
    },
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
    document.title = 'Usuário | Ranek';
  },

};
</script>
