<!-- eslint-disable max-len -->
<template>
  <section class="create-login">
    <h2 class="o-heading o-heading--center">Crie a Sua Conta</h2>
    <NotificationError :errors="errors" />
    <transition mode="out-in">
      <button
        class="c-btn c-btn--primary c-btn--block"
        v-if="!create"
        @click="create = true"
      >
        Criar Conta
      </button>

      <UserForm v-else>
        <button class="c-btn c-btn--primary c-btn--block" @click.prevent="createUser">Criar Usuário</button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'CreateLogin',
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
      errors: [],
    };
  },
  methods: {
    async createUser(event) {
      this.errors = [];
      try {
        const button = event.currentTarget;
        button.innerHTML = 'Criando...';
        button.setAttribute('disabled', true);

        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('loginUser', this.$store.state.user);
        await this.$store.dispatch('getUser');

        this.$router.push({ name: 'usuario' });

        button.innerHTML = 'Criar Usuário';
        button.removeAttribute('disabled');
      } catch (error) {
        this.errors.push(error.response.data.message);
      }
    },
  },
};
</script>
