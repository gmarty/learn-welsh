#!/usr/bin/env node

// Process the raw XML files.

'use strict';

var fs = require('fs');
var nodexml = require('nodexml');
var _ = require('lodash');

var UNIT_NUMBER = 16;
var XML_DIR = './raw-assets/xml/';
var JSON_DIR = './app/assets/data/';

var words = [];

// Convert XML to JSON and merge sections of each unit together.
for (var i = 1; i <= UNIT_NUMBER; i++) {
  var xml = fs.readFileSync(XML_DIR + 'vocab_unit_' + i + '_south.xml', 'utf8');
  var json = nodexml.xml2obj(xml);

  // Merge sections together
  var sections = json.vocabulary.section;
  words[i - 1] = [];
  for (var j = 0; j < sections.length; j++) {
    words[i - 1] = words[i - 1].concat(sections[j].word);
  }
}

// Dedupe words from each unit.
for (i = 1; i <= UNIT_NUMBER; i++) {
  words[i - 1] = _.uniq(words[i - 1], function(word) {
    return tokenise(word.cy) + ' ' + tokenise(word.en);
  });
}

// Dedupe words across all units.
var word = '';
for (i = 1; i <= UNIT_NUMBER; i++) {
  for (j = 0; j < words[i - 1].length; j++) {
    word = words[i - 1][j];

    if (!word.cy) {
      continue;
    }

    var token1 = tokenise(word.cy) + ' ' + tokenise(word.en);

    // Compare with all other units.
    for (var k = 1; k <= UNIT_NUMBER; k++) {
      if (i === k) {
        continue;
      }

      for (var l = 0; l < words[k - 1].length; l++) {
        word = words[k - 1][l];

        if (!word.cy) {
          continue;
        }

        var token2 = tokenise(word.cy) + ' ' + tokenise(word.en);

        // If the word already exists, we remove it.
        if (token1 === token2) {
          // We temporary set the word to {}.
          words[k - 1][l] = {};
        }
      }
    }
  }

  // Now, we can remove the empty words.
  words[i - 1] = words[i - 1].filter(function(word) {
    return word.cy && word.en && word.mp3;
  });
}

// To save on file size, we convert the words objects into arrays:
// cy => 0 ; en => 1 ; mp3 => 2
// We also make sure each word begins with a capital letter.
for (i = 1; i <= UNIT_NUMBER; i++) {
  words[i - 1] = words[i - 1].map(function(word) {
    var cy = capitalise(word.cy);
    var en = capitalise(word.en);
    return [cy, en, word.mp3];
  });
}

fs.writeFileSync(JSON_DIR + 'words.json', JSON.stringify(words, null, '  '));

// Transform a word into a token to ease string comparison.
function tokenise(word) {
  return word
    .toLowerCase()
    .replace(/\W+/g, '');
}

// Capitalize a word or sentence.
function capitalise(word) {
  return word.substr(0, 1).toUpperCase() + word.substr(1);
}
