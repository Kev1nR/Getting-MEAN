var request = require('request');

var apiOptions = { server : "http://localhost:3000/" };
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://glacial-crag-39837.herokuapp.com/";
}

var renderHomepage = function(req, res, responseBody){
  var message;
  
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (responseBody.length <= 0) {
      message = "No places found nearby";
    }
  }

  res.render('locations-list', { 
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find a place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message: message
 });
}

var renderDetailPage = function(req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {title: locDetail.name},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
    location: locDetail
  });
};

var formatDistance = function(distance) {
  var numDistance, unit;
  
  if (distance <= 1000) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'm';
  } else {
    numDistance = parseInt(distance / 1000, 10);
    unit = 'km';
  }
  return numDistance + unit;
};

/* GET homeList page */
module.exports.homeList = function(req, res, next) {
  var requestOptions, path;

  path = 'api/locations';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: { 
      lng: -0.7992599,
      lat : 51.378091,
      maxDistance : 20
    } 
  };
  request (
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;

      if (response.statusCode === 200 && data.length > 0) {
        for (i = 0; i < data.length; i++)
          data[i].distance = formatDistance(data[i].distance);
      }
      renderHomepage(req, res, data);
    });  
};

/* GET Location info page */
module.exports.locationInfo = function(req, res, next) {
  var requestOptions, path;

  path = 'api/locations/' + req.params.locationid;
  requestOptions = {
    url : apiOptions.server + path,
    method : 'GET',
    json : {}
  };
  
  request(
    requestOptions,  
    function(err, response, body) {
        var data;
        data = body;
        console.log(data);
       
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        };
        renderDetailPage(req, res, data);
      });
  
};  

/* GET Add review page */
module.exports.addReview = function(req, res, next) {
  res.render('location-review-form', { 
    title: 'Review Starcups on Loc8r',
    pageHeader: { title: 'Review Starcups' } });
  };    