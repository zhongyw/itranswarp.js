/**
 * usage:
 * node modelCreater.js mdm_device_hardware
 */
'use strict';

var
    _ = require('lodash'),
    fs = require('fs'),
    cfg = require('../config.js'),
    Warp = require('mysql-warp');

var tableName = process.argv[2],
    outFile = "../models/" + tableName + ".js",
    str;
var warp = Warp.create(cfg.db);
function convert(row){
     var type = row.Type;
     if(type.indexOf("int") !== -1) type = 'int';
     return   "{\n" +
        "       name: '"+row.Field+"',\n" +
        "       type: '"+type+"'\n" +
        "    }"
}
function convertColumns(result){
    var str = "";
    _.each(result, function(row, index){
        if(index !== 0){
            str += ",";
        }
        str += convert(row);
    })
    return str;
}

warp.query('show columns from ' + tableName, function(err, result){

    fs.unlink(outFile);

    str =   "'use strict'\n" +

            "var base = require('./_base_pure.js'),\n" +
             "       _ = require('lodash');\n" +
            "module.exports = function (warp) {\n" +
            "   return base.defineModel(warp, '"+tableName+"', [" + convertColumns(result);

    str +=  "], {\n" +
            "       table: '"+ tableName +"'\n" +
            "   });\n"
    str +=  "}";

    fs.appendFileSync(outFile, str);
});
