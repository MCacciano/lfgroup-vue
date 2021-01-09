<template>
  <div class="flex justify-center items-center">
    <h1 class="text-2xl">{{ displayName }}</h1>
  </div>
</template>

<script>
import { state } from '@/store';
import { computed } from 'vue';

export default {
  name: 'Dashboard',
  setup() {
    const { user } = state;

    const displayName = computed(() => {
      return user.displayName ? user.displayName : user.email;
    });

    return { displayName };
  },
};
</script>
