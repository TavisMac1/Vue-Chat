<template>
  <div v-show="nameBox">
    <div class="jumbotron">
      <h1 class="display-4 text-light">Welcome to Tavis Chat</h1>
      <p class="lead text-light">Enter a username here to be able to chat</p>
      <hr class="my-4" style="color: dodgerblue;">
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="https://github.com/TavisMac1?tab=repositories" role="button">Github</a>
      </p>
    </div>
    <form @submit.prevent="SendName">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-primary">&#9889;</span>
        </div>
        <input v-model="name" placeholder="Username" type="text" class="form-control bg-light" aria-label="Amount (to the nearest dollar)">
        <input @submit="SendName" placeholder="Submit name" type="submit" class="form-control bg-light" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
          <span class="input-group-text bg-primary">&#9749;</span>
        </div>
      </div>
    </form>
  </div>
  <div v-show="canChat">
    <div class="card" style="width: 30rem; margin-right: auto; margin-left: auto; over-flow: hidden;">
      <div class="card-header">
        Chat room! {{spontaneousAlert}}
      </div>
      <ul class="list-group list-group-flush" style="over-flow: hidden;" v-for="msg in bank" :key="msg">
        <li class="list-group-item">from: {{msg.userName}} | @{{toDate.toLocaleDateString("hi-IN", msg.createdAt)}} | content: {{msg.message}}</li>
      </ul>
    </div>
    <form @submit.prevent="SendMessage">
      <input type="text" name="" id="" v-model="message"> 
      <input type="submit" class="btn btn-primary" value="send" @submit="[SendMessage, create]">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
window.axios = require('axios')
export default {
 data() {
   return {
      spontaneousAlert: "",
      message: null,
      name: null,
      canChat: false,
      nameBox: true,
      bank: [],
      mData: null,
      toDate: new Date()
   }
 },
 methods: {
   ShowAlert(para) {
     this.spontaneousAlert = para
   },
    SendName() {
        if (this.name && this.name != null) {
          this.bank.push(this.name)
          console.log("Name added to array successfully");
          this.canChat = true
          this.nameBox = false
        } else {
          console.log("named failed")
          this.nameBox = true
        }
      },
    SendMessage() {
        if (this.message && this.message != null) {
          this.bank.push(this.message)
          console.log("Message added to array successfully");
          this.ShowAlert("Message passed")
          this.message = ''
        } else {
          this.ShowAlert("Message failed conditional check, please provide an message")
        }
      },
    create() {
        //await Service.make
      }
 },
 mounted: function() {
   axios.get('http://localhost:3000/messages')
    .then(res => this.bank = res.data)
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
