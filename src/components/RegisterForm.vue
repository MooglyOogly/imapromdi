<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
    <!-- Name Input and Validation -->
    <div>
      <InputText v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" placeholder="Name*"/>
      <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
    </div>

    <!-- Email Input and Validation -->
    <div class="p-input-icon-right">
      <i class="pi pi-envelope" />
      <InputText v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error" placeholder="Email*"/>
        <span v-if="v$.email.$error && submitted">
          <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
            <small class="p-error">{{error.$message}}</small>
          </span>
        </span>
      <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
    </div>

    <!-- Contact Number Input and Validation -->
    <div class="p-field p-input-icon-right">
      <i class="pi pi-mobile" />
      <InputMask v-model="v$.phoneNumber.$model" :class="{'p-invalid':v$.phoneNumber.$invalid && submitted}" mask="+639999999999" placeholder="Contact Number*"/>
        <span v-if="v$.phoneNumber.$error && submitted">
          <span id="contact-error" v-for="(error, index) of v$.phoneNumber.$errors" :key="index">
            <small class="p-error">{{error.$message.replace('Value', 'Contact')}}</small>
          </span>
        </span>
      <small v-else-if="(v$.phoneNumber.$invalid && submitted) || v$.phoneNumber.$pending.$response" class="p-error">{{v$.phoneNumber.required.$message.replace('Value', 'Contact')}}</small>
    </div>

    <!-- Barangay Input and Validation -->
    <div class="p-field">
      <Dropdown v-model="barangay" :options="barangays" optionLabel="name" placeholder="Select a Barangay"/>
    </div>

    <!-- Password Input and Validation -->
    <div>
      <Password v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask placeholder="Password*">
        <template #header>
          <h5>Pick a password</h5>
        </template>
        <template #footer="sp">
          {{sp.level}}
          <p class="p-mt-2">Suggestions</p>
          <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
            <li>At least one lowercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
          </ul>
        </template>
      </Password>
      <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
    </div>

    <!-- Confirm Password Input and Validation -->
    <div>
      <Password v-model="v$.confirmPassword.$model" :class="{'p-invalid':v$.confirmPassword.$invalid && submitted}" toggleMask :feedback=false placeholder="Confirm Password*"></Password>
        <span v-if="v$.confirmPassword.$error && submitted">
            <small class="p-error">{{v$.confirmPassword.sameAsPass.$message.replace(/value/g, 'password')}}</small>
        </span>
      <small v-else-if="(v$.confirmPassword.$invalid && submitted) || v$.confirmPassword.$pending.$response" class="p-error">{{v$.confirmPassword.required.$message.replace('Value', 'Password')}}</small>
    </div>
    <small v-if="error" class="p-error">{{ error }}</small>

    <Button type="submit" label="Register" class="p-mt-2" />
  </form>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { email, required, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import useSignup from '../composables/useSignup'

export default {
  setup() {
    const { signup, error } = useSignup()
    const router = useRouter()

    const barangays = ref([
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
    ]);
    
    const state = reactive({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    })
    
    const rules = computed(() => ({
      name: { required },
      email: { required, email },
      phoneNumber: { required },
      password: { required },
      confirmPassword: {  required, sameAsPass: sameAs(state.password) }
    }))

    const submitted = ref(false)
    const barangay = ref('')
    
    const v$ = useVuelidate(rules, state)

    const handleSubmit = async (isFormValid) => {
            submitted.value = true;
            
            console.log(state.phoneNumber)

            if (!isFormValid) {
                return;
            }

            await signup(state.email, state.password, state.name, state.phoneNumber, barangay.value)
            
            if (!error.value) {
              router.push('/dashboard')
              resetForm()
            }
            
        }

    const resetForm = () => {
            state.name = '';
            state.email = '';
            state.phoneNumber = '';
            barangay.value = '';
            state.password = '';
            state.confirmPassword = '';
            submitted.value = false;
    }

    return { state, v$, handleSubmit, submitted, barangays, barangay, error }
  }
};
</script>

<style>
.p-dropdown {
  text-align: left;
}
.p-field {
  margin-bottom: 0.75rem;
}
</style>