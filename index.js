const parker = require('./scripts/parker');
const cssstats = require('./scripts/cssstats');

module.exports = {
  parker: parker(config),
  cssstats: cssstats(config)
};