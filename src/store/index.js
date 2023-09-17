import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: {},
    conversation: [],
    savedConversation: [],
  },
  getters: {},
  mutations: {
    SET_LOADING(state) {
      state.loading = true;
    },
    RESET_LOADING(state) {
      state.loading = false;
    },
    SET_CURRENT_USER_DATA(state, payload) {
      state.currentUser = payload;
    },
    RESET_CURRENT_USER_DATA(state) {
      state.currentUser = {};
    },
    SET_CONVERSATION_DATA(state, payload) {
      state.conversation = payload;
    },
    RESET_CONVERSATION_DATA(state) {
      state.conversation = [];
    },
    SET_SAVED_CONVERSATION(state, payload) {
      state.savedConversation = payload;
    },
  },
  actions: {
    async fetchJSONData() {
      try {
        const res = await axios.get("mockData.json");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    fetchCurrentUser({ commit, dispatch }) {
      commit("SET_LOADING");
      commit("RESET_CURRENT_USER_DATA");
      dispatch("fetchJSONData")
        .then((res) => {
          let userData = res[res.currentUser];
          commit("SET_CURRENT_USER_DATA", userData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          commit("RESET_LOADING");
        });
    },
    fetchConversation({ commit, dispatch }) {
      commit("SET_LOADING");
      commit("RESET_CONVERSATION_DATA");
      dispatch("fetchJSONData")
        .then((res) => {
          let conversationData = res.messages;
          commit("SET_CONVERSATION_DATA", conversationData);
          commit("SET_SAVED_CONVERSATION", conversationData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          commit("RESET_LOADING");
        });
    },
    async sendMessage({ state, commit }, payload) {
      try {
        let updatedConversation = [...state.conversation, payload];
        commit("SET_CONVERSATION_DATA", updatedConversation);
        await axios.post("mockData.json", payload); // this call will fail
      } catch (err) {
        // creating random function (for point 5.3) for random chance of success
        let randomNumer = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        if (randomNumer > 3) {
          return true;
        } else {
          commit("SET_CONVERSATION_DATA", state.savedConversation);
          console.log(err);
        }
      }
    },
  },
  modules: {},
});
