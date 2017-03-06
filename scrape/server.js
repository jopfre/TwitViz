var config = require('../secret/serverConfig.js').config;

var restify = require('restify');
var mongojs = require('mongojs');

var db = mongojs(config.mongoConnectionString, ['tweets']);

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


//REST server
server.listen(3000, function () {
  console.log("Server started @ 3000");
});

server.get("/tweets", function (req, res, next) {
  db.tweets.find(function (err, tweets) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(tweets));
  });
  return next();
});

server.post('/tweet', function (req, res, next) {
  var tweet = req.params;
  db.tweets.save(tweet,
    function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(data));
    });
  return next();
});

server.put('/tweet/:id', function (req, res, next) {
    // get the existing tweet
    db.tweets.findOne({
      id: req.params.id
    }, function (err, data) {
        // merge req.params/tweet with the server/tweet

        var updProd = {}; // updated tweets 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
          updProd[n] = data[n];
        }
        for (var n in req.params) {
          updProd[n] = req.params[n];
        }
        db.tweets.update({
          id: req.params.id
        }, updProd, {
          multi: false
        }, function (err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
      });
    return next();
  });

server.del('/tweet/:id', function (req, res, next) {
  db.tweets.remove({
    id: req.params.id
  }, function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(true));
  });
  return next();
});

server.get('/tweet/:id', function (req, res, next) {
  db.tweets.findOne({
    id: req.params.id
  }, function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(data));
  });
  return next();
});