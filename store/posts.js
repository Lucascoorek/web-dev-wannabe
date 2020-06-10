export const state = () => ({
  posts: [],
});

export const mutations = {
  addPosts(state, payload) {
    state.posts = [...payload.posts];
  },
};
