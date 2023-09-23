// Handles GET requests to the root URL.
// Sends the index.html file located in the client/dist directory.
const path = require('path');

module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );