'use strict';
var chalk   = require('chalk');
var request = require('request');

var buildOptions = function() {
  console.log(chalk.magenta('method: %s'), 'buildOptions');
};//buildOptions

var buildResponse = function() {
  console.log(chalk.magenta('method: %s'), 'buildResponse');
};//buildResponse

var parseQuery = function() {
  console.log(chalk.magenta('method: %s'), 'parseQuery');
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
