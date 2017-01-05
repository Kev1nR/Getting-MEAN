var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function(){
    var radius = 6371;
    var getDistanceFromRadians = function (rads) {
        return parseFloat(rads * radius);
    };
    var getRadsFromDistance = function(dist){
        return parseFloat(dist / radius);
    };

    return {
        getDistanceFromRadians : getDistanceFromRadians,
        getRadsFromDistance : getRadsFromDistance
    };
})();

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.locationsListByDistance = function (req, res) { 
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
        };
    var geoOptions = { 
        spherical: true,
        num: 10 
        };

    Loc.geoNear(point, options, callback); 
};

module.exports.locationsCreate = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };

module.exports.locationsReadOne = function(req, res) {
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid)
           .exec(function(err, location) {
                if (!location) {
                    sendJsonResponse(res, 404, {"message": "locationid not found" });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                    sendJsonResponse(res, 200, location);
            });
            } else {
                sendJsonResponse(res, 404, {"message": "No locationid in request"});
    }
};

module.exports.locationsUpdateOne = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };
module.exports.locationsDeleteOne = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };
