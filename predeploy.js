const path = require('path');
const mv = require('mv');
const { exec: _exec } = require('child_process');

const clientPath = path.join(__dirname, 'client');
const clientOutput = path.join(clientPath, 'out');
const destination = path.join(__dirname, 'nginx/prod/out');

const exec = command => new Promise(resolve => {
  // create a subprocess
  const proc = _exec(command);

  // route output streams to main process output
  proc.stdout.on('data', chunk => process.stdout.write(chunk))
  proc.stderr.on('data', chunk => process.stderr.write(chunk))

  proc.on('close', code => {
    // throw an error if the process doesnt exit cleanly
    if (code > 0) throw new Error('process exited with errors');

    resolve()
  })
})

const tast = (async () => {
  try {
    // run next build && export
    await exec(`cd ${clientPath} && npm run export`);

    return new Promise(resolve => mv(
      clientPath, 
      destination, 
      { mkdirp: true },
      err => {
        if (err) throw err;
        process.exit(0)
      }
    ))
  } catch (err) {
    console.log(error);
    process.exit(1);
  } finally {
    return;
  }
})()
