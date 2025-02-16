import 'reflect-metadata';
import App from '@/app/App.vue';
import router from '@/app/providers/router';
import pinia from '@/app/providers/store';
import vuetify from '@/app/providers/vuetify';

export const app = createApp(App);

app.use(router).use(pinia).use(vuetify);

app.mount('#app');
