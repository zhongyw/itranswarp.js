'use strict'
var base = require('./_base_pure.js'),
       _ = require('lodash');
module.exports = function (warp) {
   return base.defineModel(warp, 'mdm_device_hardware', [{
       name: 'id',
       type: 'int'
    },{
       name: 'device_id',
       type: 'int'
    },{
       name: 'manufacture',
       type: 'varchar(128)'
    },{
       name: 'model',
       type: 'varchar(128)'
    },{
       name: 'total_free_storage',
       type: 'double(50,0)'
    },{
       name: 'device_serial_number',
       type: 'varchar(128)'
    },{
       name: 'email',
       type: 'text'
    },{
       name: 'processor_name',
       type: 'varchar(128)'
    },{
       name: 'processor_speed',
       type: 'int'
    },{
       name: 'number_of_processor_cores',
       type: 'int'
    },{
       name: 'ram',
       type: 'double(20,0)'
    },{
       name: 'total_internal_storage',
       type: 'varchar(128)'
    },{
       name: 'free_internal_storage',
       type: 'varchar(128)'
    },{
       name: 'total_external_storage',
       type: 'varchar(128)'
    },{
       name: 'free_external_storage',
       type: 'varchar(128)'
    },{
       name: 'application_data',
       type: 'varchar(128)'
    },{
       name: 'screen_resolution',
       type: 'varchar(128)'
    },{
       name: 'system_language',
       type: 'varchar(128)'
    },{
       name: 'screen_width',
       type: 'varchar(128)'
    },{
       name: 'battery_level',
       type: 'int'
    },{
       name: 'battery_condition',
       type: 'varchar(128)'
    },{
       name: 'timezone',
       type: 'varchar(128)'
    },{
       name: 'customer_id',
       type: 'int'
    }], {
       table: 'mdm_device_hardware'
   });
}