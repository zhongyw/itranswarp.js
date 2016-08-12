/**
 * Created by zhongyw on 7/31/16.
 */
'use strict';

// article.js

var base = require('./_base_pure.js');

module.exports = function (warp) {
    return base.defineModel(warp, 'MdmDevice', [
        base.column_varchar_100('device_identifier'),
        base.column_varchar_500('udid'),
        base.column_varchar_500('challenge'),
        base.column_varchar_500('device_name'),
        base.column_varchar_500('ownership'),
        base.column_varchar_100('model'),
        base.column_int('platform_id'),
        base.column_varchar_100('user_agent'),
        base.column_varchar_100('operation_system'),
    ], {
        table: 'mdm_device'
    });
};
