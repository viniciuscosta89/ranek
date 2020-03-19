<template>
  <header class="c-header">
    <nav class="o-nav">
      <router-link to="/" exact class="o-logo">
        <img class="o-logo__img" src="@/assets/img/ranek.svg" alt="Ranek" />
      </router-link>

      <router-link to="/login" class="c-btn c-btn--primary">
        Vender / Login
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style></style>
