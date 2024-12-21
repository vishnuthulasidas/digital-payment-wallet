
// Middleware function to log the request method and URL to the console

const logger =((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // Pass control to the next middleware
});

module.exports = logger;