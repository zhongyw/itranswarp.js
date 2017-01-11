
'use strict';

var
    _ = require('lodash'),
    fs = require('co-fs'),
    api = require('../api'),
    db = require('../db'),
    cache = require('../cache'),
    images = require('./_images'),
    helper = require('../helper'),
    constants = require('../constants'),
    search = require('../search/search'),
    json_schema = require('../json_schema');

var
    settingApi = require('./settingApi'),
    categoryApi = require('./categoryApi'),
    attachmentApi = require('./attachmentApi');

var
    User = db.user,
    MdmDevice = db.mdm_device,
    MdmDeviceHarware = db.mdm_device_hardware,
    warp = db.warp,
    next_id = db.next_id;

function* $getAllMdmDevice(page, params) {
    page.total = yield MdmDevice.$findNumber('count(id)');
    if (page.isEmpty) {
        return [];
    }
    // return yield MdmDevice.$findAll({
    //     offset: page.offset,
    //     limit: page.limit,
    //     order: 'id desc'
    // });
    var sql = "select *  from mdm_device where 1=1 ",
        pArr = [];
    if(params.deviceName) sql += " and device_name like  ? ",pArr.push("%" + params.deviceName + "%") ;
    return yield warp.$query(sql,pArr);
}
function* $getAllMdmDeviceHardware(){
    return yield MdmDeviceHarware.$findAll();
}
function* $getMdmDeviceHardwareByDeviceId(){
    return yield
}

module.exports = {
    'POST /api/emm/usergroup/list': function* (){
      this.body = [{
                  label: '节点一',
                  value: '0-0',
                  key: '0-0',
                  children: [{
                      label: '子节点一',
                      value: '0-0-0',
                      key: '0-0-0'
                  }]
              }, {
                  label: '节点二',
                  value: '0-1',
                  key: '0-1',
                  children: [{
                      label: '子节点三',
                      value: '0-1-0',
                      key: '0-1-0',
                  },{
                      label: '子节点四',
                      value: '0-1-1',
                      key: '0-1-1',
                  }]
              }

          ];
    },
    'POST /api/emm/device/devices/list': function* (){
        var path = __dirname + "/../data/device/devices/list.json";
        var page = helper.getPage(this.request);
        //console.log(this.request.body);
        var list = yield $getAllMdmDevice(page, this.request.body);

        // set in nginx
        /*this.set('Access-Control-Allow-Origin', '*');
        this.set('Access-Control-Allow-Credentials', 'true');
        this.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        this.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        this.set('Content-Type', 'application/json');*/

        //this.body = fs.createReadStream(path);  //response: Content-Type:application/octet-stream
        this.body = {
            page: page,
            devices: list
        };
        //this.body = yield fs.readFile(path, 'utf8');
    },
    'GET /api/emm/device/hardware': function* (){
        var list = yield $getAllMdmDeviceHardware();
        this.body = {
            hardware: list
        }
    }


}
