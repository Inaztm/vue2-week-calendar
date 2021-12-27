<template lang="html">
    <section class="week-calendar">
        <slot
          name="years"
          :years="years"
          :prev="prevYear"
          :next="nextYear"
          :isEqual="isEqualYear"
          :change="changeYear"
        >
            <div class="week-calendar__years">
                <button class="button" @click="prevYear">
                    <i class="icon gg-arrow-left-r"></i>
                </button>
                <section
                    class="week-calendar__year"
                    v-for="(item, index) in years"
                    :key="index"
                    :class="{ 'week-calendar__year--active': isEqualYear(item, viewDate) }"
                    @click="() => changeYear(item)"
                >
                    {{ item | formatToYear }}
                </section>
                <button class="button" @click="nextYear">
                    <i class="icon gg-arrow-right-r"></i>
                </button>
            </div>
        </slot>
        <slot
          name="months"
          :months="months"
          :prev="prevMonth"
          :next="nextMonth"
          :isEqual="isEqualMoth"
          :change="changeMonth"
        >
            <div class="week-calendar__months">
                <button class="button" @click="prevMonth">
                    <i class="icon gg-arrow-left-r"></i>
                </button>
                <section
                    class="week-calendar__month"
                    v-for="(item, index) in months"
                    :key="index"
                    :class="{ 'week-calendar__month--active': isEqualMoth(item, viewDate) }"
                    @click="() => changeMonth(item)"
                >
                    {{ item | formatToMonthYear }}
                </section>
                <button class="button" @click="nextMonth">
                    <i class="icon gg-arrow-right-r"></i>
                </button>
            </div>
        </slot>
        <slot
          name="days"
          :days="days"
          :prev="prev"
          :next="next"
          :isEqual="isEqual"
          :change="changeDate"
        >
            <div class="week-calendar__days">
                <button class="button" @click="prev">
                    <i class="icon gg-arrow-left-r"></i>
                </button>
                <section
                    class="week-calendar__day"
                    v-for="(item, index) in days"
                    :key="index"
                    :class="{ 'week-calendar__day--active': isEqual(item, value) }"
                    @click="() => changeDate(item)"
                >
                    {{ item | formatToDay }}
                    <br >
                    {{ item | formatToDateDay }}
                </section>
                <button class="button" @click="next">
                    <i class="icon gg-arrow-right-r"></i>
                </button>
            </div>
        </slot>
    </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Vue from 'vue';
import {
  format, startOfWeek, endOfWeek, eachDayOfInterval,
  nextMonday, addDays, eachMonthOfInterval,
  addMonths, isEqual, startOfMonth, addYears,
  eachYearOfInterval, startOfYear, startOfDay
} from 'date-fns';

type FDate = number | Date;

export default Vue.extend({
  name: 'WeekCalendar',
  data() {
    return {
      viewDate: this.value,
      days: [] as Date[],
      months: [] as Date[],
      years: [] as Date[],
    };
  },
  props: ['value'],
  filters: {
    formatToDay: (value: FDate) => format(value, 'iiiiii'),
    formatToDateDay: (value: any) => format(value, 'd'),
    formatToMonthYear: (value: any) => format(value, 'MMMM'),
    formatToYear: (value: any) => format(value, 'yyyy'),
  },
  computed: {
    isEqual: () => (first: FDate, second: FDate) => (
      isEqual(startOfDay(first), startOfDay(second))
    ),
    isEqualMoth: () => (first: FDate, second: FDate) => (
      isEqual(startOfMonth(first), startOfMonth(second))
    ),
    isEqualYear: () => (first: FDate, second: FDate) => (
      isEqual(startOfYear(first), startOfYear(second))
    ),
  },
  mounted(): void {
    this.updateDates();
  },
  methods: {
    updateDates(): void {
      const days = eachDayOfInterval({
        start: startOfWeek(this.viewDate, { weekStartsOn: 1 }),
        end: endOfWeek(this.viewDate, { weekStartsOn: 1 }),
      });
      const months = eachMonthOfInterval({
        start: addMonths(this.viewDate, -1),
        end: addMonths(this.viewDate, 1),
      });
      const years = eachYearOfInterval({
        start: addYears(this.viewDate, -1),
        end: addYears(this.viewDate, 1),
      });
      this.days = days;
      this.months = months;
      this.years = years;
    },
    next(): void {
      this.viewDate = nextMonday(startOfWeek(this.viewDate, { weekStartsOn: 1 }));
      this.updateDates();
    },
    prev(): void {
      this.viewDate = addDays(startOfWeek(this.viewDate, { weekStartsOn: 1 }), -7);
      this.updateDates();
    },
    changeDate(value: FDate): void {
      this.$emit('input', value);
    },
    changeMonth(value: FDate): void {
      this.viewDate = value;
      this.updateDates();
    },
    changeYear(value: FDate): void {
      this.viewDate = value;
      this.updateDates();
    },
    nextYear(): void {
      this.viewDate = addYears(this.viewDate, 1);
      this.updateDates();
    },
    prevYear(): void {
      this.viewDate = addYears(this.viewDate, -1);
      this.updateDates();
    },
    nextMonth(): void {
      this.viewDate = addMonths(this.viewDate, 1);
      this.updateDates();
    },
    prevMonth(): void {
      this.viewDate = addMonths(this.viewDate, -1);
      this.updateDates();
    },
  },
  watch: {
    // eslint-disable-next-line
    value: function() {
      this.viewDate = this.value as FDate;
      this.updateDates();
    },
  },
});
</script>

<style lang="scss">
@import url('https://css.gg/arrow-left-r.css');
@import url('https://css.gg/arrow-right-r.css');

.week-calendar {
  --week-calendar-accent-color: #599455;
  --week-calendar-accent-text-color: #f5f5f5;
  --week-calendar-border-color: whitesmoke;
  --week-calendar-border-active-radius: 8px;
  --week-calendar-icon-color: #888;
  
  min-width: 218px;

  .py-3 {
    padding-top: 0.75rem; /* 12px */
    padding-bottom: 0.75rem; /* 12px */
  }

  .svg-img {
    width: 32px;
    height: 32px;
  }

  .button {
    display: flex;
    align-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  .icon {
    color: var(--week-calendar-icon-color);
  }
}
.week-calendar__days {
  display: grid;
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 0.75rem; /* 12px */
  border: 1px solid var(--week-calendar-border-color);
  grid-template-columns: 42px repeat(7,1fr) 42px;
}
.week-calendar__months {
  display: grid;
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 0.75rem; /* 12px */
  border: 1px solid var(--week-calendar-border-color);
  grid-template-columns: 42px repeat(3,1fr) 42px;
}
.week-calendar__years {
  display: grid;
  padding-top: 0.75rem; /* 12px */
  padding-bottom: 0.75rem; /* 12px */
  border: 1px solid var(--week-calendar-border-color);
  grid-template-columns: 42px repeat(3,1fr) 42px;
}

.week-calendar__day,
.week-calendar__month,
.week-calendar__year {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  user-select: none;
  align-items: center;
  justify-content: center;
}
.week-calendar__month,
.week-calendar__year {
  margin-left: 0.075rem; /* 1.2px */
  margin-right: 0.075rem; /* 1.2px */
  padding-left: 0.25rem; /* 4px */
  padding-right: 0.25rem; /* 4px */
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.week-calendar__day--active,
.week-calendar__month--active,
.week-calendar__year--active {
  background-color: var(--week-calendar-accent-color);
  color: var(--week-calendar-accent-text-color);
  border: 1px solid var(--week-calendar-border-color);
  border-radius: var(--week-calendar-border-active-radius);
  border-width: 1px;
}
</style>
