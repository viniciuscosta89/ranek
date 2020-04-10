<!-- eslint-disable max-len -->
<template>
  <section class="user">
    <nav class="side-nav">
      <ul>
        <li>
          <router-link class="side-nav__link" :to="{ name: 'usuario' }">Produtos</router-link>
        </li>
        <li>
          <router-link class="side-nav__link" :to="{ name: 'compras' }">Compras</router-link>
        </li>
        <li>
          <router-link class="side-nav__link" :to="{ name: 'vendas' }">Vendas</router-link>
        </li>
        <li>
          <router-link class="side-nav__link" :to="{ name: 'usuario-editar' }">Editar Usuário</router-link>
        </li>
        <li>
          <button class="c-btn c-btn--secondary c-btn--block" @click.prevent="logout">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>

  </section>
</template>

<script>
export default {
  name: 'User',
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.push({ name: 'login' });
    },
  },

};
</script>

<style>

</style>
