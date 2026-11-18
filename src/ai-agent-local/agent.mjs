// agent.mjs: the model decides, our code acts, in a loop
import { tools, runTool } from './tools.mjs';

const system = `You answer questions about my expenses.
Amounts are in Bangladeshi Taka (Tk).
You are in a loop: call tools as many times as you need.
Never do math yourself. Use the calculate tool for every sum.`;

const messages = [
  { role: 'system', content: system },
  { role: 'user', content: process.argv[2] },
];

for (let step = 1; step <= 5; step++) {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      model: 'qwen3:4b-instruct', messages, tools,
      stream: false, think: false,
    }),
  });
  const { message } = await res.json();
  messages.push(message);

  if (!message.tool_calls) {
    console.log(message.content);
    break;
  }
  for (const call of message.tool_calls) {
    const { name, arguments: args } = call.function;
    const result = runTool(name, args);
    console.log(`step ${step}: ${name}`, args);
    console.log(result);
    messages.push({ role: 'tool', tool_name: name, content: result });
  }
}
