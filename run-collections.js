#!/usr/bin/env node
/**
 * @fileOverview This sample code illustrates how one can read all collection files within a directory and run them
 * in parallel.
 */
var newman = require('newman')
    fs = require('fs');

var collectionsDir = './collections';
var enviormentsDir = './enviorments';
var ambiente = 'dev';


var result = newman.run({
            // we load collection using require. for better validation and handling
            // JSON.parse could be used
            collection: require(`${__dirname}/${collectionsDir}/1.SettingGlobalVariables.postman_collection.json`),
            environment: require(`${enviormentsDir}/${ambiente}.postman_environment.json`),
            reporters: 'cli'
        }, function (err, summ) {
            // finally, when the collection executes, print the status
            newman.run({
                // we load collection using require. for better validation and handling
                // JSON.parse could be used
                collection: require(`${__dirname}/${collectionsDir}/2.MS-1.postman_collection.json`),
                environment: require(`${__dirname}/${enviormentsDir}/${ambiente}.postman_environment.json`),
                globals: summ.globals,
                reporters: 'cli'
            }, function (err, summ) {
                // finally, when the collection executes, print the status
    });
});


