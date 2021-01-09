import { computed, reactive, readonly } from 'vue';

// state
export const state = reactive({
  user: null
});

// getters
export const getUser = computed(() => state.user);

// mutations
export const setUser = user => {
  console.log('user', user);
  return (state.user = user);
};

export default { state: readonly(state), getUser, setUser };
