export const state = () => ({
  user: {
    email: null,
    error: null,
    loading: false,
    uid: null,
    position: null,
  },
});

export const mutations = {
  addUser(state, payload) {
    state.user = {
      ...state.user,
      email: payload.email,
      uid: payload.uid,
      error: null,
      loading: false,
    };
  },
  removeUser(state) {
    state.user = {
      ...state.user,
      email: null,
      error: null,
      loading: false,
      uid: null,
      position: null,
    };
  },
  addError(state, payload) {
    state.user = {
      ...state.user,
      email: null,
      error: payload,
      loading: false,
      uid: null,
      position: null,
    };
  },
  setLoading(state, payload) {
    state.user.loading = payload;
  },
  addUserPosition(state, payload) {
    state.user.position = payload;
  },
};

export const actions = {
  registerUser(context, payload) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          const {
            user: { email, uid },
          } = data;
          return this.$fireStore.collection("users").doc(uid).set({
            email,
          });
        })
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
