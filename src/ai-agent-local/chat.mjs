// chat.mjs: one question to the local model, no tools
const res = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'qwen3:4b-instruct',
    messages: [
      { role: 'user', content: process.argv[2] },
    ],
    stream: false,
    think: false,
  }),
});

const data = await res.json();
console.log(data.message.content);
