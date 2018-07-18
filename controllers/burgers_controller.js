var express = require("express");
var router = express.Router();
var myhamburger = require("../models/burger.js");


router.get("/", function(req, res) {
  myhamburger.all(function(data) {
    var hbsObject = {
      burgers_tb: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers_tb", function(req, res) {
  myhamburger.create("req", function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers_tb/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  myhamburger.update({
    devour: req.body.devour
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers_tb/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});






module.exports = router