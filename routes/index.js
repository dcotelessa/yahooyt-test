var express = require('express');
var router = express.Router();
var google = require('googleapis');

/* GET home page. */
router.get('/', function(req, res, next) {
  renderPage(req, res, next);
});

/* Dupe other pages but use same function. */
router.get('/:key', function(req, res, next) {
  renderPage(req, res, next);
});

function renderPage(req, res, next){
  var r_res = res;
  var playlist = [];
  var infolist = [];
  var configGet = require('../config');
  var config = configGet.getConfig('config.json');

  var yt = google.youtube({version:'v3', auth:config.api_key});

  //get key from param
  var paramsKey = req.params.key;

  //we need to replace spaces with plus signs to correctly search
  var search_options = config.search_options;
  search_options = search_options.map(function(item){
    item.query = item.query.replace(/\s+/g, '+');
    //as long as we are here, set item selected if there is a Key
    if (item.query === paramsKey) {
      item.selected = true;
    }
    return item;
  });

  // For now, only 15 results
  var list = yt.search.list({
    'q': paramsKey || search_options[0].query,
    'type': 'video',
    'part': "snippet",
    'videoEmbeddable': 'true',
    'maxResults': 15
  }, onGotList);

  function onGotList(req, res, next){

    //set information for new arrays: playlist and infolist
    playlist = res.items.map(function(item){
      return item.id.videoId;
    });

    infolist = res.items.map(function(item){
      item.snippet.thumbnail = item.snippet.thumbnails.default.url;
      delete item.snippet.thumbnails;
      return item.snippet;
    });

//NOW RENDER! I set this up in case we eventually wanted to extend beyond one page of 25 selections
    r_res.render('index', {
       title: 'Yahoo Test Playlist',
       search_options: search_options,
       playlist: playlist,
       infolist: infolist,
       paramsKey: paramsKey || search_options[0].query,
       prev: (res.prevPageToken || ""),
       next: (res.nextPageToken || "")
      });
  }
}

module.exports = router;
