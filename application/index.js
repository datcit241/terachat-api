const fs = require("fs");
const path = require("path");

const services = {};
fs
    .readdirSync(__dirname)
    .filter(dir => dir.indexOf('.') === -1)
    .forEach(dir => {
      services[dir] = {};
      fs
          .readdirSync(path.join(__dirname, dir))
          .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file.slice(-3) === '.js' &&
                file.indexOf('.test.js') === -1
            );
          })
          .forEach(file => {
            services[dir][file.substring(0, file.length - 3)] = require(path.join(__dirname, dir, file));
          });
    });

module.exports = services;
