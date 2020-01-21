//
// Config
//

var _C = {};
// CORTEX Endpoint. Deprecated.
const adminUrl = "https://cortex.da-an.ca/admin"
// EvalhallaBackend Production
const backendUrl = "https://api.app.evalhalla.ca";
// EvalhallaBackend Pre-prod
const backendUrlPP = "https://preproduction.api.app.evalhalla.ca";
// Development Backend (Local Docker)
const backendUrlDev = "http://localhost:5000";

// set backend
_C.connectedBackend = backendUrl; // TODO: Change this to alter backend connection
// prod: backendUrl
// dev: backendUrlDev
// suggest environment variable or similar for this.

/*
[evhbak]
docker-compose up --build
local:host:5000

[evhfe]
docker build .
docker image ls
docker run -p 8000:80 123imgid
localhost:8000
If you're making changes you might need
docker container ls
docker stop container_name_whatever
then repeat above
*/

// route helpers
_C.apiroute = {};
_C.apiroute.evalese = function (survey_name) {
  return _C.connectedBackend + "/evalese/" + survey_name.toUpperCase();
}
_C.apiroute.responses = function (survey_name) {
  return _C.connectedBackend + "/responses/" + survey_name.toUpperCase();
}
//
// Messages
//

const survey_metrics_avro_template = {}


const evalese_avro_template = {
  "namespace": "cortex.evalhalla.evalese",
  "type": "record",
  "name": "evalese",
  "fields": [
    {
      "name": "evalese",
      "type": "string"
    }
  ]
}

const survey_template_avro_template =
{
  "namespace": "CORTEX",
  "name": "Survey",
  "type": "record",
  "fields": [
    { "name": "uid", "type": "string" },
    { "name": "format", "type": "string" },
    { "name": "content", "type": "string" }
  ]
}

const survey_response_avro_template =
{
  "namespace": "CORTEX",
  "name": "survey_response",
  "type": "record",
  "fields": [
    { "name": "uid", "type": "string" },
    { "name": "content", "type": "string" }
  ]
}

//
// Consumers
//

_C.consumeEvaleseCallback = function () { };
_C.consumeEvaleseCallbackError = function () { };
const consumeEvalese = function (survey_name, variable, callback, callbackerror) {
  console.log(`Message to EvalhallaBackend (consumeEvalese) ${survey_name.toUpperCase()}`);

  if (typeof callback !== "undefined") {
    _C.consumeEvaleseCallback = callback;
  }
  if (typeof callbackerror !== "undefined") {
    _C.consumeEvaleseCallbackError = callbackerror;
  }
  // variable must be a plain javascript object
  //console.log("WARN: Overriding " + survey_name + " to survey_evalese");
  //survey_name = "survey_evalese";
  // end WARN

  //var url = adminUrl + "/topics/" + survey_name.toUpperCase() + "_survey_evalese/consume";
  //var url = "https://api.app.evalhalla.ca/evalese?surveyName=" + survey_name.toUpperCase();

  var url = _C.connectedBackend + "/evalese?surveyName=" + survey_name.toUpperCase();
  $.ajax(
    url
    //,{
    //  crossDomain: true,
    //  dataType: 'jsonp'
    //}
  ).success(
    function (data, textStatus, jqXHR) {
      if (typeof data.evalese === "undefined") {
        console.log(data);
        console.log(
          "Failed to consume Evalese for survey " + survey_name.toUpperCase() +
          "Message is not the correct expected structure"
        );
      }
      else {
        console.log("EvalhallaBackend Success");
        // note: this is _E.feature.qparam.evalhalla_backend
        variable.evalese = data.evalese;
        //console.log(variable);
        _C.consumeEvaleseCallback();
      }
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log(
        "Failed to consume Evalese for survey " + survey_name.toUpperCase()
        + "with error " + errorThrown + " || " + jqXHR.responseText
      );
      error = true;
      _C.consumeEvaleseCallbackError();
    }
  )
}

_C.consumeSurveyMetricsCallback = function () { };
_C.consumeSurveyMetricsCallbackError = function () { };
const consumeSurveyMetrics = function (survey_name, variable, callback, callbackerror) {
  console.log(`Message to EvalhallaBackend (consumeSurveyMetrics) ${survey_name.toUpperCase()}`);

  if (typeof callback !== "undefined") {
    _C.consumeSurveyMetricsCallback = callback;
  }
  if (typeof callbackerror !== "undefined") {
    _C.consumeSurveyMetricsCallbackError = callbackerror;
  }
  // variable must be a plain javascript object
  // TODO: Update cortex to provide targeted survey metrics vs. most recent


  /*var url = adminUrl + "/topics/" + survey_name.toUpperCase() + "/consume";
  console.log("WARN: Overriding " + survey_name.toUpperCase() + " to survey_metrics");
  url = adminUrl + "/topics/survey_metrics/consume";
  */
  var url = _C.connectedBackend + "/responses/" + survey_name.toUpperCase();

  $.ajax(
    url
  ).success(
    function (data, textStatus, jqXHR) {
      if (typeof data.payload === "undefined") {
        console.log(data);
        console.log(
          "Failed to consume Metrics for survey [" + survey_name.toUpperCase() + "]" +
          "Message is not the correct expected structure"
        );
      }
      else {
        console.log("EvalhallaBackend Success");
        variable.payload = data.payload;
        //console.log(variable);
        _C.consumeSurveyMetricsCallback();
      }
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log(
        "Failed to consume Metrics for survey [" + survey_name.toUpperCase() + "]" +
        + "with error " + errorThrown + " || " + jqXHR.responseText
      );
      error = true;
      _C.consumeSurveyMetricsCallbackError();
    }
  )
}


//
// Producers
//

const produceEvalese = function (survey_name, evalese) {
  var data = {
    "surveyName": survey_name.toUpperCase(),
    "evalese": evalese
  }

  $.ajax(
    _C.connectedBackend + "/evalese/" + survey_name.toUpperCase()
    ,
    {
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "text",
      method: "POST"
    }
  ).success(
    function (returnedData, textStatus, jqXHR) {
      console.log("Successfully Saved Survey: " + survey_name.toUpperCase())
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log("Survey " + survey_name.toUpperCase() + " not successfully saved " + errorThrown)
    }
  )
}

const produceSurveyTemplate = function (survey_template) {
  // TODO: Unstub, Check AVRO format
  console.log("Message to EvalhallaBackend (produceSurveyTemplate)");

  // turn off function for now
  if (true == true) {
    console.log("produceSurveyTemplate Deprecation Note: Disconnecting Template for Evalese Render");
    return null;
  }

  var data = {
    "topic": "survey_json",
    "avro_schema": survey_template_avro_template,
    "message": survey_template
  }

  $.ajax(
    adminUrl + "/produce",
    {
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "text",
      method: "POST"
    }
  ).success(
    function (returnedData, textStatus, jqXHR) {
      console.log("Survey Template Saved")
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log("Survey Template not successfully saved " + errorThrown)
    }
  )
}

const produceSurveyResponse = function (survey_response) {
  console.log("Message to EvalhallaBackend (produceSurveyResponse)");

  var data_r = survey_response;
  var url = _C.connectedBackend + "/responses/" + survey_name.toUpperCase();

  $.ajax(
    url,//adminUrl + "/produce",
    {
      data: JSON.stringify(data_r),
      contentType: "application/json",
      dataType: "text",
      method: "POST"
    }
  ).success(
    function (returnedData, textStatus, jqXHR) {
      console.log("Response Saved")
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log("Response  not successfully saved " + errorThrown)
    }
  )
}