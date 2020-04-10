<template>
  <div id="app" class="u-d-flex u-flex-direction--column u-min-height--100vh">
    <Header />
    <main class="main u-flex--1">
      <transition mode="out-in">
        <router-view/>
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { api } from './services';

export default {
  components: {
    Header,
    Footer,
  },
  created() {
    if (window.localStorage.token) {
      api.validateToken().then(() => {
        this.$store.dispatch('getUser');
      }).catch(() => {
        window.localStorage.removeItem('token');
      });
    }
  },
};
</script>
