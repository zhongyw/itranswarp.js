/**
 * Created by zhongyw on 7/29/16.
 */
'use strict';

// cache api

var
    cache = require('../cache'),
    helper = require('../helper'),
    constants = require('../constants');

var defaultCacheDefinitions = {
    clearCache: [
        {
            key: 'name',
            label: 'Name',
            description: 'Name of the website',
            value: 'Clean Index',
            type: 'button'
        }
    ]
}

module.exports = {

    'GET /api/cache/definitions': function* () {
        helper.checkPermission(this.request, constants.role.ADMIN);
        this.body = defaultCacheDefinitions;
    },
    'GET /api/cache/clear': function* () {
        helper.checkPermission(this.request, constants.role.ADMIN);
        this.body = {};
    },
    'POST /api/cache/clear': function* () {
        helper.checkPermission(this.request, constants.role.ADMIN);
        yield cache.$remove(constants.cache.INDEXMODEL);
        this.body = {code: "1", message: "success"};
    }

}