<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
      <div>
        <InputText v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error" placeholder="Email"/>
        <span v-if="v$.email.$error && submitted">
          <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
            <small class="p-error">{{error.$message}}</small>
          </span>
        </span>
        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
      </div>
      
      <div>
        <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask :feedback='false' placeholder="Password"></Password>
        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
      </div>
      <small v-if="error" class="p-error">{{ error }}</small>
    <Button type="submit" label="Login" class="p-mt-2" />
  </form>
</template>


<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import useLogin from '../composables/useLogin'

export default {
  setup () {
    const { login, error } = useLogin()
    const router = useRouter()

    const state = reactive({
      email: '',
      password: ''
    })

    const rules = {
     email: { required, email }, // Matches state.contact.email
     password: { required }
    }
    
    const submitted = ref(false);
    
    const v$ = useVuelidate(rules, state)

    const handleSubmit = async (isFormValid) => {
            submitted.value = true;
            await login(state.email, state.password)

            if (!isFormValid) {
                return;
            }
            
            if (!error.value) {
              router.push('/home')
            }
            
            console.log('CORRECT WORKING')
            resetForm()

        }

    const resetForm = () => {
            state.email = '';
            state.password = '';
            submitted.value = false;
    }

    return { state, v$, handleSubmit, submitted, error}
  }
}
</script>

<style>
</style>
