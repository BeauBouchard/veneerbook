const path = require('path');
const fs = require('fs');

const basename = path.basename(module.filename);
const routes = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const fullPath = path.join(__dirname, file);
    const fileName = file.substring(0, file.length - 3);

    routes[fileName] = fullPath;
  });

module.exports = routes;
