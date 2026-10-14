import { computed, signal } from '@angular/core';

const count = signal(0);
const double = computed(() => count() * 2);

count.set(3);
console.log(count(), double());

count.update((n) => n + 1);
console.log(count(), double());
