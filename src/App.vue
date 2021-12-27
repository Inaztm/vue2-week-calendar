<template lang="html">
  <section>
    <WeekCalendar v-model="mydate">
      <template v-slot:years="{ years, next, prev, isEqual }">
        {{ years }}
        {{ isEqual(mydate, years[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
      </template>

      <template v-slot:months="{ months, next, prev, isEqual }">
        {{ months }}
        {{ isEqual(mydate, months[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
      </template>

      <template v-slot:days="{ days, next, prev, isEqual }">
        {{ days }}
        {{ isEqual(mydate, days[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
      </template>
    </WeekCalendar>
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
