<template lang="html">
  <section style="width: 28.6%; margin: 0 auto">
    <WeekCalendar v-model="mydate" month-format="MMMM" years-format="yyy">
      <!-- <template v-slot:years="{ years, next, prev, isEqual, change }">
        {{ years }}
        {{ isEqual(mydate, years[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
        <button @click="() => change(years[0])">Change 0 index</button>
      </template>

      <template v-slot:months="{ months, next, prev, isEqual, change }">
        {{ months }}
        {{ isEqual(mydate, months[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
        <button @click="() => change(months[0])">Change 0 index</button>
      </template>

      <template v-slot:days="{ days, next, prev, isEqual, change }">
        {{ days }}
        {{ isEqual(mydate, days[0]) }}
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
        <button @click="() => change(days[0])">Change 0 index</button>
      </template> -->
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
