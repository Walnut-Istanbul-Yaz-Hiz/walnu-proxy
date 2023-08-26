const resolveScript = (scriptPath) => {
  return (...args) => {
    const script = require(scriptPath);

    Promise.resolve()
      .then(() => {
        return script(...args);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  };
};

module.exports = resolveScript;
