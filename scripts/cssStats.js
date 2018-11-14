const
  cssstats = require('cssstats'),
  path = require('path'),
  fs = require('fs'),
  chalk = require('chalk'),
  log = require('fancy-log');

module.exports = (config) => {
  const basepath = path.join(process.cwd(), config.basepath);
  fs.readdir(basepath + config.location, function (err, files) {
    if (err) {
      log.error(chalk.red('Could read the directory', err));
      process.exit(1);
    }
    files.forEach(function (file) {
      if (path.extname(file) === '.css') {
        fs.readFile(basepath + config.location + file, 'utf8', function (err, data) {
          if (err) {
            return log(err);
          }

          const stats = cssstats(data);
          const output = `
            ${chalk.cyan(file)}
            Color: ${stats.declarations.getUniquePropertyCount('color')}
            Font-Weight: ${stats.declarations.getUniquePropertyCount('font-weight')}
            `;
          log(output);
        });
      }
    });
  });
}