<template>
<NavBar/>
  <div v-if="err" class="alert alert-danger" role="alert">
    {{spontaneousAlert}} &#10062;
  </div>
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
    <div class="card bg-dark text-light" style="width: 100rem; margin-right: auto; margin-left: auto; over-flow: hidden;">
      <div class="card-header bg-primary text-light">
        Tavis chat &#10024;
      </div>
      <ul class="list-group list-group-flush bg-dark" style="over-flow: hidden;" v-for="msg in bank" :key="msg">
        <li class="list-group-item bg-dark text-light"> <span class="border border-primary">from: {{msg.userName}} | </span> 
        <span class="border border-primary">@{{toDate.toLocaleDateString("hi-IN", msg.createdAt)}} | </span>
        <span class=" border border-primary"> content: {{msg.message}} </span>
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </li>
      </ul>
    </div>
    <form @submit.prevent="SendMessage" style="float: left; margin-left: 160px;">
      <input type="text" :value="name" hidden name="username" id="">  
      <input type="text" style="width: 700px;" name="msg" id="" v-model="message">
      <input type="submit" class="btn btn-primary" value="send" @submit="SendMessage">
    </form>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import axios from 'axios'
window.axios = require('axios')
export default {
  components: { NavBar },
 data() {
   return {
      spontaneousAlert: "",
      message: null,
      name: null,
      canChat: false,
      nameBox: true,
      bank: [],
      mData: null,
      toDate: new Date(),
      err: false,
   }
 },
 methods: {
   ShowAlert(para) {
     this.spontaneousAlert = para
   },
    SendName() {
        if (this.name && this.name != null) {
          console.log("Name added to array successfully");
          this.canChat = true
          this.nameBox = false
        } else {
          console.log("named failed")
          this.nameBox = true
          this.err = true
        }
      },
      SendMessage() { //validtae messages and send messages to DB
        if (this.message && this.message != null) {
          console.log("Message added to array successfully");
          this.ShowAlert("Message passed")
          
          axios.post('http://localhost:3000/add-msg', { // make post request to api to submit data to DB
            username: this.name,
            msg: this.message
          }) .then((response) => { //get response from DB which is the values just submitted, push to array
            this.bank.push(response.data)
          });

          this.message = ''
        } else {
          this.err = true
          this.ShowAlert("Message failed conditional check, please provide a message")
        }
      },
    create() {
        //await Service.make
      }
 },
 mounted: function() { // get the messages when loading into the app
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
}
</style>
