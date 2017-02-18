'use strict';
var chalk   = require('chalk');
var fs      = require('fs');
var request = require('request');

var buildOptions = function() {
  console.log(chalk.magenta('method: %s'), 'buildOptions');
};//buildOptions

var buildResponse = function() {
  console.log(chalk.magenta('method: %s'), 'buildResponse');
};//buildResponse

//This method will parse the intial query for the request
//initial options:
//term  - string  - Required
//items - number  - Optional  - Default: 10
//page  - number  - Optional  - Default: 1
var parseQuery = function(query, next) {
  console.log(chalk.magenta('method: %s'), 'parseQuery');
  //Check whether a search term has been provided or not
  //if not se`rch term was provided default to error
  if (!query.term) {
    var err = new Error();
    err.name = 'Bad search term';
    err.status = 404;
    err.message = 'Missing search term, Unable to perform search.';
    return next(err);
  }
  // handle success
  var newQuery = {};
  newQuery.term  = query.term;
  newQuery.items = !query.items ? 15 : query.items;
  newQuery.opage = !query.page ? 1 : query.page;
  next(null, newQuery);
};//parseQuery

var readConfig = function(location, next) {
  console.log(chalk.magenta('method: %s'), 'readConfig');
  fs.readFile(location, 'utf8', function(error, baseConfig) {
    //check for error
    if (error) {
      console.log(chalk.yellow('Debugging:'));
      console.log(error);
      var err = new Error();
      err.name = 'Bad config';
      err.status = 500;
      err.message = 'Unable to read configuration file.';
      return next(err);
    }
    //handle success
    console.log(baseConfig);
    next(null, baseConfig);
  });
};

var searchByTrack = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTrack');
};//searchByTrack

var searchByTag = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTag');
};//searchByTag

//This method will perform a wide search "byTrack and ByTag" against the
//lastFM api given a user provided search term
var search = function(rawQuery, next) {
  console.log(chalk.magenta('method: %s'), 'search');
  //load configuration file
  var configLocation = './common/lastfm/lastfmConfig.json';
  readConfig(configLocation, function(error, baseConfig) {
    //check for error
    if (error) { return next(error); }
    //handle success
    next(null, 'config is good!');
  });//readConfig
};//search

var lastfm = {
  query: parseQuery,
  search: search,
};

module.exports = lastfm;
