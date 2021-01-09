import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/css/tailwind.css';

import router from './router';
import store, { setUser } from './store';

import { auth } from './firebase';

let app;
auth.onAuthStateChanged(authUser => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount('#app');
  }

  if (authUser) {
    const { displayName, email, uid } = authUser;

    setUser({
      displayName,
      email,
      uid
    });
  } else {
    setUser(null);
  }
});
