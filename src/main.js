import './assets/main.css';
import 'v-calendar/style.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import globalIcons from '@/components/Icons';
import globalUiKit from '@/ui-kit';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

const app = createApp(App);
app.use(globalIcons);
app.use(globalUiKit);
app.use(autoAnimatePlugin);
app.mount('#app');
