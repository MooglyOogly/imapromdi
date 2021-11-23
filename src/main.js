import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config'

// PrimeVue Components Import
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Calendar from 'primevue/calendar'
import InputMask from 'primevue/inputmask'

// PrimeVue Imports
import 'primevue/resources/themes/lara-light-teal/theme.css'  //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import './assets/main.css'

const app = createApp(App);

app.use(router)
app.use(PrimeVue)

// PrimeVue Components Mounting
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('Password', Password)
app.component('Calendar', Calendar)

app.mount("#app");
