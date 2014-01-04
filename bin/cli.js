#!/usr/bin/env node

var spawn = require('child_process').spawn;
var gaze = require('gaze');
if (process.argv.length < 3) {
    console.log('usage: frun "node test.js"');
    process.exit(0);
}
var args = process.argv[2];

var exec = args.split(' ')[0];
var file = args.split(' ')[1];
var command;

gaze(file, function(err, watcher) {
    if (err) {
        throw err;
    }
    watcher.on('changed', function() {
        command = spawn(exec, [file]);
        console.log('file changes, running...');
        command.stdout.pipe(process.stdout);
    });
});

