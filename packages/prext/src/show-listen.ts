export function showListen(port: number | string) {
  console.log('\nServer is Running~!'.green);
  console.log(` ${'├─'.gray} http://localhost:${String(port).cyan}`.bold);
  console.log(` ${'└─'.gray} http://127.0.0.1:${String(port).cyan}`.bold);
  console.log();
}
