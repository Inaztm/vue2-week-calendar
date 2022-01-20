import WeekCalendar from './components/WeekCalendar.vue';
import createApp from './createApp';

if (process.env.NODE_ENV === 'development') {
  createApp();
}

export default WeekCalendar;
