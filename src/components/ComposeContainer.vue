<template>
  <div class="compose-container">
    <div class="input-section">
      <textarea
        class="input-box"
        type="text"
        v-model="userMsg"
        placeholder="Enter your message here"
        @keyup.enter="sendButtonClicked"
        rows="3"
      >
      </textarea>
      <button class="send-btn" @click="sendButtonClicked">Send</button>
    </div>
    <div id="errorMsg" class="err-msg hidden">No message to send</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      userMsg: "",
    };
  },
  computed: {
    ...mapState(["conversation", "currentUser"]),
  },
  methods: {
    ...mapActions(["sendMessage"]),
    sendButtonClicked() {
      if (this.userMsg.trim() === "") {
        this.showErrorMsg();
        return;
      }

      let msgDetails = this.getMessageDetails();
      this.sendMessage(msgDetails);
      this.userMsg = "";
    },
    getMessageDetails() {
      let todayDate = new Date().toISOString().split("T");
      let newMsg = {
        id: this.conversation.length + 1,
        from: this.currentUser,
        message: this.userMsg.trim(),
        date: todayDate[0] + " " + todayDate[1].split(".")[0],
      };
      return newMsg;
    },
    showErrorMsg() {
      const errMsgEle = document.getElementById("errorMsg");
      errMsgEle.classList.remove("hidden");
      errMsgEle.classList.add("show");
      setTimeout(function () {
        errMsgEle.classList.remove("show");
        errMsgEle.classList.add("hidden");
      }, 2000);
    },
  },
};
</script>
<style scoped>
.compose-container {
  width: 510px;
  background-color: floralwhite;
  margin: auto;
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.input-section {
  display: flex;
  align-items: center;
}
.err-msg {
  font-style: italic;
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.hidden {
  display: none;
}
.show {
  display: block;
}
.send-btn {
  margin-left: 12px;
  width: 60px;
}
.input-box {
  width: 82%;
}
</style>
