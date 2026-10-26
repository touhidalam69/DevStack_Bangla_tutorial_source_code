import { readFile } from 'node:fs/promises';

const notes = await readFile('notes.txt', 'utf8');
console.log('Read', notes.length, 'characters');

const res = await fetch('https://example.com/');
console.log('Network call:', res.status);
