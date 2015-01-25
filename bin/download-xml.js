#!/usr/bin/env node

// Download the XML file containing the voabulary data.

'use strict';

var wget = require(__dirname + '/lib/wget');

var UNIT_NUMBER = 16;
var XML_DIR = './raw-assets/xml/';

for (var i = 1; i <= UNIT_NUMBER; i++) {
  var unitUrl = 'http://www.bbc.co.uk/wales/learnwelsh/bigwelshchallenge/flashconsole/xml/vocab_unit_' + i + '_south.xml';
  var vocabulary = wget(unitUrl, XML_DIR);
}
