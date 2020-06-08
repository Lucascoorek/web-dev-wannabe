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
  removeUser(state) {
    state.user.email = null;
    console.log("logout");
  },
};

export const actions = {
  registerUser(context, payload) {
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
  loginUser(context, payload) {
    this.$fireAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((cred) => {
        console.log("loged in");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeUser(context) {
    this.$fireAuth.signOut().then(() => context.commit("removeUser"));
  },
};
