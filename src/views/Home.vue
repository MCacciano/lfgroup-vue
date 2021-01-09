<template>
  <div class="home">
    <h1 class="text-3xl text-blue-700">Home Page</h1>
    <h2 v-if="user">{{ user.displayName }}</h2>
    <button
      @click="signInWithGoogle"
      class="border border-black rounded shadow bg-red-700 text-white font-medium p-1 cursor-pointer"
    >
      Google Sign In
    </button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { auth, signInWithPopup } from '../firebase';

export default {
  name: 'Home',
  setup() {
    const user = ref(null);

    const signInWithGoogle = () => {
      signInWithPopup();
    };

    onMounted(() => {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          const { displayName, email, uid } = authUser;
          console.log(authUser);
          user.value = {
            displayName,
            email,
            uid,
          };
        } else {
          user.value = null;
        }
      });
    });

    return {
      user,
      signInWithGoogle,
    };
  },
};
</script>
