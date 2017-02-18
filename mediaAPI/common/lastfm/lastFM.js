'use strict';
var chalk   = require('chalk');
var fs      = require('fs');
var request = require('request');

var buildOptions = function(type, rawConfig, query, next) {
  console.log(chalk.magenta('method: %s'), 'buildOptions');
  var config = JSON.parse(rawConfig);

  var qs = {
    method: type === 'byTrack' ? 'track.search' : 'tag.gettoptracks',
    format: config.format,
    'api_key': config.key,
    limit: query.items,
    page: query.page,
  };
  if (type === 'byTrack') { qs.track = query.term; }
  if (type === 'byTag') { qs.tag = query.term; }
  var parsedConfig = {uri: config.uri, qs: qs};
  next(null, parsedConfig);
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
    next(null, baseConfig);
  });
};

var searchByTrack = function(requestOptions, next) {
  console.log(chalk.magenta('method: %s'), 'searchByTrack');
  request(requestOptions, function(error, request, response) {
    //check for error
    if (error) { return next(error); }
    //handle success
    next(null, response);
  });
};//searchByTrack

var searchByTag = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTag');
};//searchByTag

var makeRequest = function(config, query, next) {
  buildOptions('byTrack', config, query, function(error, parsedOptions) {
    //check for error
    if (error) { return next(error); }
    //handle success
    searchByTrack(parsedOptions, function(error, response) {
      //check for error
      if (error) { next(error); }
      //handle success
      next(null, response);
    });//searchByTrack
  });//buildOptions
};//makeRequest

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
    makeRequest(baseConfig, rawQuery, function(error, response) {
      //check for error
      if (error) { return next(error); }
      //handle success
      next(null, response);
    });
  });//readConfig
};//search

var lastfm = {
  query: parseQuery,
  search: search,
};

module.exports = lastfm;
