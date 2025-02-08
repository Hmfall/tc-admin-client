import { createPinia } from 'pinia';
import { router } from '@/app/providers/router';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

export default pinia;
