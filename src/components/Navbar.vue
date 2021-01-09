<template>
  <nav
    class="sticky top-0 flex justify-center border-b border-black font-roboto z-50"
  >
    <div class="flex justify-between w-full max-w-screen-xl m-3">
      <div class="flex justify-start">
        <router-link :to="{ name: 'Home' }">
          <h1 class="text-3xl font-bold">
            LFG<span class="text-2xl text-gray-600 font-normal">roup</span>
          </h1>
        </router-link>
      </div>
      <ul class="flex justify-end items-center">
        <template v-if="userIsLoggedIn">
          <router-link
            :to="{ name: 'Dashboard' }"
            class="mx-2 cursor-pointer"
            active-class="font-semibold text-lg"
            >Dashboard</router-link
          >
          <button @click="logout" class="mx-2 cursor-pointer">
            Logout
          </button>
        </template>
        <router-link
          v-else
          :to="{ name: 'Login' }"
          class="mx-2 cursor-pointer"
          active-class="font-semibold text-lg"
          >Login</router-link
        >
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';

import { state } from '../store';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();

    const logout = () => {
      auth.signOut();
      router.push({ name: 'Login' });
    };

    const userIsLoggedIn = ref(false);

    watchEffect(() => {
      if (state.user) {
        userIsLoggedIn.value = true;
        router.push({ name: 'Dashboard' });
      } else {
        userIsLoggedIn.value = false;
      }
    });

    return { auth, logout, userIsLoggedIn, user: state.user };
  },
};
</script>

<style></style>
