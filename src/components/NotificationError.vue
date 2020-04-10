<template>
  <transition mode="out-in">
    <ul class="error" v-if="errors.length + 0">
      <li class="error__item" v-for="(error, index) in errors" :key="index" v-html="error">

      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'NotificationError',
  props: {
    errors: Array,
  },
};
</script>
