'use strict';

var url = require('url');
var exec = require('child_process').exec;

module.exports = function(file_url, dir) {
  // extract the file name
  var file_name = url.parse(file_url).pathname.split('/').pop();
  // compose the wget command
  var wget = 'wget -P ' + dir + ' ' + file_url;
  // excute wget using child_process' exec function

  var child = exec(wget, function(err, stdout, stderr) {
    if (err) {
      throw err;
    }

    console.log(file_name + ' downloaded to ' + dir);
  });
};
