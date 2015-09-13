#! /usr/bin/env node

var fs = require("fs");
var knayi = require("knayi-myscript");
var winResearcher = require("my-winresearcher");

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
  fs.readFile(srcFile, "utf-8", function(err, srcText) {
    if (err) {
      throw err;
    } else {
      if (process.argv.length > 4) {
        // WinResearcher hack
        return outputUnicode(winResearcher(outText));
      }

      var k = knayi(srcText);
      var myFont = k.getFontType();
      if (myFont === "zawgyi") {
        k.fontConvert("unicode5", function(unicoded) {
          outputUnicode(unicoded);
        });
      } else {
        var repChars = {
          56319: "", // "ွ",
          56320: "ု",
          56321: "ံ",
          56322: "ေ",
          56323: "ြ",
          56324: "ှ",
          56325: "ြ",
          56327: "ြ",
          56331: "ှ"
        };
        var rogueChars = Object.keys(repChars);
        var replaceRogue = false;
        for (var rc = 0; rc < rogueChars.length; rc++) {
          if (srcText.indexOf(String.fromCharCode(rogueChars[rc])) > -1) {
            replaceRogue = true;
            break;
          }
        }
        if (replaceRogue) {
          console.log("You're in Unicode format but with weird diacritic order! Fixing...");

          outputUnicode(sortDiacritics(srcText));
        } else {
          console.log("You're already in Unicode format!");
          outputUnicode(srcText);
        }
      }
    }
  });
} else {
  console.log("Please provide a file name.");
}
