const dhaka = Temporal.ZonedDateTime.from(
  '2026-11-02T10:00[Asia/Dhaka]',
);
const toronto = dhaka.withTimeZone('America/Toronto');

console.log('Dhaka:  ', dhaka.toPlainDateTime().toString());
console.log('Toronto:', toronto.toPlainDateTime().toString());
