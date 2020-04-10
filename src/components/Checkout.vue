<template>
  <section>
    <h3 class="o-heading">Endereço de Envio</h3>
    <NotificationError :errors="errors" />
    <UserForm>
      <button
        class="c-btn c-btn--tertiary c-btn--block"
        @click.prevent="checkout"
      >
        Finalizar Compra
      </button>
    </UserForm>

  </section>
</template>

<script>
import { api } from '@/services.js';
import { mapState } from 'vuex';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'Checkout',
  components: {
    UserForm,
  },
  props: ['produto'],
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapState(['user']),
    shopping() {
      return {
        comprador_id: this.user.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.user.cep,
          rua: this.user.rua,
          numero: this.user.numero,
          bairro: this.user.bairro,
          cidade: this.user.cidade,
          estado: this.user.estado,
        },
      };
    },
  },
  methods: {
    createTransaction() {
      return api.post('/transacao', this.shopping).then(() => {
        this.$router.push({ name: 'compras' });
      });
    },
    async createUser() {
      try {
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('loginUser', this.$store.state.user);
        await this.$store.dispatch('getUser');
        await this.createTransaction();
      } catch (error) {
        this.errors.push(error.response.data.message);
      }
    },
    checkout() {
      this.errors = [];
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
  },

};
</script>

<style>

</style>
