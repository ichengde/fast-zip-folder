const process = require('process');
const path = require("path");
const AdmZip = require('adm-zip');
const modeOriginString = process.argv.slice(2)[0];
let mode = 'development';
if (modeOriginString && modeOriginString.indexOf('=') >= 0) {
    mode = modeOriginString.split('=')[1];
}

const targetPath = path.resolve('./', 'dist');

const zip = new AdmZip();
zip.addLocalFolder(targetPath);
const timestamp = new Date().getTime();
const dirname = process.cwd().split('\\').pop();

zip.writeZip(`${dirname}-${mode}-${timestamp}.zip`);