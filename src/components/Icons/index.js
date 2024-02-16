import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
import DeleteAllIcon from '@/components/Icons/DeleteAllIcon.vue';
import DeleteIcon from '@/components/Icons/DeleteIcon.vue';
import MenuIcon from '@/components/Icons/MenuIcon.vue';
import SortIcon from '@/components/Icons/SortIcon.vue';

const components = [
  { name: 'CalendarIcon', component: CalendarIcon },
  { name: 'DeleteAllIcon', component: DeleteAllIcon },
  { name: 'DeleteIcon', component: DeleteIcon },
  { name: 'SortIcon', component: SortIcon },
  { name: 'MenuIcon', component: MenuIcon }
];

export default {
  install(app) {
    components.forEach(({ name, component }) => {
      app.component(name, component);
    });
  }
};
