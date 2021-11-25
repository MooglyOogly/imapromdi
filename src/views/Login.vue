<template>
  <main>
    <div class="welcome container">
      <div v-if="showLogin">
        <h2>Login</h2>
        <LoginForm/>
        <p>No account yet? <span class="link" @click="showLogin = false">Register</span> instead.</p>
      </div>
      <div v-else>
        <h2>Register</h2>
        <RegisterForm/>
        <p>Already registered? <span class="link" @click="showLogin = true">Login</span> instead.</p>
      </div>
    </div>
  </main>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import {ref} from 'vue'

export default {
  components: {LoginForm, RegisterForm}, 
  setup() {
    const showLogin = ref(true)
    
    return {showLogin}
  }
}
</script>

<style>
  .welcome {
    text-align: center;
    padding: 20px 0;
  }
  /* form styles */
  .welcome form {
    width: 300px;
    margin: 20px auto;
  }
  .welcome label {
    display: block;
    margin: 20px 0 10px;
  }
  .welcome input {
    width: 100%;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
  }
  .welcome .link{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    color: teal
  }
  .welcome button {
    margin: 20px auto;
  }
</style>
