const gulp = require('gulp');
const util = require('gulp-util');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const colors = require('colors');
const ts = require('gulp-typescript');
const { exec } = require('child_process');

process.stdout.setEncoding('utf8')
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

      util.log('\n--- Compile Complete! ---\n'.rainbow);

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

const rm = (path) => new Promise(resolve => {
  fs.unlink(path, (err) => {
    if (err) throw err;
    resolve();
  })
})

const rmrf = async (p) => {
  const items = fs.readdirSync(p);
  const len = items.length;

  for (let i = 0; i < len; i += 1) {
    const item = items[i];
    const itemPath = path.join(p, item);
    if (fs.statSync(itemPath).isDirectory())
      await rmrf(itemPath) 
    else
      rm(itemPath)
  }

  return new Promise(resolve => {
    fs.rmdir(p, (err) => {
      if (err) throw err;
      resolve();
    })
  });
}

gulp.task('dev', () => {
  util.log('--- server development mode ---\n'.green);
  compile();

  return gulp.watch(
    'src/**/*',
    () => {
      if (compiling === true) {
        recompile = true;
        return;
      };
      
      util.log('--- Compiling ---'.blue);
      return compile();
    }
  )
})

gulp.task('compileToTmp', () => {
  const proj = ts.createProject(path.join(__dirname, 'tsconfig.lax.json'));
  const dest = path.join(__dirname, 'tmp');
  return proj.src().pipe(proj()).js.pipe(gulp.dest(dest))
})

gulp.task('cleanTmp', () => rmrf(path.join(__dirname, 'tmp')))

gulp.task('mocha', () => new Promise(resolve => { 
  const mocha = path.resolve(
    __dirname, 
    'node_modules', 
    'mocha', 
    'bin', 
    'mocha'
  )

  const proc = exec(`node ${mocha} tmp/**/*.test.js`);
  let output = [];
  proc.stdout.on('data', (chunk) => process.stdout.write(chunk.toString().blue))
  proc.stderr.on('data', (chunk) => process.stderr.write(chunk.toString().red))
  proc.on('close', () => resolve());
}))

gulp.task(
  'test', 
  gulp.series('compileToTmp', 'mocha', 'cleanTmp'))