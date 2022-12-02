<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="openNotification">Click</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { createWindowNotification } from "@/utils"

export default {
  name: "HomeView",

  components: {
    HelloWorld,
  },

  methods: {
    openNotification() {
      createWindowNotification({
        title: "Notification title",
        body: "Notification body",
        onClick: (e, notification) => { console.log(notification); }
      });
    }
  }
}
</script>
