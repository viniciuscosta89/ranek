<template>
  <div id="app" class="u-d-flex u-flex-direction--column u-min-height--100vh">
    <Header />
    <main class="main u-flex--1">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
