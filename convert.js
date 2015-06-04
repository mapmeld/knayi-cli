#! /usr/bin/env node

var fs = require("fs");
var knayi = require("knayi-myscript");

var outputUnicode = function(outText) {
  if (process.argv.length > 3) {
    var outFile = process.argv[3];
    fs.writeFile(outFile, outText, function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Output to " + outFile);
      }
    });
  } else {
    console.log(outText);
  }
};

if (process.argv.length > 2) {
  var srcFile = process.argv[2];
  fs.readFile(srcFile, {encoding: 'utf-8'}, function(err, srcText) {
    if (err) {
      throw err;
    } else {
      var k = knayi(srcText);
      var myFont = k.getFontType();
      if (myFont === "zawgyi") {
        k.fontConvert("unicode5", function(unicoded) {
          outputUnicode(unicoded);
        });
      } else {
        console.log("You're already in Unicode format!");
        outputUnicode(srcText);
      }
    }
  });
} else {
  console.log("Please provide a file name.");
}
