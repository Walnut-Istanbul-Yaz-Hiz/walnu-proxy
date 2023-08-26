const http = require("http");
const httpProxy = require("http-proxy");
const chalkImporter = import("chalk");
const _ = require("lodash");

class ProxyContainer {
  constructor({ proxy, walnutProxy }) {
    this.proxy = proxy;
    this.walnutProxy = walnutProxy;
  }

  startProxy() {
    if (!this.proxy.port) {
      throw new Error("Port is not defined");
    }

    if (!this.proxy.target) {
      throw new Error("Target is not defined");
    }

    this.server = http.createServer((req, res) => {
      const options = {
        hostname: this.proxy.target.replace("http://", "").replace("https://", ""),
        port: 80,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };

      options.headers.host = options.hostname;
      options.headers = _.pick(options.headers, [
        "host",
        "cookie",
        "accept-language",
        "accept-encoding",
        "accept",
        "content-type",
        "user-agent",
        "cache-control",
        "pragma",
        "content-length",
        "connection",
        "authorization"
      ]);

      var requestBody = "";

      req.on("data", (chunk) => {
        requestBody += chunk;
      });

      req.on("end", () => {
        const proxyReq = http.request(options, (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });

          this.getColoredStatusCode(proxyRes.statusCode).then((coloredStatusCode) => {
            this.walnutProxy.log.info(req.method + " " + req.url + " " + coloredStatusCode);
          });
        });

        proxyReq.write(requestBody);

        proxyReq.on("error", (err) => {
          this.walnutProxy.log.error("An error occurred during the proxy request:", err);
          res.statusCode = 500;
          res.end();
        });

        // Gelen isteği proxy isteği olarak hedefe iletim
        req.pipe(proxyReq, { end: true });
      });
    });

    this.server.on("error", (error) => {
      this.walnutProxy.log.log.error(this.proxy.name + " proxy error " + error.toString());
    });

    this.server.listen(this.proxy.port);

    return this;
  }

  stopProxy() {
    if (this.server) {
      this.server.close();
      this.walnutProxy.log.log.info(this.proxy.name + " proxy server has been stopped.");
    }

    return this;
  }

  async getColoredStatusCode(statusCode) {
    var result = statusCode;

    const chalk = new (await chalkImporter).Chalk();

    // Status koduna göre renkli log oluşturma
    if (statusCode >= 200 && statusCode < 300) {
      result = chalk.green(statusCode);
    } else if (statusCode >= 400 && statusCode < 500) {
      result = chalk.red(statusCode);
    } else {
      result = chalk.yellow(statusCode);
    }

    return result;
  }
}

const createProxy = (proxy) => new ProxyContainer(proxy).startProxy();

module.exports = { createProxy, ProxyContainer };
