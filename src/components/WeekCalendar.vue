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
                <button class="week-calendar__button week-calendar__justify-center" @click="prevYear">
                    <i class="week-calendar__icon gg-arrow-long-left"></i>
                </button>
                <section
                    class="week-calendar__year"
                    v-for="(item, index) in years"
                    :key="index"
                    :class="{ 'week-calendar__year--active': isEqualYear(item, viewDate) }"
                    @click="() => changeYear(item)"
                >
                    {{ item | formatToYear(yearsFormat) }}
                </section>
                <button
                  class="week-calendar__button week-calendar__justify-center"
                  @click="nextYear"
                >
                    <i class="week-calendar__icon gg-arrow-long-right"></i>
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
                <button class="week-calendar__button week-calendar__justify-center" @click="prevMonth">
                    <i class="week-calendar__icon gg-arrow-long-left"></i>
                </button>
                <section
                    class="week-calendar__month"
                    v-for="(item, index) in months"
                    :key="index"
                    :class="{ 'week-calendar__month--active': isEqualMoth(item, viewDate) }"
                    @click="() => changeMonth(item)"
                >
                    {{ item | formatToMonthYear(monthFormat) }}
                </section>
                <button
                  class="week-calendar__button week-calendar__justify-center"
                  @click="nextMonth"
                >
                    <i class="week-calendar__icon gg-arrow-long-right"></i>
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
                <button class="week-calendar__button week-calendar__justify-center" @click="prev">
                    <i class="week-calendar__icon gg-arrow-long-left"></i>
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
                <button
                  class="week-calendar__button week-calendar__justify-center"
                  @click="next"
                >
                    <i class="week-calendar__icon gg-arrow-long-right"></i>
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
  props: ['value', 'monthFormat', 'yearsFormat'],
  filters: {
    formatToDay: (value: FDate, formatTo: string) => format(value, formatTo || 'iiiiii'),
    formatToDateDay: (value: any, formatTo: string) => format(value, formatTo || 'd'),
    formatToMonthYear: (value: any, formatTo: string) => format(value, formatTo || 'MMM'),
    formatToYear: (value: any, formatTo: string) => format(value, formatTo || 'yyyy'),
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
    },
    prev(): void {
      this.viewDate = addDays(startOfWeek(this.viewDate, { weekStartsOn: 1 }), -7);
    },
    changeDate(value: FDate): void {
      this.$emit('input', value);
    },
    changeMonth(value: FDate): void {
      this.viewDate = value;
    },
    changeYear(value: FDate): void {
      this.viewDate = value;
    },
    nextYear(): void {
      this.viewDate = addYears(this.viewDate, 1);
    },
    prevYear(): void {
      this.viewDate = addYears(this.viewDate, -1);
    },
    nextMonth(): void {
      this.viewDate = addMonths(this.viewDate, 1);
    },
    prevMonth(): void {
      this.viewDate = addMonths(this.viewDate, -1);
    },
  },
  watch: {
    // eslint-disable-next-line
    value: function() {
      this.viewDate = this.value as FDate;
    },
    // eslint-disable-next-line
    viewDate: function() {
      this.updateDates();
    },
  },
});
</script>

<style lang="scss">
@import url('https://css.gg/arrow-long-left.css');
@import url('https://css.gg/arrow-long-right.css');

.week-calendar {
  --week-calendar-accent-color: #599455;
  --week-calendar-accent-text-color: #f5f5f5;
  --week-calendar-border-color: whitesmoke;
  --week-calendar-border-active-radius: 8px;
  --week-calendar-icon-color: #888;
  
  min-width: 218px;

  &__justify-rigth {
    justify-content: flex-end;
  }

  &__justify-center {
    justify-content: center;
  }

  &__button {
    display: flex;
    align-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  &__icon {
    color: var(--week-calendar-icon-color);
  }

  &__days,
  &__months,
  &__years {
    display: grid;
    padding-top: 0.3rem; /* 12px */
    padding-bottom: 0.3rem; /* 12px */
    border: 1px solid var(--week-calendar-border-color);
  }

  &__days {
    grid-template-columns: 42px repeat(7,1fr) 42px;
  }

  &__months,
  &__years {
    grid-template-columns: 42px repeat(3,1fr) 42px;
  }

  &__month,
  &__year {
    margin-left: 0.075rem; /* 1.2px */
    margin-right: 0.075rem; /* 1.2px */
    overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }

  &__day,
  &__month,
  &__year {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-align: center;
    user-select: none;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    
    &--active {
      background-color: var(--week-calendar-accent-color);
      color: var(--week-calendar-accent-text-color);
      border: 1px solid var(--week-calendar-border-color);
      border-radius: var(--week-calendar-border-active-radius);
      border-width: 1px;
    }
  }
}
</style>
