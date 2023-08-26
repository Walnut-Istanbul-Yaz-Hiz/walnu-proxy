// const http = require("http");
// const httpProxy = require("http-proxy");

// target IP address or domain
// const target = "http://localhost";

// httpProxy.createProxyServer({ target }).listen(8000);

// WalnutProxy.createProxy({port:'8080', target: 'http://localhost',name:'Example Proxy});

// yarn walnut-proxy --create --server=http://localhost:8080 --target=http://localhost --name=Example Proxy

// knex ile sql lite a bağlan ve yeni proxy i ekle

// yarn walnut-proxy --start

const WalnutProxy = require("./src/walnut-proxy");

const walnutProxy = new WalnutProxy();

walnutProxy.start()
