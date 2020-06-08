export const state = () => ({
  user: {
    email: null,
    error: null,
  },
});

export const mutations = {
  addUser(state, payload) {
    state.user = {
      ...state.user,
      email: payload.email,
      error: null,
    };
  },
  removeUser(state) {
    state.user = { ...state.user, email: null, error: null };
    console.log("logout");
  },
  addError(state, payload) {
    state.user = {
      ...state.user,
      email: null,
      error: payload,
    };
  },
};

export const actions = {
  registerUser(context, payload) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => resolve())
        .catch((err) => {
          context.commit("addError", err.message);
          reject(err.message);
        });
    });
  },
  loginUser(context, payload) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => resolve())
        .catch((err) => {
          context.commit("addError", err.message);
          reject(err.message);
        });
    });
  },
  removeUser(context) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .signOut()
        .then(() => {
          context.commit("removeUser");
          resolve();
        })
        .catch((err) => {
          context.commit("addError", err.message);
          reject(err.message);
        });
    });
  },
};
