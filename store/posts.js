export const state = () => ({
  posts: [],
  loading: false,
  currentPost: {
    content: null,
    date: { dateToJs: null, dateToTime: null },
    id: null,
    title: null,
    userEmail: null,
    userId: null,
    comments: [],
  },
});

export const mutations = {
  addPosts(state, payload) {
    state.posts = [...payload.posts];
    state.loading = false;
  },
  addPost(state, payload) {
    const {
      content,
      date: { dateToJs, dateToTime },
      id,
      title,
      userEmail,
      userId,
    } = payload;
    state.currentPost = {
      ...state.currentPost,
      content,
      date: { dateToJs, dateToTime },
      id,
      title,
      userEmail,
      userId,
    };
  },
  addComments(state, payload) {
    state.currentPost = {
      ...state.currentPost,
      comments: payload.comments,
    };
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
};
