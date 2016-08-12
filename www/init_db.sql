loading config_development...
configuration loaded:
{
  "domain": "www.nbn8.com",
  "theme": "default",
  "session": {
    "cookie": "isession",
    "salt": "iTranswarp.js",
    "expires": 604800,
    "httpsForManagement": false
  },
  "db": {
    "host": "localhost",
    "port": 3306,
    "user": "polysaas",
    "password": "polysaas",
    "database": "itranswarp",
    "connectTimeout": 3000,
    "connectionLimit": 20,
    "acquireTimeout": 3000,
    "queueLimit": 10
  },
  "cdn": {
    "static_prefix": ""
  },
  "cache": {
    "prefix": "it/",
    "host": "127.0.0.1",
    "port": 11211,
    "timeout": 1000,
    "retries": 3
  },
  "queue": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "search": {
    "provider": "site_search",
    "configs": {
      "search_url": "https://www.google.com/search?ie=utf-8&q=%s",
      "domain": "www.example.com"
    }
  },
  "oauth2": {
    "weibo": {
      "icon": "weibo",
      "name": "新浪微博登录",
      "app_key": "3273065943",
      "app_secret": "f756a27fbb94ce8748c651a6d00b688e",
      "redirect_uri": "http://www.nbn8.com/auth/callback/weibo"
    },
    "facebook": {
      "icon": "facebook",
      "name": "Facebook登录",
      "app_key": "1229544160397328",
      "app_secret": "7a981b2fbd96c9092ab4084df74cb52e",
      "redirect_uri": "http://your-redirect-uri/config/in/facebook"
    }
  },
  "END": "END",
  "version": "1.0",
  "build": "$BUILD$"
}
init mysql with mysql-warp...
[Pool@3eb1af39] Connection pool created.
found model: article
found model: asks
found model: attachment
found model: authuser
found model: board
found model: category
found model: comment
found model: localuser
found model: navigation
found model: random
found model: reply
found model: resource
found model: setting
found model: text
found model: topic
found model: user
found model: webpage
found model: wiki
found model: wikipage
-- Create administrator account:

Email: 