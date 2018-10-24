var fs = require('fs');
var bacc = fs.readFileSync('acc.backup.json');
fs.writeFileSync('acc.json',bacc);