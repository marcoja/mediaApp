'use strict';
var chalk   = require('chalk');
var request = require('request');

var buildOptions = function() {
  console.log(chalk.magenta('method: %s'), 'buildOptions');
};//buildOptions

var buildResponse = function() {
  console.log(chalk.magenta('method: %s'), 'buildResponse');
};//buildResponse

var parseQuery = function(query, next) {
  console.log(chalk.magenta('method: %s'), 'parseQuery');
  //Check whether a search term has been provided or not
  //if not se`rch term was provided default to error
  if (!query.term) {
    var err = new Error();
    err.name = 'Bad name';
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

var searchByTrack = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTrack');
};//searchByTrack

var searchByTag = function() {
  console.log(chalk.magenta('method: %s'), 'searchByTag');
};//searchByTag

var search = function() {
  console.log(chalk.magenta('method: %s'), 'search');
  //load configuration file
  var baseConfig = require('./lastfmConfig');
};//search

var lastfm = {
  query: parseQuery,
  search: search,
};

module.exports = lastfm;
