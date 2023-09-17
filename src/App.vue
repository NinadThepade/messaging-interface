<template>
  <div id="app">
    <MessagesContainer :data="conversation" />
    <ComposeContainer />
  </div>
</template>

<script>
import MessagesContainer from "./components/MessagesContainer.vue";
import ComposeContainer from "./components/ComposeContainer.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    MessagesContainer,
    ComposeContainer,
  },
  data() {
    return {
      loading: false,
      data: {},
    };
  },
  methods: {
    ...mapActions(["fetchCurrentUser", "fetchConversation"]),
  },
  created() {
    this.fetchCurrentUser();
    this.fetchConversation();
  },
  computed: {
    ...mapState(["conversation", "currentUser"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
