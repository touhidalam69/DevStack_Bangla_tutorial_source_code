import { computed, signal } from '@angular/core';

const user = signal({ name: 'Rahim' });
const hello = computed(() => `Hi ${user().name}`);
console.log(hello());
user.update((u) => ({ ...u, name: 'Karim' }));
console.log(hello());
