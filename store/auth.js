export const state = () => ({
  user: {
    email: "",
  },
});

export const mutations = {
  add(state, payload) {
    state.user = {
      ...state.user,
      email: payload.email,
    };
  },
};
