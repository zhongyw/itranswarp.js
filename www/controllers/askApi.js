'use strict';

// ask api

var
    _ = require('lodash'),
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
    Ask = db.ask,
    Category = db.category,
    Text = db.text,
    warp = db.warp,
    next_id = db.next_id;

function indexAsk(r) {
    process.nextTick(function () {
        search.engine.index({
            type: 'ask',
            id: r.id,
            tags: r.tags,
            name: r.name,
            description: r.description,
            content: helper.html2text(helper.md2html(r.content)),
            created_at: r.publish_at,
            updated_at: r.updated_at,
            url: '/ask/' + r.id,
            upvotes: 0
        });
    });
}

function unindexAsk(r) {
    process.nextTick(function () {
        search.engine.unindex({
            id: r.id
        });
    });
}

function* $getRecentAsks(max) {
    var now = Date.now();
    return yield Ask.$findAll({
        where: 'publish_at<?',
        order: 'publish_at desc',
        params: [now],
        offset: 0,
        limit: max
    });
}

function* $getAllAsks(page) {
    page.total = yield Ask.$findNumber('count(id)');
    if (page.isEmpty) {
        return [];
    }
    return yield Ask.$findAll({
        offset: page.offset,
        limit: page.limit,
        order: 'publish_at desc'
    });
}

function* $getAsks(page) {
    var now = Date.now();
    page.total = yield Ask.$findNumber({
        select: 'count(id)',
        where: 'publish_at<?',
        params: [now]
    });
    if (page.isEmpty) {
        return [];
    }
    return yield Ask.$findAll({
        offset: page.offset,
        limit: page.limit,
        order: 'publish_at desc'
    });
}

function* $getAsksByCategory(categoryId, page) {
    var now = Date.now();
    page.total = yield Ask.$findNumber({
        select: 'count(id)',
        where: 'publish_at<? and category_id=?',
        params: [now, categoryId]
    });
    if (page.isEmpty) {
        return [];
    }
    return yield Ask.$findAll({
        order: 'publish_at desc',
        where: 'publish_at<? and category_id=?',
        params: [now, categoryId],
        offset: page.offset,
        limit: page.limit
    });
}

function* $getAsk(id, includeContent) {
    var
        text,
        ask = yield Ask.$find(id);
    if (ask === null) {
        throw api.notFound('Ask');
    }
    if (includeContent) {
        text = yield Text.$find(ask.content_id);
        if (text === null) {
            throw api.notFound('Text');
        }
        ask.content = text.value;
    }
    return ask;
}

function toRssDate(dt) {
    return new Date(dt).toGMTString();
}

function* $getFeed(domain) {
    var
        i, text, ask, url,
        asks = yield $getRecentAsks(20),
        last_publish_at = asks.length === 0 ? 0 : asks[0].publish_at,
        website = yield settingApi.$getWebsiteSettings(),
        rss = [],
        rss_footer = '</channel></rss>';
    rss.push('<?xml version="1.0"?>\n');
    rss.push('<rss version="2.0"><channel><title><![CDATA[');
    rss.push(website.name);
    rss.push(']]></title><link>http://');
    rss.push(domain);
    rss.push('/</link><description><![CDATA[');
    rss.push(website.description);
    rss.push(']]></description><lastBuildDate>');
    rss.push(toRssDate(last_publish_at));
    rss.push('</lastBuildDate><generator>iTranswarp.js</generator><ttl>3600</ttl>');

    if (asks.length === 0) {
        rss.push(rss_footer);
    }
    else {
        for (i=0; i<asks.length; i++) {
            ask = asks[i];
            text = yield Text.$find(ask.content_id);
            url = 'http://' + domain + '/ask/' + ask.id;
            rss.push('<item><title><![CDATA[');
            rss.push(ask.name);
            rss.push(']]></title><link>');
            rss.push(url);
            rss.push('</link><guid>');
            rss.push(url);
            rss.push('</guid><author><![CDATA[');
            rss.push(ask.user_name);
            rss.push(']]></author><pubDate>');
            rss.push(toRssDate(ask.publish_at));
            rss.push('</pubDate><description><![CDATA[');
            rss.push(helper.md2html(text.value, true));
            rss.push(']]></description></item>');
        }
        rss.push(rss_footer);
    }
    return rss.join('');
}

var RE_TIMESTAMP = /^\-?[0-9]{1,13}$/;

module.exports = {

    $getRecentAsks: $getRecentAsks,

    $getAsksByCategory: $getAsksByCategory,

    $getAllAsks: $getAllAsks,

    $getAsks: $getAsks,

    $getAsk: $getAsk,

    'GET /feed': function* () {
        var
            rss,
            host = this.request.host,
            gf = function* () {
                return yield $getFeed(host);
            };
        rss = yield cache.$get('cached_rss', gf);
        this.set('Cache-Control', 'max-age: 3600');
        this.type = 'text/xml';
        this.body = rss;
    },

    'GET /api/asks/:id': function* (id) {
        /**
         * Get ask.
         * 
         * @name Get Ask
         * @param {string} id: Id of the ask.
         * @param {string} [format]: Return html if format is 'html', default to '' (raw).
         * @return {object} Ask object.
         * @error {resource:notfound} Ask was not found by id.
         */
        var ask = yield $getAsk(id, true);
        if (ask.publish_at > Date.now() && (this.request.user===null || this.request.user.role > constants.role.CONTRIBUTOR)) {
            throw api.notFound('Ask');
        }
        if (this.request.query.format === 'html') {
            ask.content = helper.md2html(ask.content, true);
        }
        this.body = ask;
    },

    'GET /api/asks': function* () {
        /**
         * Get asks by page.
         * 
         * @name Get Asks
         * @param {number} [page=1]: The page number, starts from 1.
         * @return {object} Ask objects and page information.
         */
        helper.checkPermission(this.request, constants.role.CONTRIBUTOR);
        var
            page = helper.getPage(this.request),
            asks = yield $getAllAsks(page);
        this.body = {
            page: page,
            asks: asks
        };
    },

    'POST /api/asks': function* () {
        /**
         * Create a new ask.
         * 
         * @name Create Ask
         * @param {string} category_id: Id of the category that ask belongs to.
         * @param {string} name: Name of the ask.
         * @param {string} description: Description of the ask.
         * @param {string} content: Content of the ask.
         * @param {string} [tags]: Tags of the ask, seperated by ','.
         * @param {string} [publish_at]: Publish time of the ask with format 'yyyy-MM-dd HH:mm:ss', default to current time.
         * @param {image} [image]: Base64 encoded image to upload as cover image.
         * @return {object} The created ask object.
         * @error {parameter:invalid} If some parameter is invalid.
         * @error {permission:denied} If current user has no permission.
         */
        helper.checkPermission(this.request, constants.role.EDITOR);
        var
            text,
            ask,
            attachment,
            ask_id,
            content_id,
            data = this.request.body;
        json_schema.validate('createAsk', data);
        // check category id:
        yield categoryApi.$getCategory(data.category_id);

        attachment = yield attachmentApi.$createAttachment(
            this.request.user.id,
            data.name.trim(),
            data.description.trim(),
            new Buffer(data.image, 'base64'),
            null,
            true);

        content_id = next_id();
        ask_id = next_id();

        text = yield Text.$create({
            id: content_id,
            ref_id: ask_id,
            value: data.content
        });

        ask = yield Ask.$create({
            id: ask_id,
            user_id: this.request.user.id,
            user_name: this.request.user.name,
            category_id: data.category_id,
            cover_id: attachment.id,
            content_id: content_id,
            name: data.name.trim(),
            description: data.description.trim(),
            tags: helper.formatTags(data.tags),
            publish_at: (data.publish_at === undefined ? Date.now() : data.publish_at)
        });

        ask.content = data.content;
        indexAsk(ask);

        this.body = ask;
    },

    'POST /api/asks/:id': function* (id) {
        /**
         * Update an exist ask.
         * 
         * @name Update Ask
         * @param {string} id: Id of the ask.
         * @param {string} [category_id]: Id of the category that ask belongs to.
         * @param {string} [name]: Name of the ask.
         * @param {string} [description]: Description of the ask.
         * @param {string} [content]: Content of the ask.
         * @param {string} [tags]: Tags of the ask, seperated by ','.
         * @param {string} [publish_at]: Publish time of the ask with format 'yyyy-MM-dd HH:mm:ss'.
         * @return {object} The updated ask object.
         * @error {resource:notfound} Ask was not found by id.
         * @error {parameter:invalid} If some parameter is invalid.
         * @error {permission:denied} If current user has no permission.
         */
        helper.checkPermission(this.request, constants.role.EDITOR);
        var
            user = this.request.user,
            ask,
            props = [],
            text,
            attachment,
            data = this.request.body;
        json_schema.validate('updateAsk', data);

        ask = yield $getAsk(id);
        if (user.role !== constants.role.ADMIN && user.id !== ask.user_id) {
            throw api.notAllowed('Permission denied.');
        }
        if (data.category_id) {
            yield categoryApi.$getCategory(data.category_id);
            ask.category_id = data.category_id;
            props.push('category_id');
        }
        if (data.name) {
            ask.name = data.name.trim();
            props.push('name');
        }
        if (data.description) {
            ask.description = data.description.trim();
            props.push('description');
        }
        if (data.tags) {
            ask.tags = helper.formatTags(data.tags);
            props.push('tags');
        }
        if (data.publish_at !== undefined) {
            ask.publish_at = data.publish_at;
            props.push('publish_at');
        }
        if (data.image) {
            // check image:
            attachment = yield attachmentApi.$createAttachment(
                user.id,
                ask.name,
                ask.description,
                new Buffer(data.image, 'base64'),
                null,
                true);
            ask.cover_id = attachment.id;
            props.push('cover_id');
        }
        if (data.content) {
            text = yield Text.$create({
                ref_id: ask.id,
                value: data.content
            });
            ask.content_id = text.id;
            ask.content = data.content;
            props.push('content_id');
        }
        if (props.length > 0) {
            props.push('updated_at');
            props.push('version');
            yield ask.$update(props);
        }
        if (!ask.content) {
            text = yield Text.$find(ask.content_id);
            ask.content = text.value;
        }
        this.body = ask;
    },

    'POST /api/asks/:id/delete': function* (id) {
        /**
         * Delete an ask.
         * 
         * @name Delete Ask
         * @param {string} id: Id of the ask.
         * @return {object} Object contains deleted id.
         * @error {resource:notfound} Ask not found by id.
         * @error {permission:denied} If current user has no permission.
         */
        helper.checkPermission(this.request, constants.role.EDITOR);
        var
            user = this.request.user,
            ask = yield $getAsk(id);
        if (user.role !== constants.role.ADMIN && user.id !== ask.user_id) {
            throw api.notAllowed('Permission denied.');
        }
        yield ask.$destroy();
        yield warp.$update('delete from texts where ref_id=?', [id]);
        this.body = {
            id: id
        };
    }
};
