<template>
<NavBar/>
  <div v-if="err" class="alert alert-danger" role="alert">
    {{spontaneousAlert}} &#10062;
  </div>
  <div v-if="deleteSuccess" class="alert alert-primary" role="alert">
    Message deleted successfully
  </div>
  <div v-show="nameBox">
    <div class="jumbotron">
      <h1 class="display-4 text-light">Welcome to Mongoose Chat</h1>
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
    <div class="card bg-dark text-light" style="width: 50rem; margin-right: auto; margin-left: auto; over-flow: hidden;">
      <div class="card-header bg-primary text-light">
        <img src="./assets/mgLogo.png"  style="width: 300px; height: 250px;" class="rounded mr-2 mx-auto" alt=".">
      </div>
      <ul class="list-group list-group-flush bg-dark" style="overflow:scroll; overflow-x: hidden; height:700px;">
        <div class="toast fade show" style="width: 100%;" role="alert" aria-live="assertive" aria-atomic="true" v-for="msg in bank" :key="msg">
          <div class="toast-header text-center">
            <strong class="" style="float: left;">{{msg.userName}}</strong>
            <small class="text-muted text-center">@{{toDate.toLocaleDateString("hi-IN", msg.createdAt)}}</small>
            <button type="button" class="btn float-right" aria-label="Close" @click="RemoveEntry(msg._id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-primary" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>  
            </button>
          </div>
          <div class="toast-body text-secondary" style="float: left;">
            {{msg.message}}
          </div>
        </div>    
      </ul>
      <li class="list-group-item bg-dark mx-auto">
        <form @submit.prevent="SendMessage" class="" style="width: 50px;">
            <input type="text" :value="name" hidden name="username" id="">  
            <input type="text" class="form-control" style="width: 400px;" name="msg" id="" v-model="message">
            <input type="submit" class="btn btn-primary" style="width:400px;" value="send" @submit="SendMessage">
        </form>
      </li>
    </div>
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
      deleteSuccess: false,
      file: null,
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
      }).then((response) => { //get response from DB which is the values just submitted, push to array
          this.bank.push(response.data)
        });
      this.message = ''
    } else {
        this.err = true
        this.ShowAlert("Message failed conditional check, please provide a message")
      }
    this.GetAll()
  },
  GetAll() {
    axios.get('http://localhost:3000/messages')
      .then(res => this.bank = res.data)
      .catch((err) => {
        console.log(err)
      })
    console.log('collecting')
  },
  RemoveEntry(temp) {
    console.log(temp)
    axios.delete("http://localhost:3000/remove/" + temp) //delete message by getting id 
      .then((res) => {
        document.location.reload()
        this.deleteSuccess = res.data
        console.log('console msg' + res.data)
        this.bank = []
        this.GetAll()
      }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted: function() { // get the messages when loading into the app
    axios.get('http://localhost:3000/messages')
      .then(res => this.bank = res.data)
      .catch((err) => {
        console.log(err)
      })
  },
  watch: {
    someObject: {
      handler() {
        this.bank
      },
      deep: true
    }
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

.one {
  color: red;
}
.two {
  color: blue;
}
</style>
