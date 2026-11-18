// peek.mjs: one call with tools; print what the model sends back
import { tools } from './tools.mjs';

const res = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'qwen3:4b-instruct',
    messages: [
      { role: 'user', content: process.argv[2] },
    ],
    tools,
    stream: false,
    think: false,
  }),
});

const data = await res.json();
console.log(JSON.stringify(data.message, null, 2));
