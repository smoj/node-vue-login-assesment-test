<template>
  <div id="app">
    <div class="container app-section">
      <div class="columns">
        <div class="column is-8 is-offset-2 is-8-mobile is-offset-2-mobile">
          <div class="login-box animate__animated animate__fadeIn my-4">
            <div class="columns is-gapless">
              <div class="column is-7 pos-relative" v-bind:class="{'brand-image': !loggedIn, 'brand-dashboard': loggedIn, 'animate__animated' : loggedIn, 'animate__fadeIn' : loggedIn}">
                <div class="brand-gradient"></div>
                <template v-if="loggedIn">
                  <div class="columns is-multiline m-0 p-5">
                  <div class="column is-full-mobile is-half-desktop">
                    <div class="card">
                      <div class="card-content">
                        <div class="content has-text-left">
                          <h3 class="title is-white is-3 mb-1">$34,000</h3>
                          <p>Account Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column is-full-mobile">
                    <div class="card">
                      <div class="card-content">
                        <div class="content has-text-left">
                          <h3 class="title is-white is-3 mb-1">$15,000</h3>
                          <p>Expenditures</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column is-full-mobile">
                    <div class="card">
                      <div class="card-content">
                        <div class="content has-text-left">
                          <h3 class="title is-white is-3 mb-1">20</h3>
                          <p>Invoices Due</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </template>
                <div v-if="!loggedIn" class="taglines has-text-left p-4 mx-4 has-text-white font-montserrat">
                  <h1 class="is-size-4 has-text-weight-bold line-height mb-3">Around the world in 30 minutes</h1>
                  <p class="is-size-7 my-1">Varela Point is the newest fintech app that aims to solve financial problems</p>
                </div>
                <!-- <img class="remove-image-bottom-gap" src="../assets/brand-image.jpg" alt=""> -->
              </div>
              <div class="column is-5">
                <div v-if="loggedIn" class="p-6">
                  <h1 class="is-size-4 has-text-left has-text-weight-bold line-height my-4">Welcome back</h1>
                  <!-- <h1 class="is-size-7 gray has-text-left has-text-weight-medium font-montserrat line-height my-5">Welcome back</h1> -->
                  <p class="menu-label has-text-left">
                    Jane@Doe.com
                  </p>
                  <ul class="menu-list has-text-left">
                    <li><a>Refer a friend</a></li>
                    <li><a>2 Factor Authentication</a></li>
                    <li><a @click="logoutFxn()" class="warning">Logout</a></li>
                  </ul>
                </div>

                <div v-if="!loggedIn" class="p-6">
                  <h1 class="is-size-4 has-text-left has-text-weight-bold line-height my-4">Varela Point</h1>
                  <h1 class="is-size-7 gray has-text-left has-text-weight-medium font-montserrat line-height my-5">Please sign in with your account</h1>
                  <div class="field">
                    <!-- <label class="label">Username</label> -->
                    <div class="control mb-3">
                      <p v-if="errorMessage" class="pb-1 warning is-size-7 has-text-left has-text-weight-medium font-montserrat line-height"><i class="fa fa-envelope-o"></i> you@email.com</p>
                      <input v-model="username" @keypress.enter="loginFxn()" @keyup="checkEmail()" class="input" v-bind:class="{'is-danger': errorMessage}" type="text" placeholder="Email Address">
                    </div>
                    <!-- <label class="label">Password</label> -->
                    <div class="control mb-3">
                      <input v-model="password" @keypress.enter="loginFxn()" class="input" type="password" placeholder="Password">
                    </div>
                    <button :disabled="!processing && errorMessage" v-bind:class="{'is-loading': processing, 'is-danger': failed}" @click="loginFxn()" class="button is-link is-fullwidth has-text-weight-medium font-montserrat my-5">
                      <template v-if="!failed">
                        Login
                      </template>
                      <template v-if="failed">
                        Invalid Login
                      </template>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const toServer = axios.create({
  timeout: 20000,
  baseURL: process.env.NODE_ENV === 'production' ? 'https://audacitus.com/node-vue' : '',
});

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  public username: string;
  public password: string;
  public errorMessage : boolean = false;
  public processing: boolean = false;
  public loggedIn: boolean = false;
  public failed: boolean = false;

  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.errorMessage = false;
    this.processing = false;
    this.loggedIn = false;
    this.failed = false;
  }
  
  mounted(){
    document.title = 'VarelaPoint';
  }

  public checkEmail(){
    // console.log(`changed: ${this.username}`);
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const isValidEmail : boolean = pattern.test(this.username);
    this.errorMessage = (isValidEmail) ? false : true;
    // console.log(`test for ${this.username} as email is ${isValidEmail}. lenght is ${this.username.length}`);
    // console.log(`ErrorMessage: ${this.errorMessage}`);
  }

  logoutFxn(){
    this.loggedIn = false;
  }

  loginFxn(){
    if(this.errorMessage === false){
      this.processing = true;
      const userDetails = {
        username : this.username,
        password : this.password
      }
      // console.log('details:', userDetails);
      toServer.post('/login', userDetails).then((rsp)=>{
        // console.log('response: ', rsp.data)
        this.loggedIn = true;
      }).catch((err: AxiosError)=>{
        console.error('Error: ', err.message);
        this.loggedIn = false;
        this.failed = true;
        setTimeout(()=>{this.failed = false}, 3000);
      }).finally(()=>{
        this.processing = false;
      })
    }
    else{
      // console.log('loginFxn triggered but not valid')
    }
  }
}
</script>

<style lang="scss" src="../assets/styles.scss"></style>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Montserrat&display=swap";
@import "https://fonts.googleapis.com/css?family=Poppins&display=swap";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>

<style scoped>
.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.login-box {
  background: #FFFFFF;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: relative;
}
.add-blur {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.overlay::before {
  backdrop-filter: grayscale(0.5) opacity(0.8);
  content: 'Hello';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgb(0 0 0 / 35%);
  border-radius: 10px;
}
.taglines{
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
}
.font-montserrat {
  font-family:Montserrat;
}
.pos-relative { position: relative;}
.brand-gradient {
  background-image:linear-gradient(0deg, rgba(131.00000739097595, 58.00000034272671, 180.00000447034836, 1) 0%,rgba(253.0000001192093, 29.000000171363354, 29.000000171363354, 1) 50%,rgba(252.00000017881393, 176.00000470876694, 69.00000348687172, 1) 100%) ;
	opacity:1;
  width: 7px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}
.remove-image-bottom-gap {
  display: block;
}
.line-height {
  line-height: 1.1em;
}
.gray {color: #666;}
.brand-image {
  background: url('../assets/brand-image.jpg');
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.app-section {
  margin-top : 20vh;
}
.warning {
  color: #e74c3c !important;
}
.brand-dashboard {
  background: #2c3e50;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
