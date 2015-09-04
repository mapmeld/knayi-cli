#! /usr/bin/env node

var fs = require("fs");
var knayi = require("knayi-myscript");
var sortDiacritics = require("my-diacritic-sort");

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
        console.log('converting from WinResearcher');

        var replacements = [
          [/OD/g, 'ဦ'],
          [/aj(.)/g, '$1ြေ'],
          [/aM(.)/g, '$1ြေ'],

          [/\`(.)/g, '$1ြ'],
          [/1/g, '၁'],
          [/2/g, '၂'],
          [/3/g, '၃'],
          [/4/g, '၄'],
          [/5/g, '၅'],
          [/6/g, '၆'],
          [/7/g, '၇'],
          [/8/g, '၈'],
          [/9/g, '၉'],
          [/0/g, 'ဝ'],
          [/\&/g, 'ရ'],
          [/\*/g, 'ဂ'],
          [/ñ/g, 'ည'],
          [/¾/g, 'ဂ္ဂ'],
          [/\^/g, '/'],
          [/\#/g, 'ဋ'],
          [/®/g, '္မ'],
          [/Ö/g, '္ဏ'],
          [/Ó/g, 'ည'],  // ည connected on top?
          [/é/g, '္န'],
          [/½/g, 'ရ'],
          [/Ü/g, '္ပ'],
          // -
          // =
          [/q/g, 'ဆ'],
          [/w/g, 'တ'],
          [/e/g, 'န'],
          [/r/g, 'မ'],
          [/t/g, 'အ'],
          [/y/g, 'ပ'],
          [/u/g, 'က'],
          [/i/g, 'င'],
          [/o/g, 'သ'],
          [/p/g, 'စ'],
          [/\[/g, 'ဟ'],
          [/\\/g, '၏'],

          [/a(.)/g, '$1ေ'],
          [/s/g, 'ျ'],
          [/d/g, 'ိ'],
          [/f/g, '်'],
          [/g/g, 'ါ'],
          [/h/g, '့'], // ?
          [/j(.)/g, '$1ြ'], //?
          [/k/g, 'ု'],
          [/l/g, 'ူ'], // ?
          [/;/g, 'း'],
          [/\'/g, 'ဒ'],

          [/z/g, 'ဖ'],
          [/x/g, 'ထ'],
          [/c/g, 'ခ'],
          [/v/g, 'လ'],
          [/b/g, 'ဘ'],
          [/n/g, 'ည'],
          [/m/g, 'ာ'],
          [/\,/g, 'ယ'],
          [/\./g, '့'],
          [/\//g, '။'],

          [/Q/g, 'ှ'],
          [/W/g, 'ှ'],
          [/E/g, 'န'],
          [/R/g, 'ှ'],
          [/T/g, 'ွှ'],
          [/Y/g, '့'],
          [/U/g, '့'],
          [/I/g, 'ှူ'],
          [/O/g, 'ဉ'],
          [/P/g, 'ဏ'],
          [/\{/g, '5'], // looks like c in ၏
          [/\}/g, '\''],
          [/\|/g, '6'],

          [/A/g, 'ဗ'],
          [/S/g, 'ှ'],
          [/D/g, 'ီ'],
          [/F/g, 'င်္'],
          [/G/g, 'ွ'],
          [/H/g, 'ံ'],
          [/J/g, 'ဲ'],
          [/K/g, 'ု'],
          [/L/g, 'ူ'],
          [/:/g, 'ါ်'],
          [/"/g, 'ဓ'],

          [/Z/g, 'ဇ'],
          [/X/g, 'ဥ'],
          [/C/g, 'ဃ'],
          [/V/g, 'ဠ'],
          [/B(.)/g, '$1ြ'],
          [/N(.)/g, '$1ြ'],
          [/M(.)/g, '$1ြ'],
          [/\<(.)/g, '$1ြွ'],
          [/\>(.)/g, '$1ြွ'],
          [/\?/g, '၊'],
          [/\]/g, '\''],
          [/´/g, '္ဒ'],
          [/Å|ú/g, '္တ'],


//  ၎    ဩ ဿ  ဈ  ?

        ];
        for (var r = 0; r < replacements.length; r++) {
          srcText = srcText.replace(replacements[r][0], replacements[r][1]);
        }

        var outText = '';
        var diacritics = [
          'ြ',
          'ွ',
          'ှ',
          'ျ',
          'ေ',
          'ာ',
          '်',
          'ိ',
          'ု',
          'ံ',
          '့',
          'း'
        ];

        var diacriticBuffer = [];
        for (var c = 0; c < srcText.length; c++) {
          if (diacritics.indexOf(srcText[c]) === -1) {
            if (diacriticBuffer.length) {
              diacriticBuffer.sort(function (a, b) {
                return diacritics.indexOf(a) - diacritics.indexOf(b);
              });
              outText += diacriticBuffer.join("");
              diacriticBuffer = [];
            }
            outText += srcText[c];
          } else if (diacriticBuffer.indexOf(srcText[c]) === -1) {
            diacriticBuffer.push(srcText[c]);
          }
        }
        outText += diacriticBuffer.join("");

        return outputUnicode(outText);
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
