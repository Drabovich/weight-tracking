import UButton from '@/ui-kit/UButton.vue';
import UCalendar from '@/ui-kit/UCalendar.vue';
import UCalendarRange from '@/ui-kit/UCalendarRange.vue';
import UInput from '@/ui-kit/UInput.vue';

const components = [
  { name: 'UButton', component: UButton },
  { name: 'UCalendar', component: UCalendar },
  { name: 'UCalendarRange', component: UCalendarRange },
  { name: 'UInput', component: UInput }
];

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  }
};
