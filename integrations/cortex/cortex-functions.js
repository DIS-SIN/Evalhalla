const evalese_avro_template = {
    "namespace": "cortex.evalhalla.evalese",
    "type": "record",
    "name": "evalese",
    "fields": [
        {"name": "evalese", "type": "string"}
    ]
}

const survey_response_avro_template = {
    "name": "survey_response",
    "type": "record",
    "namespace": "cortex.evalhalla.surveyResponse",
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

const adminUrl = "http://cortex.da-an.ca/admin"

const produceEvalese = function(evalese){
    var data = {
        "topic": survey_name,
        "avro_schema": evalese_avro_template,
        "message":{
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
        function(returnedData, textStatus, jqXHR){
            alert("Successfully Saved Survey: " + survey_name)
        }
    ).error(
        function(jqXHR, textStatus, errorThrown){
            alert("Survey " + survey_name + " not successfully saved " + errorThrown)
        }
    )
}

const consumeEvalese = function(survey_name, variable){
    // variable must be a plain javascript object
    var url = adminUrl + "/topics/" + survey_name + "/consume"
    $.ajax(
        url
    ).success(
        function(data, textStatus, jqXHR){
            if (typeof data.evalese === "undefined"){
                console.log(data)
                alert(
                    "Failed to consume Evalese for survey " + survey_name +
                    "Message is not the correct expected structure"
                )
            }
            else{
                variable.evalese = data.evalese
                console.log(variable)
            }
        }
    ).error(
        function(jqXHR, textStatus, errorThrown){
            alert(
                "Failed to consume Evalese for survey " + survey_name 
                + "with error " + errorThrown + " || " + jqXHR.responseText 
            )
            error = true
        }
    )
}

const produceSurveyResponse = function(survey_response){
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
        function(returnedData, textStatus, jqXHR){
            alert("Response Saved")
        }
    ).error(
        function(jqXHR, textStatus, errorThrown){
            alert("Response  not successfully saved " + errorThrown)
        }
    )
}