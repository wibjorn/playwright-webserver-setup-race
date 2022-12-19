const execa = require("execa");

const timeout = 10 * 1000;
setTimeout(() => {
  console.log(`Waited ${timeout / 1000}s.`);
}, timeout);

const child = execa("npm run start", {
  cwd: ".",
  reject: false,
  shell: true,
});
