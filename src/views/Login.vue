<template>
  <div class="absolute inset-0 w-screen h-screen flex justify-center items-center">
    <form
      @submit.prevent="loginWithEmailAndPassword"
      class="flex flex-col border border-gray-500 rounded shadow p-4"
    >
      <label for="email" class="flex flex-col my-2">
        Email
        <input
          type="email"
          id="email"
          v-model.trim="loginForm.email"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <label for="password" class="flex flex-col my-2">
        Password
        <input
          type="password"
          id="password"
          v-model.trim="loginForm.password"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <div className="flex flex-col mt-3">
        <button
          type="submit"
          @click="loginWithEmailAndPassword"
          className="p-1 mb-2 border border-black rounded shadow bg-black text-white text-sm font-medium font-rubik"
        >
          Sign In
        </button>
        <button
          type="button"
          @click="signInWithGoogle"
          className="p-1 mb-2 border border-black rounded shadow bg-red-700 text-white text-sm font-medium font-rubik"
        >
          Sign In With Google
        </button>
      </div>
      <div>
        <a class="text-sm text-blue-700">Forgot Password</a>
        <a class="text-sm text-blue-700">Create an Account</a>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { setUser } from '@/store';

import { auth, signInWithPopup } from '../firebase';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();

    const loginForm = reactive({
      email: '',
      password: ''
    });

    const loginWithEmailAndPassword = () => {
      if (loginForm.email !== '' && loginForm.password !== '') {
        setUser(loginForm);
      }
    };

    const signInWithGoogle = () => {
      signInWithPopup();
    };

    return {
      loginForm,
      signInWithGoogle,
      loginWithEmailAndPassword
    };
  }
};
</script>
