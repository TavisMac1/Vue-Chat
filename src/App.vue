<template>
  <h1> {{test}} </h1>
  <form @submit.prevent="SendMessage">
    <h4> {{spontaneousAlert}} </h4>
    <input type="text" name="" id="" @click="ShowAlert" v-model="message">
    <input type="submit" value="send" @submit="SendMessage">
  </form>
</template>

<script>

export default {
 data() {
   return {
      spontaneousAlert: "",
      message: 'Hello',
      messageBank: []
   }
 },
 methods: {
   ShowAlert() {
     this.spontaneousAlert = "Type a message and press submit to send it"
   },
   ShowText() {
        this.test = ""
      },
   SendMessage() {
        if (this.test != "" || this.test != null) {
          this.messageBank.push(this.test)
          console.log("Message added to array successfully");
          console.log(this.messageBank[0])
        }
      },
 }
}
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
