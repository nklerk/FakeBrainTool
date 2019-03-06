const http = require("http");
const fs = require("fs");
const TCP_PORT = 3000;

const neeoServer = http.createServer((req, res) => {
  let responseData = {
    code: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    content: ""
  };

  const method = req.method;
  const headers = req.headers;
  const uriparts = decodeURI(req.url).split("/");
  const clientIp = req.connection.remoteAddress.replace(/^.*:/, "");

  if (req.url.indexOf("/projects/home/tr2/gui_xml") != -1) {
    console.log(`gui_xml`);
    responseData.content = fs.readFileSync("gui2.xml", "utf8");
    //responseData.content = gui.xml();
    responseData.content = responseData.content + "";
    /*     responseData.headers = {
      "Content-Type": "text/html; charset=utf-8",
      ETag: 'W/"bac5-hA8bJH0nxN91ku7gUb5/RwIGpEg"',
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Accept,X-Requested-With,Origin,X-NEEO-Secure",
      "Access-Control-Allow-Credentials": "true"
    }; */
  } else if (req.url.indexOf("/projects/checkAirkey") != -1) {
    /*     responseData.headers = {
      "Content-Type": "text/html; charset=utf-8",
      ETag: 'W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"',
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Accept,X-Requested-With,Origin,X-NEEO-Secure",
      "Access-Control-Allow-Credentials": "true"
    }; */
    responseData.content = "OK";
  } else if (req.url.indexOf("/neeo.xml") != -1) {
    responseData.content = fs.readFileSync("neeo.xml", "utf8");
  } else if (req.url.indexOf("/projects/home/tr2/guidata_xml") != -1) {
    console.log(`guidata_xml`);
    responseData.content = fs.readFileSync("guidata.xml", "utf8");
  } else if (req.url.indexOf("/v1/imagecache/") != -1) {
    //console.log(`imgcache not implemented...`);
  } else if (req.method == "POST") {
    let body = "";
    req.on("data", function(data) {
      body += data;
    });
    req.on("end", function() {
      //console.log(`POST: ${body}`);
    });
  } else {
    console.log(`Port:     ${TCP_PORT}`);
    console.log(`Method:   ${method}`);
    console.log(`url:      ${req.url}`);
    console.log(`clientIp: ${clientIp}`);
    console.log(`Response L: ${responseData.content.length}`);
    console.log(``);
  }

  ///v1/imagecache/

  //res.writeHead(responseData.code, responseData.headers);
  //res.write(responseData.content);
  res.end(responseData.content);
});

neeoServer.listen(TCP_PORT, function() {
  console.log("N330 TCP service running on: TCP/" + TCP_PORT);
});
