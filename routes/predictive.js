const express = require("express");
const router = express.Router();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");

//Test

router.post("/text", (req, res) => {
  haz(url);
});

router.post("/url", async (req, res) => {
  console.log("url");
  let url = getUrl(req);
  getEntitiesCategories(url);
});

function getUrl(req) {
  return req.body.value;
}

async function getEntitiesCategories(url) {
  console.log("hola");

  credentials = {
    apikey: "uNHvFhcLQex3Vwtb4aarSj73Ru9ifuRCVzQ6I-_AqQfX",
    iam_apikey_description:
      "Auto-generated for key dd3bd258-fd64-4ae4-b16d-7e225559dc5a",
    iam_apikey_name: "Auto-generated service credentials",
    iam_role_crn: "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    iam_serviceid_crn:
      "crn:v1:bluemix:public:iam-identity::a/9457bf8cdaaa4541a43ca4fa4aa0bbf1::serviceid:ServiceId-aa211c7c-62a5-47a5-8b86-95719faf3c67",
    url: "https://gateway.watsonplatform.net/natural-language-understanding/api"
  };

  const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2018-11-16",
    iam_apikey: credentials["apikey"],
    url: credentials["url"]
  });

  const analyzeParams = {
    url: url,
    features: {
      entities: {
        limit: 3,
        sentiment: true
      },
      categories: {
        limit: 3
      },
      keywords: {
        sentiment: true,
        emotion: true,
        limit: 3
      },
      concepts: { limit: 3 }
    }
  };

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then(analysisResults => {
      let result = JSON.stringify(analysisResults, null, 2);
      return result;
    })
    .then(result => haz(result))
    .catch(err => {
      console.log("error:", err);
    });
}

function haz(result) {
  console.log(result);
}

module.exports = router;
