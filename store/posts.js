export const state = () => ({
  posts: [],
  loading: false,
});

export const mutations = {
  addPosts(state, payload) {
    state.posts = [...payload.posts];
    state.loading = false;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
};
