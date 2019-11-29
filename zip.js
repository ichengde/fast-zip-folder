const { format } = require('./date.js');
const fs = require('fs');
const process = require('process');
const path = require('path');
const { exec } = require('child_process');
const AdmZip = require('adm-zip');

/* 
  targetDir 对象目录
  outputDir 输出的目录
  mode 打包后显示用的后缀
  name 打包后的文件名
*/

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)

let mode = args.mode || 'development';
let name = args.name || 'employee';
let targetDir = args.targetDir || 'dist';
let outputDir = args.outputDir || '';

const targetPath = path.resolve('./', targetDir);

const zip = new AdmZip();
zip.addLocalFolder(targetPath);

const time = format.call(new Date(), 'yyyyMMddhhmm');
const dirname = process
  .cwd()
  .split('\\')
  .pop();

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
  crtDir = crtDir.filter(i => new RegExp(`^.*\.zip$`).test(i));
  for (const crtFile of crtDir) {
    console.log('deleted at:' + crtFile);
    fs.unlinkSync(crtFile);
  }

  zip.writeZip(`${outputDir}${name}-${mode.slice(0, 3)}-${time}-${stdout.slice(0, 6)}.zip`);
  console.log(
    'generate ' +
    `${name}-${mode.slice(0, 3)}-${time}-${stdout.slice(0, 6)}.zip`
  );
});
