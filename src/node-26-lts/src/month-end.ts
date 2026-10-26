const date = new Date(2026, 0, 31);
date.setMonth(date.getMonth() + 1);
console.log('Date:    ', date.toDateString());

const plain = Temporal.PlainDate.from('2026-01-31').add({ months: 1 });
console.log('Temporal:', plain.toString());
