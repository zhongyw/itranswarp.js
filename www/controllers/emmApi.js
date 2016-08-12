
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
    warp = db.warp,
    next_id = db.next_id;

function* $getAllMdmDevice(page) {
    page.total = yield MdmDevice.$findNumber('count(id)');
    if (page.isEmpty) {
        return [];
    }
    return yield MdmDevice.$findAll({
        offset: page.offset,
        limit: page.limit,
        order: 'id desc'
    });
}

module.exports = {

    'POST /api/emm/device/devices/list': function* (){
        var path = __dirname + "/../data/device/devices/list.json";
        var page = helper.getPage(this.request);
        var list = yield $getAllMdmDevice(page);

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
    }

    
}