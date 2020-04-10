<template>
  <ul class="o-pagination" v-if="totalPages > 1">
    <router-link
      :to="{query: query(1)}"
      class="o-pagination__link o-pagination__link--start"
      v-show="Number(this.$route.query._page) >= 2"
    >
      Início
    </router-link>
    <li v-for="page in pages" :key="page" class="o-pagination__item">
      <router-link :to="{query: query(page)}" class="o-pagination__link">
        {{ page }}
      </router-link>
    </li>
    <router-link
      :to="{query: query(totalPages)}"
      class="o-pagination__link o-pagination__link--end"
      v-show="Number(this.$route.query._page) < totalPages"
    >
      Último
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    totalProdutos: {
      type: Number,
      default: 1,
    },
    productsPerPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(page) {
      return {
        ...this.$route.query,
        _page: page,
      };
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    pages() {
      // eslint-disable-next-line no-underscore-dangle
      const current = Number(this.$route.query._page);
      const range = 5;
      const offset = Math.ceil(range / 2);
      const total = this.totalPages;
      const pagesArray = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },
    totalPages() {
      const total = this.totalProdutos / this.productsPerPage;
      return (total !== Infinity) ? Math.ceil(total) : 0;
    },
  },

};
</script>

<style>

</style>
