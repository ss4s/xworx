var express = require('express');
var router = express.Router();
var mongoSanitize = require('mongo-express-sanitize');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('userlist', { title: 'Express' });
});
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var projectName = req.body.projectname;
  var contactPref = req.body.contactpref;
  var contactName = req.body.contactname;
  var status = req.body.status;
  var desc = req.body.desc;

  userName = userName.replace(/[\[$\]\<\>&]+/g, '');
  projectName = projectName.replace(/[\[$\]\<\>&]+/g, '');
  contactPref = contactPref.replace(/[\[$\]\<\>&]+/g, '');
  contactName = contactName.replace(/[\[$\]\<\>&]+/g, '');
  desc = desc.replace(/[\[$\]\<\>&]+/g, '');

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
      "name" : userName,
      "projectname" : projectName,
      "contactpref" : contactPref,
      "contactname" : contactName,
      "status" : status,
      "desc" : desc
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});
module.exports = router;
