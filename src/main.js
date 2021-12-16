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
import Sidebar from 'primevue/sidebar'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import OverlayPanel from 'primevue/overlaypanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Chart from 'primevue/chart'
import Card from 'primevue/card'
import TabMenu from 'primevue/tabmenu'
import Toolbar from 'primevue/toolbar'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import RadioButton from 'primevue/radiobutton'
import FileUpload from 'primevue/fileupload'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'

// PrimeVue Imports
import 'primevue/resources/themes/saga-orange/theme.css'  //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'                           //icons
import './assets/main.css'

const app = createApp(App);

app.use(router)
app.use(PrimeVue)
app.use(ToastService)

// PrimeVue Components Mounting
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('Password', Password)
app.component('Calendar', Calendar)
app.component('Sidebar', Sidebar)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('OverlayPanel', OverlayPanel)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Chart', Chart)
app.component('Card', Card)
app.component('TabMenu', TabMenu)
app.component('Toolbar', Toolbar)
app.component('Toast', Toast)
app.component('RadioButton', RadioButton)
app.component('FileUpload', FileUpload)
app.component('Textarea', Textarea)
app.component('InputNumber', InputNumber)

app.mount("#app");
