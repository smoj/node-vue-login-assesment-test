<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="notification is-info is-light">
            <!-- <button class="delete"></button> -->
            <div class="field">
              <label class="label">Username</label>
              <div class="control mb-3">
                <input v-model="username" class="input" type="text" placeholder="Text input">
              </div>
              <label class="label">Password</label>
              <div class="control mb-3">
                <input v-model="password" class="input" type="password" placeholder="Text input">
              </div>
              <button @click="loginFxn()" class="button">Login</button>
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

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  public username: string;
  public password: string;

  constructor() {
    super();
    this.username = '';
    this.password = '';
  }

  loginFxn(){
    const userDetails = {
      username : this.username,
      password : this.password
    }
    console.log('details:', userDetails);
  }
}
</script>

<style lang="scss" src="../assets/styles.scss"></style>

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
