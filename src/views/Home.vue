<template>
  <fragment>
    <h1 class="o-heading o-heading--big o-heading--center">👍 Compre ou Venda 👎</h1>
    <ProdutosBuscar />
    <ProdutosLista />
  </fragment>
</template>

<script>
import ProdutosBuscar from '@/components/ProdutosBuscar.vue';
import ProdutosLista from '@/components/ProdutosLista.vue';

export default {
  name: 'Home',
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
  created() {
    document.title = 'Ranek';
  },
};
</script>
