<template>
  <div class="container container--500">
    <h1 class="o-heading o-heading--big o-heading--center">Login</h1>
    <form class="o-form">
      <label class="o-form__label" for="email">Email</label>
      <input
        class="o-form__input o-form__input--block"
        type="email"
        name="email"
        id="email"
        v-model="login.email">

      <label class="o-form__label" for="password">Senha</label>
      <input
        class="o-form__input o-form__input--block"
        type="password"
        name="password"
        id="password"
        v-model="login.senha">

      <button class="c-btn c-btn--primary c-btn--block" @click.prevent="logon">Logar</button>

      <NotificationError :errors="errors" />
    </form>

    <p class="forgot-password">
      <a href="http://ranekapi.local/wp-login.php?action=lostpassword" target="_blank">Esqueceu a senha? Clique aqui...</a>
    </p>

    <CreateLogin />

  </div>
</template>

<script>
import CreateLogin from '@/components/CreateLogin.vue';

export default {
  name: 'Login',
  components: {
    CreateLogin,
  },
  data() {
    return {
      login: {
        email: '',
        senha: '',
      },
      errors: [],
    };
  },
  methods: {
    logon() {
      this.errors = [];
      this.$store.dispatch('loginUser', this.login).then(() => {
        this.$store.dispatch('getUser');
        this.$router.push({ name: 'usuario' });
      })
        .catch((error) => {
          this.errors.push(error.response.data.message);
        });
    },
  },

};
</script>

<style>

</style>
