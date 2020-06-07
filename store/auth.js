export const state = () => ({
  user: {
    email: null,
  },
});

export const mutations = {
  addUser(state, payload) {
    state.user = {
      ...state.user,
      email: payload.email,
    };
  },
};

export const actions = {
  addUser(context, payload) {
    this.$fireAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((cred) => {
        // context.commit({ type: "addUser", email: cred.user.email });
        console.log("registered");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
