<template>
  <div>
    <div v-if="msgData.msgOut" class="msg-cntr out-msg-ctnr">
      <div class="message msg-out">{{ msgData.message }}</div>
      <img
        :src="msgData.from.thumbnail"
        alt="user"
        :title="msgData.from.firstName"
        class="thumbnail-style"
      />
    </div>
    <div v-else class="msg-cntr in-msg-ctnr">
      <img
        :src="msgData.from.thumbnail"
        alt="user"
        :title="msgData.from.firstName"
        class="thumbnail-style"
      />
      <div class="message msg-in">{{ msgData.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msgData"],
};
</script>

<style>
.message {
  display: inline-block;
  max-width: 40%;
  border-radius: 8px;
  padding: 8px;
}
.msg-out {
  background: #407fff;
  color: white;
  margin-right: 12px;
}
.msg-in {
  background: #f1f0f0;
  color: black;
  margin-left: 12px;
}
.thumbnail-style {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}
.msg-cntr {
  display: flex;
  margin-bottom: 10px;
  align-items: end;
}
.out-msg-ctnr {
  justify-content: flex-end;
}
.in-msg-ctnr {
  justify-content: flex-start;
}
</style>
