#!/usr/bin/env node
/**
 * @fileOverview This sample code illustrates how one can read all collection files within a directory and run them
 * in parallel.
 */
var newman = require('newman')
    fs = require('fs');

var collectionsDir = './collections';
var environmentDir = './enviorments';
var ambiente = 'dev';


var result = newman
    .run({
        // corremos collection que tiene las globalVariables
        collection: require(`${__dirname}/${collectionsDir}/1.SettingGlobalVariables.postman_collection.json`),
        environment: require(`${environmentDir}/${ambiente}.postman_environment.json`),
})
    .on('done', function (err, summary) {
        if (err || summary.error) {
            console.error('collection run encountered an error.');
        }
        else {
            newman.run({
                    // we load collection using require. for better validation and handling
                    // JSON.parse could be used
                    collection: require(`${__dirname}/${collectionsDir}/2.MS-1.postman_collection.json`),
                    environment: summary.environment,
                    globals: summary.globals,
                    reporters: ['html'],
            }).on('done', function (err, summary) {
                if (err || summary.error) {
                    console.error('collection run encountered an error.');
                } else console.info('done');
            });
        }
});

