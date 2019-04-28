const express = require("express");
const router = express.Router();
const path = require("path");
// Load the Cloudant library.
var Cloudant = require("@cloudant/cloudant");

// Initialize Cloudant with settings from .env
var username = "bd26a1db-4837-400f-af1d-dbed3670e2c0-bluemix";
var password =
  "92da0565520824dc239cb23a45cb102277f44da00afb23cdaa7dcae03adc474e";
var cloudant = Cloudant({ account: username, password: password }, function(
  err,
  cloudant,
  pong
) {
  if (err) {
    alert(
      "Fallo la conexion con Cloudant, favor de iniciar revisar la conexión y reiniciar: " +
        err.message
    );
  }
});

//Test
router.get("/", (req, res) => {
  getTweets().then(results => {
    res.render("index", { results });
  });
});

router.get("/predictive", (req, res) => {
  res.render("predictive", {});
});

router.post("/guardar_text", (req, res) => {
  console.log(req.body);
  console.log(req.body.text);
});

async function getTweets() {
  var db = cloudant.db.use("tweetdb");

  db.find({ selector: { _id: "2500" } }, function(err, result) {
    if (err) {
      console.log("Fecha no encontrada en la base de datos: ", err);
      throw err;
    }
    console.log(result.docs[0].tweets);
    return result.docs[0].tweets;
  });
}

module.exports = router;
