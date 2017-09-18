#!/usr/bin/env node
/**
 * @fileOverview This sample code illustrates how one can read all collection files within a directory and run them
 * in parallel.
 */
let newman = require('newman');

let collectionsDir = './collections';
let environmentDir = './enviorments';
let ambiente = 'dev';


newman
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
                // aca podriamos tener un foreach pero habria que especificar un html
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

