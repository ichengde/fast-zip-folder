const process = require('process');
const path = require("path");
const AdmZip = require('adm-zip');

const targetPath = path.resolve('./', 'dist');


var zip = new AdmZip();
zip.addLocalFolder(targetPath);
const timestamp = new Date().getTime();
const dirname = process.cwd().split('\\').pop();

zip.writeZip(`${dirname}-${timestamp}.zip`);
