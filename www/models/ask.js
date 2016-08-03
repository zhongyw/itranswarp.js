/**
 * Created by zhongyw on 7/31/16.
 */
'use strict';

// article.js

var base = require('./_base.js');

module.exports = function (warp) {
    return base.defineModel(warp, 'Ask', [
        base.column_id('article_id', { index: true }),
        base.column_id('question_id', { index: true }),
        base.column_id('voice_id', { index: true })

    ], {
        table: 'asks'
    });
};
