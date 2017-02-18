'use strict';

var chalk   = require('chalk');
var fs      = require('fs');
var lastFM  = require('../lastfm/lastFM');

module.exports = function(Song) {
  Song.search = function(name, items, page, cb) {
    console.log(chalk.cyan('remote method: %s'), 'Song.search');
    var query = {term: name, items: items, page: page};
    lastFM.query(query, function(error, parsedQuery) {
      //check for error
      if (error) { return cb(error, null); }
      //handle success
      cb(null, 'query is good!');
    });//query
  };//Song.search

  Song.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},
    accepts: [
      {arg: 'name', type: 'string'},
      {arg: 'items', type: 'number'},
      {arg: 'page', type: 'number'},
    ],
    returns: {type: 'json', root: true},
  });
};
