// export the static version of the react app

const path = require('path');
const mv = require('mv');
const fs = require('fs');
const colors = require('colors');
const { exec: _exec } = require('child_process');

const clientPath = path.join(__dirname, 'client');
const clientOutput = path.join(clientPath, 'out');
const destination = path.join(__dirname, 'nginx/prod/out');

const exec = command => new Promise(resolve => {
  // create a subprocess
  const proc = _exec(command);

  // route output streams to main process output
  proc.stdout.on('data', chunk => process.stdout.write(chunk.green))
  proc.stderr.on('data', chunk => process.stderr.write(chunk.red))

  proc.on('close', code => {
    // throw an error if the process doesnt exit cleanly
    if (code > 0) throw new Error('process exited with errors');

    resolve()
  })
})

const task = (async () => {
  try {
    // run next build && export
    if (fs.existsSync(destination)) await exec(`rm -rf ${destination}`);
    await exec(`cd ${clientPath} &&  NODE_ENV=production npm run export`);

    // move output to nginx dir
    return new Promise(resolve => mv(
      clientOutput, 
      destination, 
      { mkdirp: true },
      err => {
        if (err) throw err;
      }
    ))
  } catch (err) {
    console.log(err);
    process.exit(1);
  } 
})()

task.then(() => process.exit(0));
