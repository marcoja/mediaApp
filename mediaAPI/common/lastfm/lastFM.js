'use strict';
var chalk   = require('chalk');
var fs      = require('fs');
var request = require('request');

//This method will build a final configuration object fot the http request
//based on a given base configuration file.
var buildOptions = function(type, config, query, next) {
  console.log(chalk.magenta('method: %s'), 'buildOptions');
  //Object to store the qs values for the http request.
  var qs = {
    method: type === 'byTrack' ? 'track.search' : 'tag.gettoptracks',
    format: config.format,
    'api_key': config.key,
    limit: query.items,
    page: query.page,
  };
  if (type === 'byTrack') { qs.track = query.term; }
  if (type === 'byTag') { qs.tag = query.term; }
  //Object with the valid http options
  var parsedConfig = {uri: config.uri, qs: qs};
  next(null, parsedConfig);
};//buildOptions

//This method will parse and format the final response based on the
//http request results
var buildResponse = function(rawResponse, next) {
  console.log(chalk.magenta('method: %s'), 'buildResponse');
  var parsedResponse = [];
  var tmpResponse    = JSON.parse(rawResponse);
  var trackList = tmpResponse.results.trackmatches.track;
  //this block of code will filter all songs that doesn't contain
  //a valid value for the mbid field.
  trackList.forEach(function(track, index) {
    if (track.mbid !== '') {
      var tmp = {
        name: track.name,
        artist: track.artist,
        mbid: track.mbid,
        image: track.image,
        duration: null,
        youtubeid: null,
      };
      parsedResponse.push(tmp);
    }//endOfFilter
  });
  next(null, parsedResponse);
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
  newQuery.items = !query.items ? 50 : query.items;
  newQuery.opage = !query.page ? 1 : query.page;
  next(null, newQuery);
};//parseQuery

//This method will read the configuration file for the LASTFM api
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
    next(null, JSON.parse(baseConfig));
  });
};

//This method will query the lastFM api based on song name.
var searchByTrack = function(requestOptions, next) {
  console.log(chalk.magenta('method: %s'), 'searchByTrack');
  request(requestOptions, function(error, request, response) {
     //check for error
    if (error) { return next(error); }
    //handle success
    next(null, response);
  });
};//searchByTrack

//This method will query the lastFM api base on tag metadata
var searchByTag = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTag');
};//searchByTag

//This method will execute the http request, it is a separated method because
//at some point in time both searchByTag and async need to be implemented
var makeRequest = function(config, query, next) {
  buildOptions('byTrack', config, query, function(error, parsedOptions) {
    //check for error
    if (error) { return next(error); }
    //handle success
    searchByTrack(parsedOptions, function(error, response) {
      //check for error
      if (error) { next(error); }
      //handle success
      buildResponse(response, function(error, response) {
        //check for error
        if (error) { return next(error); }
        //handle success
        next(null, response);
      });//buildResponse
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

//Object to export the public available methods.
var lastfm = {
  query: parseQuery,
  search: search,
};
//Methods available
module.exports = lastfm;
