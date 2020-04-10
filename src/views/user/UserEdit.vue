<template>
  <section>
    <UserForm>
      <button class="c-btn c-btn--primary" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
    <NotificationError :errors="errors" />
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { api } from '@/services.js';

export default {
  name: 'UserEdit',
  components: {
    UserForm,
  },
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    updateUser() {
      this.errors = [];
      api.put('/usuario/', this.$store.state.user)
        .then(() => {
          this.$store.dispatch('getUser');
          this.$router.push({ name: 'usuario' });
        }).catch((error) => {
          this.errors.push(error.response.data.message);
        });
    },
  },
  created() {
    document.title = 'Editar - Usuário | Ranek';
  },

};
</script>

<style>

</style>
