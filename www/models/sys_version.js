/**
 * Created by zhongyw on 7/31/16.
 */
'use strict';


var base = require('./_base_pure.js');

module.exports = function (warp) {
    return base.defineModel(warp, 'SysVersion', [
        base.column_varchar_100('version_sn'),
        base.column_varchar_100('version_date'),
        base.column_timestamp('create_time'),
    ], {
        table: 'sys_version'
    });
};
