const http = require("http");
const httpProxy = require("http-proxy");

// target IP address or domain
const target = "http://localhost";

httpProxy.createProxyServer({ target }).listen(8000); 
