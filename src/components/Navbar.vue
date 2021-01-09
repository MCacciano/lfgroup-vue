<template>
  <nav class="flex justify-center border-b border-black font-roboto">
    <div class="flex justify-between w-full max-w-screen-xl m-3">
      <div class="flex justify-start">
        <router-link :to="{ name: 'Dashboard' }">
          <h1 class="text-3xl font-bold">
            LFG<span class="text-2xl text-gray-600 font-normal">roup</span>
          </h1>
        </router-link>
      </div>
      <ul class="flex justify-end items-center">
        <router-link
          :to="{ name: 'Dashboard' }"
          class="mx-2 cursor-pointer"
          active-class="font-semibold text-lg"
          >Dashboard</router-link
        >
        <button v-if="auth.currentUser" @click="logout" class="mx-2 cursor-pointer">
          Logout
        </button>
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
import { useRouter } from 'vue-router';
import { auth } from '../firebase';

export default {
  setup() {
    const router = useRouter();
    const logout = () => {
      auth.signOut();
      router.push({ name: 'Login' });
    };

    return { auth, logout };
  }
};
</script>

<style></style>
