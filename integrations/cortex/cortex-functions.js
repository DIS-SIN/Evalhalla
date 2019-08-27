//
// Config
//

var _C = {};
const adminUrl = "http://cortex.da-an.ca/admin"

//
// Messages
//

const survey_metrics_avro_template = {
  "namespace": "cortex.evalhalla.surveyMetrics",
  "name": "survey_metrics",
  "type": "record",
  "fields": [
    {
      "name": "payload",
      "type": {
        "name": "payload",
        "type": "record",
        "fields": [
          {
            "name": "uid",
            "type": "string"
          },
          {
            "name": "survey_uid",
            "type": "string"
          },
          {
            "name": "data",
            "type": {
              "name": "data",
              "type": "record",
              "fields": [
                {
                  "name": "uid",
                  "type": "string" // "uid": "test_sur_q_1",
                },
                {
                  "name": "total",
                  "type": "int" // "total": 1,
                },
                {
                  "name": "question",
                  "type": "array" //  "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
                },
                {
                  "name": "stats",
                  "type": "record" //  "stats": "{\"Latvian\":1}",
                },
                {
                  "name": "questionType",
                  "type": "string" //  "questionType": "CLASSIFIED",
                },
                {
                  "name": "classifiedAs",
                  "type": "string" // "classifiedAs": "GC_Language"
                }
              ]
            }
          }
        ]
      }
    }
  ]
}


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

const survey_template_avro_template = {
  "namespace": "cortex.evalhalla.surveyTemplate",
  "name": "survey_template",
  "type": "record",
  "fields": [
    {
      "name": "response",
      "type": {
        "name": "response",
        "type": "record",
        "fields": [
          {
            "name": "uid",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          },
          {
            "name": "title",
            "type": {
              "name": "title",
              "type": "record",
              "fields": [
                {
                  "name": "en",
                  "type": ["string", "null"],
                  "default": ""
                },
                {
                  "name": "fr",
                  "type": ["string", "null"],
                  "default": ""
                }
              ]
            }
          },
          {
            "name": "description",
            "type": {
              "name": "description",
              "type": "record",
              "fields": [
                {
                  "name": "en",
                  "type": ["string", "null"],
                  "default": ""
                },
                {
                  "name": "fr",
                  "type": ["string", "null"],
                  "default": ""
                }
              ]
            }
          },
          {
            "name": "questions",
            "type": {
              //"name": "questions",
              "type": "array",
              "items": {
                "name": "questions_record",
                "type": "record",
                "fields": [
                  {
                    "name": "qid",
                    "type": "string"
                  },
                  {
                    "name": "language",
                    "type": "string"
                  },
                  {
                    "name": "questionType",
                    "type": "string"
                  },
                  {
                    "name": "randomOrder",
                    "type": "string"
                  },
                  {
                    "name": "randomOptions",
                    "type": "string"
                  },
                  {
                    "name": "options",
                    "type": "array"
                  },
                  {
                    "name": "cortex",
                    "type": {
                      "name": "cortex",
                      "type": "record",
                      "fields": [
                        {
                          "name": "uid",
                          "type": "string"
                        },
                        {
                          "name": "atOrder",
                          "type": "string"
                        },
                        {
                          "name": "questionType",
                          "type": "string"
                        },
                        {
                          "name": "classifiedAs",
                          "type": "string"
                        }
                      ]
                    }
                  },
                  {
                    "name": "question",
                    "type": {
                      "name": "question",
                      "type": "record",
                      "fields": [
                        {
                          "name": "en",
                          "type": ["string", "null"],
                          "default": ""
                        },
                        {
                          "name": "fr",
                          "type": ["string", "null"],
                          "default": ""
                        }
                      ]
                    }
                  },
                  {
                    "name": "description",
                    "type": {
                      "name": "description",
                      "type": "record",
                      "fields": [
                        {
                          "name": "en",
                          "type": ["string", "null"],
                          "default": ""
                        },
                        {
                          "name": "fr",
                          "type": ["string", "null"],
                          "default": ""
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "name": "valid",
            "type": {
              "name": "valid",
              "type": "record",
              "fields": [
                {
                  "name": "from",
                  "type": "string",
                  "logicalType": "date"
                },
                {
                  "name": "to",
                  "type": "string",
                  "logicalType": "date"
                }
              ]
            }
          }
        ]
      }
    }
  ]
}

const survey_response_avro_template = {
  "namespace": "cortex.evalhalla.surveyResponse",
  "name": "survey_response",
  "type": "record",
  "fields": [
    {
      "name": "response",
      "type": {
        "name": "response",
        "type": "record",
        "fields": [
          {
            "name": "userAgent",
            "type": "string"
          },
          {
            "name": "surveyEntryMethod",
            "type": "string"
          },
          {
            "name": "conducted",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "respondent",
      "type": {
        "name": "respondent",
        "type": "record",
        "fields": [
          {
            "name": "fluent_at",
            "type": "string"
          },
          {
            "name": "in_department",
            "type": "string"
          },
          {
            "name": "located_in",
            "type": "string"
          },
          {
            "name": "work_as",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "questions",
      "type": {
        "type": "array",
        "items": {
          "name": "questions_record",
          "type": "record",
          "fields": [
            {
              "name": "uid",
              "type": "string"
            },
            {
              "name": "questionType",
              "type": "string"
            },
            {
              "name": "classifiedAs",
              "type": "string"
            },
            {
              "name": "atOrder",
              "type": "string"
            },
            {
              "name": "questionAnswer",
              "type": "string"
            },
            {
              "name": "questionText",
              "type": {
                "name": "questionText",
                "type": "record",
                "fields": [
                  {
                    "name": "en",
                    "type": [
                      "string",
                      "null"
                    ],
                    "default": ""
                  },
                  {
                    "name": "fr",
                    "type": [
                      "string",
                      "null"
                    ],
                    "default": ""
                  }
                ]
              }
            }
          ]
        }
      }
    },
    {
      "name": "created",
      "type": {
        "name": "created",
        "type": "record",
        "fields": [
          {
            "name": "from",
            "type": "string",
            "logicalType": "date"
          },
          {
            "name": "to",
            "type": "string",
            "logicalType": "date"
          }
        ]
      }
    }
  ]
}

//
// Consumers
//

_C.consumeEvaleseCallback = function () { };
_C.consumeEvaleseCallbackError = function () { };
const consumeEvalese = function (survey_name, variable, callback, callbackerror) {
  console.log(`Message to CORTEX (consumeEvalese) ${survey_name}`);

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

  var url = adminUrl + "/topics/" + survey_name + "_survey_evalese/consume";
  $.ajax(
    url
  ).success(
    function (data, textStatus, jqXHR) {
      if (typeof data.evalese === "undefined") {
        console.log(data);
        console.log(
          "Failed to consume Evalese for survey " + survey_name +
          "Message is not the correct expected structure"
        );
      }
      else {
        console.log("CORTEX Success");
        variable.evalese = data.evalese;
        //console.log(variable);
        _C.consumeEvaleseCallback();
      }
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log(
        "Failed to consume Evalese for survey " + survey_name
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
  console.log(`Message to CORTEX (consumeSurveyMetrics) ${survey_name}`);

  if (typeof callback !== "undefined") {
    _C.consumeSurveyMetricsCallback = callback;
  }
  if (typeof callbackerror !== "undefined") {
    _C.consumeSurveyMetricsCallbackError = callbackerror;
  }
  // variable must be a plain javascript object
  // TODO: Update cortex to provide targeted survey metrics vs. most recent
  console.log("WARN: Overriding " + survey_name + " to survey_metrics");
  survey_name = "survey_metrics";

  var url = adminUrl + "/topics/" + survey_name + "/consume";
  $.ajax(
    url
  ).success(
    function (data, textStatus, jqXHR) {
      if (typeof data.payload === "undefined") {
        console.log(data);
        console.log(
          "Failed to consume Metrics for survey [" + survey_name + "]" +
          "Message is not the correct expected structure"
        );
      }
      else {
        console.log("CORTEX Success");
        variable.payload = data.payload;
        //console.log(variable);
        _C.consumeSurveyMetricsCallback();
      }
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log(
        "Failed to consume Metrics for survey [" + survey_name + "]" +
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
    "topic": survey_name + "_survey_evalese",
    "avro_schema": evalese_avro_template,
    "message": {
      "evalese": evalese
    }
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
      console.log("Successfully Saved Survey: " + survey_name)
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log("Survey " + survey_name + " not successfully saved " + errorThrown)
    }
  )
}

const produceSurveyTemplate = function (survey_template) {
  // TODO: Unstub, Check AVRO format
  console.log("Message to CORTEX (produceSurveyTemplate)");

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
  console.log("Message to CORTEX (produceSurveyResponse)");

  var data = {
    "topic": "survey_response",
    "avro_schema": survey_response_avro_template,
    "message": survey_response
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
      console.log("Response Saved")
    }
  ).error(
    function (jqXHR, textStatus, errorThrown) {
      console.log("Response  not successfully saved " + errorThrown)
    }
  )
}