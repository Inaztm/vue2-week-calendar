import Vue from 'vue';
import WeekCalendar from './components/WeekCalendar.vue';
import App from './App.vue';

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false;

  new Vue({
    render: (h) => h(App),
  }).$mount('#app');
}

export default WeekCalendar;
