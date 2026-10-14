import { computed, signal } from '@angular/core';

const count = signal(1);
const double = computed(() => {
  console.log('calc');
  return count() * 2;
});
count.set(2);
count.set(3);
console.log(double(), double());
