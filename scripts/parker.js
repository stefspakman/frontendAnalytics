const
  Parker = require('parker'), // Parker stylesheet analysis
  fs = require('fs'),
  path = require('path'),
  log = require('fancy-log');

module.exports = (config) => {
  const basepath = path.join(process.cwd(), config.basepath);
  const metrics = require('../node_modules/parker/metrics/all');
  const parker = new Parker(metrics);
  fs.readdir(`${basepath}${config.location}`, (err, files) => {
    if (err) {
      log.error(chalk.red('Could read the directory', err));
      process.exit(1);
    }
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        fs.readFile(`${basepath}${config.location}/${file}`, 'utf8', (err, data) => {
          if (err) {
            return log(err);
          }
          log(file);
          log(parker.run(data));
        });
      }
    });
  });
};