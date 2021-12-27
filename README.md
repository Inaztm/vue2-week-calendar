# vue2-week-calendar

> A Week (years, days) Component For Vue2
<a href="https://www.npmjs.com/package/vue2-week-calendar">
  <img src="https://img.shields.io/npm/v/vue2-week-calendar.svg" alt="npm">
</a>
<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT">
</a>

## Example
<img src="screenshot.png" width="400"/>

## Install

```bash
$ npm install vue2-week-calendar --save
```

## Usage

```html
<script>
  import WeekCalendar from 'vue2-week-calendar';
  export default {
    components: { WeekCalendar },
    data() {
      return {
        time1: new Date(),
      };
    },
  };
</script>

<template>
  <div>
    <WeekCalendar v-model="time1"></WeekCalendar>
  </div>
</template>
```

### Slots (coming soon)

| Name          | Description              |
| ------------- | ------------------------ |
| months        | custom months template   |
| years         | custom years template    |
| days          | custom days template     |

<!-- ## ChangeLog (coming soon)

[CHANGELOG](CHANGELOG.md) -->

<!-- ## One-time Donations

If you find this project useful, you can buy me a coffee

[Paypal Me](https://www.paypal.me/)

![donate](https://user-images.githubusercontent.com//.png) -->

<!-- ## License

[MIT](https://github.com/Inaztm/vue2-week-calendar/blob/main/LICENSE)

Copyright (c) 2021-present inaztm -->

## Dev

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Compiles and minifies for production library
```
yarn build-lib
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```
