<template>
  <div class="messages-container" ref="messagesContainer">
    <div v-for="msg in formatData" :key="msg.id">
      <MessageComponent :msgData="msg" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MessageComponent from "./MessageComponent.vue";

export default {
  props: ["data"],
  components: {
    MessageComponent,
  },
  data() {
    return {
      formattedData: [],
    };
  },
  computed: {
    ...mapState(["conversation", "currentUser"]),
    formatData() {
      let rawData = this.data;
      rawData.forEach((msg) => {
        msg["msgOut"] = msg.from.firstName === this.currentUser.firstName;
      });

      return rawData;
    },
  },
  mounted() {
    this.scrollToLastMessage();
  },
  updated() {
    this.scrollToLastMessage();
  },
  methods: {
    scrollToLastMessage() {
      const lastChildElement = this.$refs.messagesContainer.lastElementChild;
      lastChildElement?.scrollIntoView({
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.messages-container {
  width: 500px;
  height: 400px;
  overflow: scroll;
  background-color: lightsteelblue;
  margin: auto;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
