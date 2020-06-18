export const state = () => ({
  user: {
    email: null,
    position: null,
  },
});

export const mutations = {
  addUser(state, payload) {
    state.user = {
      ...state.user,
      email: payload.email,
      position: payload.position ? payload.position : null,
    };
  },
  removeUser(state) {
    state.user = {
      ...state.user,
      email: null,
      position: null,
    };
  },
};
