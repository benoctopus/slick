const gulp = require('gulp');
const util = require('gulp-util');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const colors = require('colors');
const { exec } = require('child_process');

let compiling = false;
let recompile = false;
let runtime = null;

config.mode = 'development';

const stopRuntime = () => {
  util.log('--- Stopping App ---\n'.yellow)
  if (runtime) {
    runtime.kill();
    runtime = null;
  } else {
    throw new Error('Tried to kill non existent child proces'.red);
  }
}

const startApp = () => {
  console.log('--- Starting App ---\n'.green)
  if (runtime) stopApp();
  runtime = exec(`node ${path.join(__dirname, '.dev/index.js')}`)
  runtime.stdout.on('data', (chunk) => process.stdout.write(chunk))
  runtime.stderr.on('data', (chunk) => process.stderr.write(chunk))
  runtime.on('close', (code => {
    if (code > 0) return util.log(`--- App exited with code ${code} :'( ---\n\n`.red);
    return util.log('--- App exited cleanly! ---'.green);
  }))
}

const compile = () => {
  compiling = true
  return new Promise(resolve => {
    if (runtime) stopRuntime();
    
    webpack(config, (err, stats) => {
      let { compilation: { errors, warnings }} = stats;

      if (err) util.log('\n--- Error ---\n'.red, JSON.stringify(err.red));

      util.log('\n--- Compile Result ---\n'.green);

      util.log(
        '\n--- Warnings --- \n\n'.yellow, 
        Object.keys(warnings).length ? JSON.stringify(warnings, null, 2).yellow : 'None\n'.rainbow
      );

      util.log(
        '\n--- Errors --- \n\n'.red, 
        Object.keys(errors).length ? JSON.stringify(errors.map(err => err.message), null, 2).red : "None\n".rainbow
      );

      if (recompile) {
        recompile = false;
        resolve(compile())
      }

      compiling = false;
      startApp();
      resolve();
    })
  })
}

gulp.task('default', () => {
  util.log('--- server development mode ---\n'.green);

  compile();

  return gulp.watch(
    'src/**/*',
    () => {
      if (compiling === true) {
        recompile = true;
        return;
      };
    
      return compile();
    }
  )
})