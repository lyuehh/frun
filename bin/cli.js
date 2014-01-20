#!/usr/bin/env node

var program = require('commander');
program
  .version('0.0.2')
  .option('-f, --file [pattern]', 'files to watch, like "*.js;*.css"')
  .option('-c, --command [commands]', 'commands to run when file changes')
  .parse(process.argv);

var exec = require('child_process').exec;
var gaze = require('gaze');

if (program.file && program.command) {
    gaze(program.file.split(';'), function(err, watcher) {
        if (err) {
            throw err;
        }
        console.log('watching...')
        watcher.on('changed', function() {
            command = exec(program.command);
            console.log('file changes, running commands...');
            command.stdout.pipe(process.stdout);
        });
    });

} else {
    console.log('usage: frun -f "*.js;*.css" -c "node test.js"');
    process.exit(0);
}
