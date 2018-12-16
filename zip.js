const { format } = require('./date.js');
const fs = require('fs');
const process = require('process');
const path = require("path");
const { exec } = require('child_process');
const AdmZip = require('adm-zip');
const modeOriginString = process.argv.slice(2)[0];
let mode = 'development';
if (modeOriginString && modeOriginString.indexOf('=') >= 0) {
    mode = modeOriginString.split('=')[1];
}
const targetPath = path.resolve('./', 'dist');

const zip = new AdmZip();
zip.addLocalFolder(targetPath);

const time = format.call(new Date(), "yyyyMMddhhmm");
const dirname = process.cwd().split('\\').pop();

exec('git rev-parse HEAD', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }


    let crtDir = fs.readdirSync(path.resolve('./'));
    crtDir = crtDir.filter(i => new RegExp(`^${dirname}-.*\.zip$`).test(i))
    for (const crtFile of crtDir) {
        console.log(crtFile);
        fs.unlinkSync(crtFile);
    }

    zip.writeZip(`${dirname}-${mode.slice(0, 3)}-${time}-${stdout.slice(0, 6)}.zip`);
});
