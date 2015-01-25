#!/usr/bin/env node

// Download the MP3 files containing the pronunciation of the words.

'use strict';

var download_file_wget = require(__dirname + '/lib/wget');

var UNIT_NUMBER = 16;
var JSON_DIR = './app/assets/data/';
var MP3_DIR = './app/assets/mp3/';

var words = require(__dirname + '/../' + JSON_DIR + 'words.json');

for (var i = 1; i <= UNIT_NUMBER; i++) {
  for (var j = 0; j < words[i - 1].length; j++) {
    var mp3Url = 'http://downloads.bbc.co.uk/rmhttp/wales/bigwelshchallenge/mp3/vocabulary/' + words[i - 1][j][2];

    var vocabulary = download_file_wget(mp3Url, MP3_DIR);
  }
}
