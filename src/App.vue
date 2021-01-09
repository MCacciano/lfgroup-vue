<template>
  <div id="nav">
    <button
      @click="logout"
      class="border border-black rounded shadow bg-blue-700 text-white font-medium p-1 cursor-pointer"
    >
      Logout
    </button>
  </div>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router';
import { auth } from './firebase';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const logout = () => {
      auth.signOut();
      router.push({ name: 'Login' });
    };

    return { logout };
  },
};
</script>
