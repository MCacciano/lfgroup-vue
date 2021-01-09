<template>
  <div class="absolute inset-0 w-screen h-screen flex justify-around items-center">
    <form
      @submit.prevent="loginWithEmailAndPassword"
      class="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
    >
      <div class="flex justify-center">
        <h1 class="text-3xl font-medium">Login</h1>
      </div>
      <label for="login_email" class="flex flex-col my-2">
        Email
        <input
          type="email"
          id="login_email"
          v-model.trim="loginForm.email"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <label for="login_password" class="flex flex-col my-2">
        Password
        <input
          type="password"
          id="login_password"
          v-model.trim="loginForm.password"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <div className="flex flex-col mt-3">
        <button
          type="submit"
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
      <div class="flex justify-center">
        <a class="text-sm text-blue-700">Forgot Password</a>
      </div>
    </form>
    <form
      @submit.prevent="signUpWithEmailAndPassword"
      class="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
    >
      <div class="flex justify-center">
        <h1 class="text-3xl font-medium">Sign Up</h1>
      </div>
      <label for="sign_up_email" class="flex flex-col my-2">
        Email
        <input
          type="email"
          id="sign_up_email"
          v-model.trim="signUpForm.email"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <label for="sign_up_password" class="flex flex-col my-2">
        Password
        <input
          type="password"
          id="sign_up_password"
          v-model.trim="signUpForm.password"
          class="border border-gray-500 rounded shadow p-1"
        />
      </label>
      <div className="flex flex-col mt-3">
        <button
          type="submit"
          @click="loginWithEmailAndPassword"
          className="p-1 mb-2 border border-black rounded shadow bg-black text-white text-sm font-medium font-rubik"
        >
          Sign Up
        </button>
        <button
          type="button"
          @click="signInWithGoogle"
          className="p-1 mb-2 border border-black rounded shadow bg-red-700 text-white text-sm font-medium font-rubik"
        >
          Sign Up With Google
        </button>
      </div>
      <div v-show="false" class="flex justify-center">
        <a class="text-sm text-blue-700">Forgot Password</a>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { state, setUser } from '@/store';

import { auth, signInWithPopup, usersCollection } from '../firebase';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();

    const loginForm = reactive({
      email: '',
      password: '',
    });

    const signUpForm = reactive({
      email: '',
      password: '',
    });

    const loginWithEmailAndPassword = async () => {
      if (loginForm.email !== '' && loginForm.password !== '') {
        try {
          const { user } = await auth.signInWithEmailAndPassword(loginForm.email, loginForm.password);
          const { displayName, email, uid } = user;

          const dbUser = await usersCollection.doc(uid).get();

          if (dbUser.exists) {
            setUser(dbUser.data());
          }
        } catch (err) {
          setUser(null);
          console.error(err);
        }
      }
    };

    const signUpWithEmailAndPassword = async () => {
      if (signUpForm.email !== '' && signUpForm.password !== '') {
        try {
          const { user } = await auth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
          const { displayName, email, uid } = user;

          const dbUser = await usersCollection.doc(uid).get();

          if (!dbUser.exists) {
            await usersCollection.doc(uid).set({
              displayName: displayName || email,
              email,
              id: uid,
              uid,
            });

            setUser({
              displayName: displayName || email,
              email,
              id: uid,
              uid,
            });
          } else {
            console.log('user exists already create a toast to say this');
          }
        } catch (err) {
          setUser(null);
          console.error(err);
        }
      }
    };

    const signInWithGoogle = () => {
      signInWithPopup();
    };

    return {
      loginForm,
      signUpForm,
      signInWithGoogle,
      loginWithEmailAndPassword,
      signUpWithEmailAndPassword,
    };
  },
};
</script>
