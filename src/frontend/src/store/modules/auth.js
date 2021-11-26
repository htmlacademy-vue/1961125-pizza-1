export default {
  namespaced: true,

  state: () => ({
    user: null,
    userAddresses: [],
  }),

  getters: {
    isAuth: (state) => !!state.user?.id,
  },
};
