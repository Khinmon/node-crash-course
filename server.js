const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("Hello");
  });

  greet();
  greet();

  res.setHeader("Content-Type", "text/html");

  // res.write("<p>hello, ninjas</p>");
  // res.write("<p>hello again, ninjas</p>");
  // res.end();

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-blah":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      break;
  }

  // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for the requests on the port 3000");
});
