'use strict';

var chalk   = require('chalk');
var fs      = require('fs');
var lastFM  = require('../lastfm/lastFM');

module.exports = function(Song) {
  Song.search = function(name, items, page, cb) {
    console.log(chalk.cyan('remote method: %s'), 'Song.search');
    cb(null, 'Hello I am Song.search');
  };
  Song.remoteMethod('search', {
    accepts: [
      {arg: 'name', type: 'string'},
      {arg: 'items', type: 'number'},
      {arg: 'page', type: 'number'},
    ],
    returns: {type: 'array', root: true},
  });
};
