var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };

module.exports.reviewsReadOne = function(req, res) {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById(req.params.locationid)
           .select('name reviews')
           .exec(
                function(err, location) {
                    var response, review;
                    if (!location) { 
                        sendJsonResponse(res, 404, {"message": "locationid not found"});
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                        if (location.reviews && location.reviews.length > 0) {
                            var review = location.reviews.id(req.params.reviewid.toString());
                            if (!review) {
                                var resptext = "reviewid [" + req.params.reviewid + "] not found"
                                sendJsonResponse(res, 404, {"message": resptext});
                            } else {
                                response = { location : {
                                                name : location.name,
                                                id : req.params.locationid
                                                },
                                             review : review
                                           };
                                sendJsonResponse(res, 200, response);
                            }
                    } else {
                        sendJsonResponse(res, 404, {"message": "No reviews found"});
                    }
            });
    } else {
        sendJsonResponse(res, 404, {"message": "Not found, locationid and reviewid are both required"});
    }
};

module.exports.reviewsUpdateOne = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };
module.exports.reviewsDeleteOne = function (req, res) { sendJsonResponse(res, 200, {"status" : "success"}); };