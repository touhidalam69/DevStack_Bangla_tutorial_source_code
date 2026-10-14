import { linkedSignal, signal } from '@angular/core';

const options = signal(['Ground', 'Air']);
const selected = linkedSignal(() => options()[0]);
selected.set('Air');
console.log(selected());
options.set(['Sea', 'Rail']);
console.log(selected());
