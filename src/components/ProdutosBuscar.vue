<template>
  <form class="o-form">
    <input
      type="search"
      name="search"
      id="search"
      v-model="search"
      class="o-form__input o-form__input--search"
      placeholder="Buscar..."
    >
    <input
      type="submit"
      id="magnify"
      value="Buscar"
      @click.prevent="searchProducts"
      class="o-form__magnify"
    >

  </form>
</template>

<script>
export default {
  name: 'search-products',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    searchProducts() {
      this.$router.push({ query: { q: this.search } });
    },
  },
};
</script>

<style>

</style>
