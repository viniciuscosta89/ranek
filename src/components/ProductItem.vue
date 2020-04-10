<template>
  <div class="c-product-item" v-if="produto">
    <router-link :to="{ name: 'produto', params: { id: produto.id }}">
      <img
        class="c-product-item__img"
        v-if="produto.fotos"
        :src="produto.fotos[0].src"
        :alt="produto.fotos[0].titulo"
      >
    </router-link>
    <div class="c-product-item__info">
      <p class="c-product-item__price">{{ produto.preco | priceNumber }}</p>
      <h3 class="c-product-item__title">{{ produto.nome }}</h3>
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['produto'],
};
</script>

<style>

</style>
