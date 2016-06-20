
'use strict';
var weixinConfig = {
    token: 'galj1Kheg9uL26DMs8Nt',
    appid: 'wx57319a3dde25f225',
    appsecret: '5b5c9889a6bbcdb2140781ea0ed0c178',
    encodingAESKey: 'EeBOqudMldoTGEmuvVCbVBqYXtfYUXbmElJzsGiWcib'
},

OAuth = require('wechat-oauth'),
WechatAPI = require('wechat-api'),
client = new OAuth(weixinConfig.appid, weixinConfig.encodingAESKey),
api = new WechatAPI(weixinConfig.appid, weixinConfig.appsecret),
wechat = require('wechat'),
coWechat = require('co-wechat');


module.exports = {
    'GET /api/weixin/roles': function* (){
        this.body = {
            say: "Hell1o",
            client: client,
            url: client.getAuthorizeURLForWebsite('http://112.126.68.31/weichat_dev/osu/example_2.php'),
            api: api
        };
    },
    'POST /api/weixin/robot': coWechat(weixinConfig).middleware(function *() {
          // 微信输入信息都在this.weixin上
          var message = this.weixin;
          console.log(message);
          if (message.FromUserName === 'diaosi') {
            // 回复屌丝(普通回复)
            this.body = 'hehe';
          } else if (message.FromUserName === 'text') {
            //你也可以这样回复text类型的信息
            this.body = {
              content: 'text object',
              type: 'text'
            };
          } else if (message.FromUserName === 'hehe') {
            // 回复一段音乐
            this.body = {
              type: "music",
              content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3"
              }
            };
          } else if (message.FromUserName === 'kf') {
            // 转发到客服接口
            this.body = {
              type: "customerService",
              kfAccount: "test1@test"
            };
          } else {
            var msgStr = "";
            _.each(message, function(value,key){
                msgStr += key + ":" + value + "    |  ";
            })

            // 回复高富帅(图文回复)
            this.body = [
              {
                title: 'Hi',
                description: msgStr,
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
              }
            ];
          }
        })
    
}