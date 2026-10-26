const applied = new Date(2026, 10, 28);
const followUp = applied;
followUp.setDate(followUp.getDate() + 7);

console.log('Applied:  ', applied.toDateString());
console.log('Follow-up:', followUp.toDateString());
