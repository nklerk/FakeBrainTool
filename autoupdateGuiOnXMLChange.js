const fs = require("fs");
const interval = 2000;
const GUIXML = "gui2.xml";
const GUIData = "guidata.xml";
let guiTime = 0;
let ignoreChange = true;

function intervalFileCheck() {
  let stats = fs.statSync(GUIXML);
  if (ignoreChange) {
    guiTime = stats.mtimeMs;
    ignoreChange = false;
  } else if (guiTime != stats.mtimeMs) {
    guiTime = stats.mtimeMs;
    ignoreChange = true;
    let time = Date.now();
    updateGUI(GUIXML, time);
    updateGUI(GUIData, time);
    console.log(`gui.xml file changed: ${guiTime}`);
  }
}

setInterval(intervalFileCheck, interval);

function updateGUI(XMLFile, time) {
  var fs = require("fs");
  fs.readFile(XMLFile, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/projectId=\"[^\"]*\"/g, `projectId="${time}"`);

    fs.writeFile(XMLFile, result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
}
