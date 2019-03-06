const https = require("https");
const fs = require("fs");
const TCP_PORT = 443;
const options = {
  key: fs.readFileSync("c.key"),
  cert: fs.readFileSync("c.cert")
};

let responseData = {
  code: 200,
  type: { "Content-Type": "text/html; charset=utf-8" },
  content: ""
};

const neeoSServer = https.createServer(options, (req, res) => {
  const method = req.method;
  const uriparts = decodeURI(req.url).split("/");
  const clientIp = req.connection.remoteAddress.replace(/^.*:/, "");

  console.log("Method: " + method);
  console.log("url: " + req.url);
  console.log("clientIp: " + clientIp);
  if (req.url == "/firmware_info.txt") {
    responseData.content = "0.50.6-20180424-481315c-0523-151625";
    responseData.content = "0.27.0";
  }

  res.writeHead(responseData.code);
  res.end(responseData.content);
});
neeoSServer.listen(443, function() {
  console.log(" NEEO S Service running on port: " + TCP_PORT);
  console.log("-------------------------------------------------");
});
