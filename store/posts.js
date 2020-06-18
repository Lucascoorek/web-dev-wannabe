export const state = () => ({
  posts: [],
  loading: false,
  currentPost: null,
});

export const mutations = {
  addPosts(state, payload) {
    state.posts = [...payload.posts];
    state.loading = false;
  },
  addPost(state, payload) {
    state.currentPost = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
};
