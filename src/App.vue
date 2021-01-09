<template>
  <Navbar />
  <router-view />
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import { auth, signInWithPopup } from '@/firebase';
import { state, setUser } from '@/store';

import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>
