const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const TCP_PORT = 3201;

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`Button press: '${msg}'`);
});

server.on("listening", () => {
  //const address = server.address();
  console.log("N330 UDP service running on: UDP/" + TCP_PORT);
});

server.bind(TCP_PORT);
