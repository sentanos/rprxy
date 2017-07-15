var express = require('express');
var https = require('https');
var parser = require('cheerio');
var router = express.Router();

router.get('/api/searchmusic/:music', function (req, res, next) {
  https.get('https://search.roblox.com/catalog/json?Category=9&Keyword=' + encodeURI(req.params.music), function (search) {
    search.pipe(res);
  });
});

router.get('/api/usernames/:userId*?', function (req, res, next) {
  var userId = req.params.userId || req.query.userId;
  if (!userId) {
    res.end('Parameter userId is required.');
    return;
  }
  https.get('https://www.roblox.com/users/' + encodeURI(userId) + '/profile', function (user) {
    if (user.statusCode !== 200) {
      res.end('Request failed, make sure the userId is valid');
    }

    var raw = '';
    user.on('data', function (chunk) {
      raw += chunk;
    });

    user.on('end', function () {
      var $ = parser.load(raw);
      var past = $('.tooltip-pastnames');
      var names = [];
      if (past.length > 0) {
        names = past.attr('title').split(', ');
      }
      names.unshift($('.header-title').find('h2').text());
      res.end(JSON.stringify(names));
    });
  });
});

module.exports = router;
