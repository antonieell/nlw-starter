const express = require("express");
const server = express();
// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
});

//Configurar pasta pública
server.use(express.static("public"));
//Ligar o servidor

server.listen(3000);

//Configurar caminhos da minha aplicação
server.get("/", (req, res) => {
    return res.render("index.html", { title: "umtítulo" });
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});
server.get("/searchResults", (req, res) => {
    return res.render("searchResults.html");
});
