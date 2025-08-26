const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("url", req.url);
  console.log("headers", req.headers);
  console.log("method", req.method);

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST' name='message'><input type='text'/><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h3>My First Page</h3></body>");
  res.write("</html>");
  res.end();
  // process.exit();
});

server.listen(3000);
