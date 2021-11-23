import { SET_LIST } from "@/store/mutation.types";

export default {
  namespaced: true,

  state: () => ({
    list: [],
  }),

  mutations: {
    [SET_LIST](state, payload) {
      state.list = payload;
    },
  },

  actions: {
    setList({ commit }, payload) {
      commit(SET_LIST, payload);
    },
    addToList({ commit, state }, payload) {
      const list = state.list;

      list.push(payload);

      commit(SET_LIST, list);
    },
    clearList({ commit }) {
      commit(SET_LIST, []);
    },
  },
};
