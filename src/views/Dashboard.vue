<template>
  <div class="flex justify-center items-center">
    <h1 class="text-2xl">{{ user.displayName }}</h1>
  </div>
</template>

<script>
import { state } from '@/store';

export default {
  name: 'Dashboard',
  setup() {
    return { user: state.user };
  }
};
</script>
