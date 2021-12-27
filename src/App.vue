<template lang="html">
  <section>
    <WeekCalendar v-model="mydate"></WeekCalendar>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import WeekCalendar from './components/WeekCalendar.vue';

export default Vue.extend({
  data() {
    return {
      mydate: new Date(),
    };
  },
  components: { WeekCalendar },
});
</script>

<style scoped>
</style>
