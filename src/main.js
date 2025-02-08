import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import './assets/tailwind.css';

const app = createApp(App);
app.use(createPinia());
app.use(PrimeVue, {
    theme: 'none'
});
app.mount('#app');
