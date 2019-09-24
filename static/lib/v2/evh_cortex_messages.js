/*

Evalhalla Evalese to JSON export feature

Given Omar, a survey developer
When Omar chooses to send his survey template to CORTEX
Then a JSON representation of his survey will be created
 And the JSON will be sent to CORTEX

_E["feature"]["exportJSON"]

*/

// init the package
(_E.feature.cortex) ? true : _E.feature.cortex = {};

_E.feature.cortex.messages = {};
_E.feature.cortex.messages.debug = false;

_E.feature.cortex.messages.convert_survista_to_aesir = function (response) {
    let formatted_json;


    //_E.feature.instadash.render_data(response);
    /*
     {
        "rgroup_qid_1": "Yes",
        "meta_useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        "textarea_qid_3": "This is a test",
        "tombstone_city": "Conception Harbour, NL [T]",
        "scale1to5_qid_2": "5",
        "meta_entry_method": "",
        "meta_evalhalla_sur": "DEMO",
        "tombstone_language": "en",
        "meta_question_count": 3,
        "meta_submission_time": "2019-09-08T16:49:42.563Z",
        "textofquestion_qid_1": " Are you here in person? ",
        "textofquestion_qid_2": " Overall, how satisfied were you with this presentation? ",
        "textofquestion_qid_3": " Any other thoughts? ",
        "tombstone_department": "Canada Deposit Insurance Corporation (CDIC-SADC)",
        "tombstone_offering_id": "",
        "textarea_qid_3_language": "en",
        "textarea_qid_3_sentences": [
            {
                "text": "This is a test",
                "magnitudeScore": 0.10000000149011612,
                "sentimentScore": 0.10000000149011612
            }
        ],
        "tombstone_classification": "CS-02",
        "textarea_qid_3_magnitudeScore": 0.10000000149011612,
        "textarea_qid_3_sentimentScore": 0.10000000149011612
    }
    
    */
    let converted_aesir_format = {
        "payload": {
            "uid": "a417b5032161a1f927c58bb85d40cc1f",
            "survey_uid": _E.feature.qparam.settings.sur,
            "data": [
                /*{
                    "uid": "test_sur_q_1",
                    "total": 1000,
                    "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
                    "stats": "{\"Gwich’in\":11,\"Malecite\":7,\"Punjabi\":17}",
                    "questionType": "CLASSIFIED",
                    "classifiedAs": "GC_Language"
                }*/
            ]
        }
    }

    let questions = [];
    let qcount = 0;

    for (let i = 0; i < response.length; i++) {
        let r = response[i];
        let rkeys = (r) ? Object.keys(r) : [];
        qcount = r["meta_question_count"];
        for (let q = 1; q <= qcount; q++) {
            let qp = {};
            let stats = {
                "uid": `${_E.feature.qparam.settings.sur}_q_${q}`,
                "total": 0,
                "question": "",//"[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
                "stats": "",//"{\"Gwich’in\":11,\"Malecite\":7,\"Punjabi\":17}",
                "questionType": "SINGLE_CHOICE", // defaults to fix undefined bug
                "classifiedAs": "RGROUP"// defaults to fix undefined bug
            }
            //console.log(">> " + JSON.stringify(r));

            for (let ii = 0; ii < rkeys.length; ii++) {
                let rk = rkeys[ii];
                let check_q = (rk.split("_")[2]) ? rk.split("_")[2] : "undefined";
                if (check_q == q) {//(rk.indexOf("qid_" + q) != -1) {
                    //stats[rk] = r[rk];


                    let metainf = rk.split("_");
                    let qtype = (metainf[0]) ? metainf[0] : "undefined";
                    let qidlbl = (metainf[1]) ? metainf[1] : "undefined";
                    let qid = (metainf[2]) ? metainf[2] : "undefined";
                    let submeta = (metainf[3]) ? metainf[3] : "undefined";

                    if (qtype == "textofquestion") {
                        stats["question"] = [(r[rk]) ? r[rk] : ""];
                    } else if (qtype != "textofquestion" && submeta == "undefined") {
                        stats["questionType"] = _E.core.interpreter.cortex_questiontypes[qtype].type;
                        stats["classifiedAs"] = _E.core.interpreter.cortex_questiontypes[qtype].subtype;

                        if (qtype == "cgroup") {
                            //console.log("> " + JSON.stringify(r[rk]));
                            stats["answer"] = (r[rk]) ? r[rk] : ["None"];
                        } else {
                            stats["answer"] = [(r[rk]) ? r[rk] : "Blank"];
                        }
                    } else if (qtype == "textarea" && submeta == "sentimentScore") {
                        stats["sentimentScore"] = [(r[rk]) ? r[rk] : 0.0];
                    }
                }
            }
            questions.push(stats);
        }
    }

    //
    let stats_metrics = [];
    // load stats into here

    // now get the tombstone data
    for (let i = 0; i < response.length; i++) {
        let r = response[i];
        let rkeys = (r) ? Object.keys(r) : [];
        //qcount = r["meta_question_count"];
        //for (let q = 1; q <= qcount; q++) {
        //    let qp = {};

        for (let ii = 0; ii < rkeys.length; ii++) {
            let stats = {
                "uid": `${_E.feature.qparam.settings.sur}_q_tombstone`,
                "total": 0,
                "question": "",//"[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
                "stats": "",//"{\"Gwich’in\":11,\"Malecite\":7,\"Punjabi\":17}",
                "questionType": "",
                "classifiedAs": ""
            }
            let rk = rkeys[ii];
            if (rk.indexOf("tombstone") != -1
                || rk.indexOf("meta_useragent") != -1
                || rk.indexOf("meta_entry") != -1) {
                //stats[rk] = r[rk];

                let metainf = rk.split("_");
                let qtype = (metainf[0]) ? metainf[0] : "undefined";
                let qidlbl = (metainf[1]) ? metainf[1] : "undefined";
                let qid = (metainf[2]) ? metainf[2] : "undefined";
                let submeta = (metainf[3]) ? metainf[3] : "undefined";

                if ((qtype == "tombstone" || qtype == "meta") && qidlbl != "undefined") {
                    if (qidlbl == "city") {
                        qidlbl = "location";
                    }
                    if (qidlbl == "useragent" || qidlbl == "entry") {
                        qtype = "pick one";
                    } else {
                        qtype = "pick one " + qidlbl;
                    }
                    stats["uid"] = `${_E.feature.qparam.settings.sur}_q_${qidlbl}`;
                    stats["answer"] = [(r[rk]) ? r[rk] : "Blank"];
                    stats["questionType"] = _E.core.interpreter.cortex_questiontypes[qtype].type;
                    stats["classifiedAs"] = _E.core.interpreter.cortex_questiontypes[qtype].subtype;

                    questions.push(stats);
                }
            }
        }
        //}
    }


    //console.log(questions);

    // create shells for q metrics
    for (let q = 1; q <= qcount; q++) {
        stats_metrics.push({
            "uid": `${_E.feature.qparam.settings.sur}_q_${q}`,
            "total": 0,
            "question": [],//"[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
            "stats": {},//"{\"Gwich’in\":11,\"Malecite\":7,\"Punjabi\":17}",
            "questionType": "",
            "classifiedAs": "",
            "answer": [],
            "sentimentScore": []
        });
    }

    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_language`,
        "total": 0, "question": ["Language", "Language"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });
    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_entry`,
        "total": 0, "question": ["Entry Method", "Entry Method"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });
    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_useragent`,
        "total": 0, "question": ["User Agent", "User Agent"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });

    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_location`,
        "total": 0, "question": ["Location", "Location"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });
    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_department`,
        "total": 0, "question": ["Department", "Department"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });
    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_offering`,
        "total": 0, "question": ["Offering", "Offering"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });
    stats_metrics.push({
        "uid": `${_E.feature.qparam.settings.sur}_q_classification`,
        "total": 0, "question": ["Classification", "Classification"], "stats": {},
        "questionType": "", "classifiedAs": "", "answer": [], "sentimentScore": []
    });


    //console.log(stats_metrics);
    // fill shellse
    for (let ii = 0; ii < stats_metrics.length; ii++) {
        for (let i = 0; i < questions.length; i++) {


            let q = questions[i];

            if (stats_metrics[ii].uid != q.uid) {
                continue;
            }
            //console.log(stats_metrics[ii]);

            // find arr index of target q
            stats_metrics[ii].total += 1;
            //console.log(stats_metrics[ii].question);
            stats_metrics[ii].question = stats_metrics[ii].question.concat(q.question).slice(0, 2);

            if (q.questionType == "MULTI_CHOICE") {
                //console.log("Type: " + JSON.stringify(q.answer));
                stats_metrics[ii].answer = stats_metrics[ii].answer.concat(typeof q.answer === "undefined" ? "Blank" : q.answer);
            } else {
                stats_metrics[ii].answer = stats_metrics[ii].answer.concat(q.answer);
            }
            stats_metrics[ii].sentimentScore = stats_metrics[ii].sentimentScore.concat(q.sentimentScore);
            //stats_metrics[qmetrics].stats = "";
            stats_metrics[ii].questionType = q.questionType;
            stats_metrics[ii].classifiedAs = q.classifiedAs;
        }
    }
    // build stats
    for (let ii = 0; ii < stats_metrics.length; ii++) {
        stats_metrics[ii].question = JSON.stringify(stats_metrics[ii].question);
        //stats_metrics[ii].stats["avgSentimentScore"] = 0;
        //console.log("### " + JSON.stringify(stats_metrics[ii].answer));
        for (let j = 0; j < stats_metrics[ii].answer.length; j++) {
            let answer = stats_metrics[ii].answer[j] ? stats_metrics[ii].answer[j] : "Blank";
            //let answer = stats_metrics[ii].answer[j] ? stats_metrics[ii].answer[j] ? "Blank";
            //console.log("### >> " + JSON.stringify(answer));
            if (typeof stats_metrics[ii].stats[answer] !== "undefined") {
                stats_metrics[ii].stats[answer] += 1;
            } else {
                stats_metrics[ii].stats[answer] = 1;
            }
        }
        stats_metrics[ii].stats = JSON.stringify(stats_metrics[ii].stats);
    }
    // build sentiment avg
    for (let ii = 0; ii < stats_metrics.length; ii++) {

        if (stats_metrics[ii].questionType == "FREE_TEXT") {
            stats_metrics[ii]["avgSentimentScore"] = 0;

            for (let iii = 0; iii < stats_metrics[ii].sentimentScore.length; iii++) {
                stats_metrics[ii]["avgSentimentScore"] += stats_metrics[ii].sentimentScore[iii];
            }
            stats_metrics[ii]["avgSentimentScore"] = stats_metrics[ii]["avgSentimentScore"] / stats_metrics[ii].sentimentScore.length;
        }
    }
    // TOOD
    converted_aesir_format.payload.data = stats_metrics;
    formatted_json = converted_aesir_format;

    //console.log(JSON.stringify(formatted_json));

    return formatted_json;
};

_E.feature.cortex.messages.get_stat_nodes = function () {

    let stat_node_responses = [];
    let stat_node_response_start = { "payload": { "uid": "c3c9d02d910c020b7d08519aecb21cc4", "survey_uid": "test_sur", "data": [{ "uid": "test_sur_q_1", "total": 10, "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]", "stats": "{\"Albanian\":1,\"Akan (Twi)\":1,\"Latvian\":1,\"Urdu\":1,\"English (Anglais)\":1,\"Inuvialuktun\":1,\"Dutch\":2,\"South Slavey\":1,\"Tamil\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Language" }, { "uid": "test_sur_q_2", "total": 10, "question": "[\"Which department do you currently work for?\",\"Pour quel ministère travaillez-vous actuellement?\"]", "stats": "{\"Administration du pipe-line du Nord Canada\":1,\"Conseil de recherches en sciences et en génie Canada\":1,\"Agence de la santé publique du Canada\":1,\"Conseil de recherches en sciences humaines du Canada\":1,\"Administration de pilotage des Grands Lacs Canada\":1,\"Service canadien du renseignement de sécurité\":1,\"Banque du Canada\":1,\"Radio Canada\":1,\"Monnaie royale canadienne\":1,\"Canadian Human Rights Commission\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Org" }, { "uid": "test_sur_q_3", "total": 10, "question": "[\"What is your classification (group and level)?\",\"Quelle est votre classification (groupe et niveau)?\"]", "stats": "{\"CR-06\":1,\"SR-SPS-05\":1,\"LI-03\":1,\"FS-04\":1,\"EN-ENG-04\":1,\"BI-05\":1,\"AI-06\":1,\"IS-01\":1,\"AC-01\":2}", "questionType": "CLASSIFIED", "classifiedAs": "GC_ClsLvl" }, { "uid": "test_sur_q_4", "total": 10, "question": "[\"What is the highest degree or level of school you have completed?\",\"Quel est le degré ou le niveau d'études le plus élevé que vous avez complété?\"]", "stats": "{\"Apprenticeship or trades certificate or diploma\":3,\"No certificate, diploma or degree\":4,\"Secondary (high) school diploma or equivalency certificate\":2,\"University certificate, diploma or degree at bachelor level or above\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_5", "total": 10, "question": "[\"During which month of the year are you most likely to participate in work learning activities?\",\"Au cours de quel mois de l'année êtes-vous le plus susceptible de participer à des activités d'apprentissage professionnel?\"]", "stats": "{\"March\":2,\"July\":1,\"January\":1,\"February\":1,\"None\":2,\"November\":3}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_6", "total": 10, "question": "[\"What is your preferred method of learning?\",\"Quelle est votre méthode d'apprentissage préférée?\"]", "stats": "{\"Virtual classroom\":2,\"Web conference\":1,\"In-class\":1,\"Documentation\":2,\"Webcast\":2,\"Online\":2}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_7", "total": 10, "question": "[\"What are your overall impressions about Evalhalla?\",\"Quelles sont vos impressions générales sur Evalhalla?\"]", "stats": "{\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":2,\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":5}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_8", "total": 10, "question": "[\"In your opinion, what are the most useful features of Evalhalla?\",\"A votre avis, quelles sont les fonctionnalités les plus utiles d'Evalhalla?\"]", "stats": "{\"Survey preview, while designing the survey\":2,\"Survey designer tool\":2,\"Overall user experience\":1,\"Overall look and feel\":1,\"None\":4}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_9", "total": 10, "question": "[\"What would you like to see changed or improved in Evalhalla?\",\"Qu'aimeriez-vous voir changé ou amélioré dans Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":3,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":2,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":4}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_10", "total": 10, "question": "[\"Based on the demo you saw today, does it look easy to create surveys using Evalhalla?\",\"D'après la demo que vous avez vue aujourd'hui, semble-t-il facile de créer des sondage à l'aide d'Evalhalla?\"]", "stats": "{\"No\":2,\"Yes\":5,\"Unsure\":3}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_11", "total": 10, "question": "[\"Overall, Evalhalla meets my expectations and needs for a course and event evaluation tool.\",\"Dans l'ensemble, Evalhalla répond à mes attentes et à mes besoins en matière d'outil d'évaluation de cours et d'événement.\"]", "stats": "{\"Neither agree nor disagree\":2,\"Strongly agree\":6,\"Agree\":2}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_12", "total": 10, "question": "[\"On a scale from 1 (not at all likely) to 10 (extremely likely), how likely would you recommend Evalhalla to others?\",\"Sur une échelle de 1 (pas du tout probable) à 10 (extrêmement probable), dans quelle mesure recommanderiez-vous Evalhalla à d'autres?\"]", "stats": "{\"1\":6,\"2\":1,\"7\":1,\"9\":1,\"10\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "SCALE_1_TO_10" }, { "uid": "test_sur_q_13", "total": 10, "question": "[\"Overall, how satisfied are you with the presentation?\",\"Globalement, dans quelle mesure êtes-vous satisfait de la présentation?\"]", "stats": "{\"Very satisfied\":4,\"Satisfied\":4,\"Very dissatisfied\":1,\"Neither satisfied nor dissatisfied\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_14", "total": 10, "question": "[\"How satisfied are you with the presentation and demo delivery method?\",\"Dans quelle mesure êtes-vous satisfait de la méthode de présentation et de démo?\"]", "stats": "{\"Somewhat dissatisfied\":1,\"Very satisfied\":4,\"Satisfied\":2,\"Very dissatisfied\":3}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_15", "total": 10, "question": "[\"Is there anything else you would like to share about the presentation, demo or Evalhalla?\",\"Y a-t-il autre chose que vous voudriez partager au sujet de la présentation, de la démo ou d'Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":4,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":4}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }] } };
    let stat_node_response_1 = { "payload": { "uid": "eab34ff3777200e542bccf327559c253", "survey_uid": "test_sur", "data": [{ "uid": "test_sur_q_1", "total": 11, "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]", "stats": "{\"Albanian\":1,\"Akan (Twi)\":1,\"Latvian\":1,\"Urdu\":1,\"English (Anglais)\":1,\"Inuvialuktun\":1,\"Bulgarian\":1,\"Dutch\":2,\"South Slavey\":1,\"Tamil\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Language" }, { "uid": "test_sur_q_2", "total": 11, "question": "[\"Which department do you currently work for?\",\"Pour quel ministère travaillez-vous actuellement?\"]", "stats": "{\"Administration du pipe-line du Nord Canada\":1,\"Conseil de recherches en sciences et en génie Canada\":1,\"Agence de la santé publique du Canada\":1,\"Conseil de recherches en sciences humaines du Canada\":1,\"Administration de pilotage des Grands Lacs Canada\":2,\"Service canadien du renseignement de sécurité\":1,\"Banque du Canada\":1,\"Radio Canada\":1,\"Monnaie royale canadienne\":1,\"Canadian Human Rights Commission\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Org" }, { "uid": "test_sur_q_3", "total": 11, "question": "[\"What is your classification (group and level)?\",\"Quelle est votre classification (groupe et niveau)?\"]", "stats": "{\"CR-06\":1,\"SR-SPS-05\":1,\"GL-EIM-05\":1,\"LI-03\":1,\"FS-04\":1,\"EN-ENG-04\":1,\"BI-05\":1,\"AI-06\":1,\"IS-01\":1,\"AC-01\":2}", "questionType": "CLASSIFIED", "classifiedAs": "GC_ClsLvl" }, { "uid": "test_sur_q_4", "total": 11, "question": "[\"What is the highest degree or level of school you have completed?\",\"Quel est le degré ou le niveau d'études le plus élevé que vous avez complété?\"]", "stats": "{\"Apprenticeship or trades certificate or diploma\":3,\"No certificate, diploma or degree\":4,\"Secondary (high) school diploma or equivalency certificate\":3,\"University certificate, diploma or degree at bachelor level or above\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_5", "total": 11, "question": "[\"During which month of the year are you most likely to participate in work learning activities?\",\"Au cours de quel mois de l'année êtes-vous le plus susceptible de participer à des activités d'apprentissage professionnel?\"]", "stats": "{\"March\":2,\"July\":1,\"January\":2,\"February\":1,\"None\":2,\"November\":3}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_6", "total": 11, "question": "[\"What is your preferred method of learning?\",\"Quelle est votre méthode d'apprentissage préférée?\"]", "stats": "{\"Virtual classroom\":2,\"Web conference\":1,\"In-class\":1,\"Learning events\":1,\"Documentation\":2,\"Webcast\":2,\"Online\":2}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_7", "total": 11, "question": "[\"What are your overall impressions about Evalhalla?\",\"Quelles sont vos impressions générales sur Evalhalla?\"]", "stats": "{\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":2,\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":6}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_8", "total": 11, "question": "[\"In your opinion, what are the most useful features of Evalhalla?\",\"A votre avis, quelles sont les fonctionnalités les plus utiles d'Evalhalla?\"]", "stats": "{\"Survey preview, while designing the survey\":2,\"Survey designer tool\":3,\"Overall user experience\":1,\"Overall look and feel\":1,\"None\":4}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_9", "total": 11, "question": "[\"What would you like to see changed or improved in Evalhalla?\",\"Qu'aimeriez-vous voir changé ou amélioré dans Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":3,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":2,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":5}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_10", "total": 11, "question": "[\"Based on the demo you saw today, does it look easy to create surveys using Evalhalla?\",\"D'après la demo que vous avez vue aujourd'hui, semble-t-il facile de créer des sondage à l'aide d'Evalhalla?\"]", "stats": "{\"No\":2,\"Yes\":6,\"Unsure\":3}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_11", "total": 11, "question": "[\"Overall, Evalhalla meets my expectations and needs for a course and event evaluation tool.\",\"Dans l'ensemble, Evalhalla répond à mes attentes et à mes besoins en matière d'outil d'évaluation de cours et d'événement.\"]", "stats": "{\"Neither agree nor disagree\":2,\"Strongly agree\":7,\"Agree\":2}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_12", "total": 11, "question": "[\"On a scale from 1 (not at all likely) to 10 (extremely likely), how likely would you recommend Evalhalla to others?\",\"Sur une échelle de 1 (pas du tout probable) à 10 (extrêmement probable), dans quelle mesure recommanderiez-vous Evalhalla à d'autres?\"]", "stats": "{\"1\":7,\"2\":1,\"7\":1,\"9\":1,\"10\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "SCALE_1_TO_10" }, { "uid": "test_sur_q_13", "total": 11, "question": "[\"Overall, how satisfied are you with the presentation?\",\"Globalement, dans quelle mesure êtes-vous satisfait de la présentation?\"]", "stats": "{\"Very satisfied\":4,\"Satisfied\":5,\"Very dissatisfied\":1,\"Neither satisfied nor dissatisfied\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_14", "total": 11, "question": "[\"How satisfied are you with the presentation and demo delivery method?\",\"Dans quelle mesure êtes-vous satisfait de la méthode de présentation et de démo?\"]", "stats": "{\"Somewhat dissatisfied\":1,\"Very satisfied\":5,\"Satisfied\":2,\"Very dissatisfied\":3}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_15", "total": 11, "question": "[\"Is there anything else you would like to share about the presentation, demo or Evalhalla?\",\"Y a-t-il autre chose que vous voudriez partager au sujet de la présentation, de la démo ou d'Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":1,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":4,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":4}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }] } };
    let stat_node_response_2 = { "payload": { "uid": "c8b358670adb4ed1b485acebca8112e6", "survey_uid": "test_sur", "data": [{ "uid": "test_sur_q_1", "total": 14, "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]", "stats": "{\"Albanian\":1,\"Gujarati\":1,\"Akan (Twi)\":1,\"Latvian\":1,\"Urdu\":1,\"English (Anglais)\":2,\"Inuvialuktun\":1,\"Hindustani\":1,\"Bulgarian\":1,\"Dutch\":2,\"South Slavey\":1,\"Tamil\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Language" }, { "uid": "test_sur_q_2", "total": 15, "question": "[\"Which department do you currently work for?\",\"Pour quel ministère travaillez-vous actuellement?\"]", "stats": "{\"Administration du pipe-line du Nord Canada\":1,\"Administration de pilotage du Pacifique Canada\":1,\"Conseil de recherches en sciences et en génie Canada\":1,\"Conseil de recherches en sciences humaines du Canada\":1,\"Service canadien du renseignement de sécurité\":1,\"Banque du Canada\":1,\"Radio Canada\":1,\"Canada Revenue Agency\":1,\"Agence de la santé publique du Canada\":1,\"Administration de pilotage des Grands Lacs Canada\":2,\"Monnaie royale canadienne\":1,\"Tribunal de la concurrence\":1,\"Canadian Human Rights Commission\":1}", "questionType": "CLASSIFIED", "classifiedAs": "GC_Org" }, { "uid": "test_sur_q_3", "total": 14, "question": "[\"What is your classification (group and level)?\",\"Quelle est votre classification (groupe et niveau)?\"]", "stats": "{\"GL-COI-05\":1,\"GL-EIM-05\":1,\"LI-03\":1,\"FS-04\":1,\"EN-ENG-04\":1,\"BI-05\":1,\"EN-ENG-05\":1,\"EX-03\":1,\"IS-01\":1,\"CR-06\":1,\"SR-SPS-05\":1,\"AI-06\":1,\"AC-01\":2}", "questionType": "CLASSIFIED", "classifiedAs": "GC_ClsLvl" }, { "uid": "test_sur_q_4", "total": 14, "question": "[\"What is the highest degree or level of school you have completed?\",\"Quel est le degré ou le niveau d'études le plus élevé que vous avez complété?\"]", "stats": "{\"Apprenticeship or trades certificate or diploma\":4,\"No certificate, diploma or degree\":4,\"College, CEGEP or other non-university certificate or diploma\":1,\"Secondary (high) school diploma or equivalency certificate\":4,\"University certificate, diploma or degree at bachelor level or above\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_5", "total": 14, "question": "[\"During which month of the year are you most likely to participate in work learning activities?\",\"Au cours de quel mois de l'année êtes-vous le plus susceptible de participer à des activités d'apprentissage professionnel?\"]", "stats": "{\"October\":1,\"December\":1,\"March\":2,\"July\":1,\"January\":2,\"February\":1,\"None\":2,\"April\":1,\"November\":3}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_6", "total": 14, "question": "[\"What is your preferred method of learning?\",\"Quelle est votre méthode d'apprentissage préférée?\"]", "stats": "{\"Virtual classroom\":2,\"Web conference\":1,\"In-class\":1,\"Learning events\":1,\"Documentation\":3,\"Webcast\":2,\"Online\":4}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_7", "total": 14, "question": "[\"What are your overall impressions about Evalhalla?\",\"Quelles sont vos impressions générales sur Evalhalla?\"]", "stats": "{\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":3,\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":2,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":7}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_8", "total": 14, "question": "[\"In your opinion, what are the most useful features of Evalhalla?\",\"A votre avis, quelles sont les fonctionnalités les plus utiles d'Evalhalla?\"]", "stats": "{\"Survey preview, while designing the survey\":3,\"Survey designer tool\":5,\"Overall user experience\":1,\"Overall look and feel\":1,\"None\":4}", "questionType": "MULTI_CHOICE", "classifiedAs": "CGROUP" }, { "uid": "test_sur_q_9", "total": 14, "question": "[\"What would you like to see changed or improved in Evalhalla?\",\"Qu'aimeriez-vous voir changé ou amélioré dans Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":3,\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":1,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":2,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":7}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }, { "uid": "test_sur_q_10", "total": 14, "question": "[\"Based on the demo you saw today, does it look easy to create surveys using Evalhalla?\",\"D'après la demo que vous avez vue aujourd'hui, semble-t-il facile de créer des sondage à l'aide d'Evalhalla?\"]", "stats": "{\"No\":2,\"Yes\":8,\"Unsure\":4}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_11", "total": 14, "question": "[\"Overall, Evalhalla meets my expectations and needs for a course and event evaluation tool.\",\"Dans l'ensemble, Evalhalla répond à mes attentes et à mes besoins en matière d'outil d'évaluation de cours et d'événement.\"]", "stats": "{\"Neither agree nor disagree\":2,\"Strongly agree\":9,\"Agree\":3}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_12", "total": 14, "question": "[\"On a scale from 1 (not at all likely) to 10 (extremely likely), how likely would you recommend Evalhalla to others?\",\"Sur une échelle de 1 (pas du tout probable) à 10 (extrêmement probable), dans quelle mesure recommanderiez-vous Evalhalla à d'autres?\"]", "stats": "{\"1\":8,\"2\":2,\"3\":1,\"7\":1,\"9\":1,\"10\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "SCALE_1_TO_10" }, { "uid": "test_sur_q_13", "total": 14, "question": "[\"Overall, how satisfied are you with the presentation?\",\"Globalement, dans quelle mesure êtes-vous satisfait de la présentation?\"]", "stats": "{\"Very satisfied\":5,\"Satisfied\":7,\"Very dissatisfied\":1,\"Neither satisfied nor dissatisfied\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_14", "total": 14, "question": "[\"How satisfied are you with the presentation and demo delivery method?\",\"Dans quelle mesure êtes-vous satisfait de la méthode de présentation et de démo?\"]", "stats": "{\"Somewhat dissatisfied\":1,\"Very satisfied\":7,\"Satisfied\":2,\"Very dissatisfied\":3,\"Neither satisfied nor dissatisfied\":1}", "questionType": "SINGLE_CHOICE", "classifiedAs": "RGROUP" }, { "uid": "test_sur_q_15", "total": 14, "question": "[\"Is there anything else you would like to share about the presentation, demo or Evalhalla?\",\"Y a-t-il autre chose que vous voudriez partager au sujet de la présentation, de la démo ou d'Evalhalla?\"]", "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":2,\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":1,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":1,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":4,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":6}", "questionType": "FREE_TEXT", "classifiedAs": "TEXTAREA" }] } };
    let stat_node_response_end = {
        "payload": {
            "uid": "a417b5032161a1f927c58bb85d40cc1f",
            "survey_uid": "test_sur",
            "data": [{
                "uid": "test_sur_q_1",
                "total": 1000,
                "question": "[\"What is your first official language?\",\"Quelle est votre première langue officielle?\"]",
                "stats": "{\"Gwich’in\":11,\"Malecite\":7,\"Lingala\":7,\"Hebrew\":6,\"Inuvialuktun\":13,\"Dogrib (Tlicho)\":5,\"Turkish\":6,\"Swedish\":2,\"Ukrainian\":3,\"English (Anglais)\":91,\"Ilocano\":6,\"Malay\":7,\"Tigrigna\":5,\"Armenian\":3,\"Urdu\":10,\"Swahili\":6,\"Romanian\":9,\"Tlingit\":3,\"Siouan languages (Dakota/Sioux)\":4,\"Yiddish\":6,\"Macedonian\":4,\"South Slavey\":16,\"Japanese\":8,\"Blackfoot\":6,\"Estonian\":3,\"Sindhi\":3,\"Pashto\":6,\"Bengali\":6,\"Gujarati\":7,\"North Slave (Hare)\":6,\"Fukien (Fuzhou dialect)\":8,\"Dene\":8,\"Tibeto-Burman languages,\":4,\"North Slavey\":9,\"Semitic languages,\":7,\"Chipewyan\":21,\"Taiwanese\":5,\"Tibetan\":4,\"Hindustani\":14,\"Persian\":9,\"German\":8,\"Kurdish\":4,\"Bantu languages,\":5,\"Serbo-Croatian\":4,\"Cree\":21,\"Telugu\":7,\"Maltese\":1,\"Nepali\":8,\"Kutchin-Gwich’in (Loucheux)\":3,\"Malayalam\":7,\"Lithuanian\":2,\"Bisayan languages\":2,\"Latvian\":5,\"Korean\":8,\"Inuktitut\":20,\"Khmer\":8,\"Hakka\":3,\"Tamil\":9,\"Tibetan languages\":3,\"Montagnais\":8,\"Vietnamese\":7,\"Chinese\":10,\"Scottish Gaelic\":3,\"Czech\":6,\"Lao\":8,\"Somali\":6,\"Dutch\":10,\"Celtic languages,\":4,\"Chilcotin\":7,\"Inuinnaqtun (Inuvialuktun)\":3,\"Slovak\":5,\"Français (French)\":41,\"Russian\":8,\"Bosnian\":7,\"Min Nan\":4,\"Serbian\":4,\"Marathi\":3,\"Shuswap (Secwepemctsin)\":2,\"Algonquin\":8,\"Creoles\":5,\"Kinyarwanda\":6,\"Arabic\":10,\"Portuguese\":9,\"Oji-Cree\":4,\"Rundi (Kirundi)\":8,\"Spanish\":17,\"Hindi\":4,\"Thai\":8,\"Carrier\":5,\"Norwegian\":9,\"Tłįchǫ\":9,\"Cantonese\":17,\"Vlaams (Flemish)\":7,\"Dravidian languages\":6,\"Michif\":2,\"Atikamekw\":4,\"Shanghainese\":2,\"Burmese\":8,\"Sinhala (Sinhalese)\":2,\"Canadian Gaelic\":3,\"Mi'kmaq\":3,\"Nisga'a\":4,\"Italian\":18,\"Indo-Iranian languages,\":5,\"Afrikaans\":7,\"Slovenian\":4,\"Finnish\":6,\"Mandarin\":23,\"Tagalog (Filipino)\":7,\"Albanian\":7,\"Oromo\":5,\"Polish\":8,\"Bulgarian\":10,\"Welsh\":2,\"Niger–Congo languages\":6,\"Stoney\":1,\"Croatian\":2,\"Inuinnaqtun\":13,\"Akan (Twi)\":10,\"Gitxsan (Gitksan)\":3,\"Ojibway\":4,\"Danish\":3,\"Hungarian\":6,\"Frisian\":2,\"Sino-Tibetan languages,\":4,\"Amharic\":6,\"Mohawk\":6,\"Greek\":9,\"Wu\":8,\"Punjabi\":17}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "GC_Language"
            }, {
                "uid": "test_sur_q_2",
                "total": 1043,
                "question": "[\"Which department do you currently work for?\",\"Pour quel ministère travaillez-vous actuellement?\"]",
                "stats": "{\"Agence de la consommation en matière financière du Canada\":8,\"Premier ministre du Canada\":2,\"Bibliothèque et Archives Canada\":5,\"École de la fonction publique du Canada\":3,\"Office of the Commissioner of Lobbying of Canada\":3,\"Environment and Climate Change Canada\":2,\"Commission des champs de bataille nationaux\":1,\"Tribunal de la protection des fonctionnaires divulgateurs Canada\":3,\"Justice Canada, Ministère de la\":1,\"Musée canadien de l'histoire\":5,\"Tribunal des droits de la personne du Canada\":2,\"Immigration, Réfugiés et Citoyenneté Canada\":3,\"Communications Security Establishment Canada\":1,\"Chambre des communes\":4,\"Canadian Centre for Occupational Health and Safety\":4,\"Immigration and Refugee Board of Canada\":1,\"Commissariat à l'intégrité du secteur public du Canada\":2,\"Centre d'analyse des opérations et déclarations financières du Canada\":4,\"Conseil d'examen du prix des médicaments brevetés Canada\":1,\"Northern Pipeline Agency\":1,\"Gendarmerie royale du Canada\":4,\"Tribunal canadien du commerce extérieur\":2,\"Commission d'examen des plaintes concernant la police militaire du Canada\":1,\"Commission des libérations conditionnelles du Canada\":2,\"Parliament of Canada\":2,\"Bureau de la sécurité des transports du Canada\":3,\"Canada Border Services Agency\":3,\"Innovation, Sciences et Développement économique Canada\":3,\"Recherche et développement pour la Défense Canada\":1,\"Canadian Radio-television and Telecommunications Commission\":6,\"Canadian Judicial Council\":1,\"Tax Court of Canada\":2,\"Prime Minister's Office\":1,\"Western Economic Diversification Canada\":1,\"Canadian Transportation Agency\":1,\"The National Battlefields Commission\":1,\"Canadian Museum of Nature\":6,\"Commission canadienne des droits de la personne\":2,\"National Gallery of Canada\":4,\"Commissariat à la magistrature fédérale Canada\":1,\"Commission mixte internationale\":4,\"Service administratif des tribunaux judiciaires\":5,\"Transportation Appeal Tribunal of Canada\":1,\"Senate of Canada\":2,\"Employment and Social Development Canada\":2,\"Comité de surveillance des activités de renseignement de sécurité\":2,\"Bureau du conseiller sénatorial en éthique\":2,\"Library and Archives Canada\":6,\"Financial Transactions and Reports Analysis Centre of Canada\":5,\"Office of the Conflict of Interest and Ethics Commissioner\":1,\"Cour canadienne de l'impôt\":5,\"Association of Professional Executives of the Public Service of Canada\":7,\"Specific Claims Tribunal\":4,\"Office of the Communications Security Establishment Commissioner\":1,\"Administration de pilotage des Grands Lacs Canada\":19,\"Office national du film\":1,\"Tribunal de la concurrence\":2,\"Canadian Human Rights Commission\":5,\"Sénat du Canada\":5,\"Commission canadienne de sûreté nucléaire\":2,\"Treasury Board of Canada Secretariat\":3,\"Société royale du Canada, La\":2,\"Military Police Complaints Commission of Canada\":2,\"National Capital Commission\":3,\"Canada Mortgage and Housing Corporation\":4,\"Canadian Intergovernmental Conference Secretariat\":3,\"Quebec Federal Council\":3,\"Canadian Centre on Substance Abuse\":4,\"Diversification de l'économie de l'Ouest Canada\":4,\"Monnaie royale canadienne\":3,\"Service canadien d'appui aux tribunaux administratifs\":2,\"Intergovernmental and Northern Affairs and Internal Trade\":3,\"Destination Canada\":3,\"The Federal Bridge Corporation Limited\":3,\"Canada Industrial Relations Board\":3,\"Canada Economic Development for Quebec Regions\":8,\"Natural Resources Canada\":4,\"Canadian Air Transport Security Authority\":3,\"Commissariat à l'information au Canada\":4,\"Atlantic Pilotage Authority\":4,\"Military Grievances External Review Committee\":2,\"Ponts Jacques-Cartier et Champlain\":1,\"Royal Canadian Mounted Police External Review Committee\":2,\"Cour fédérale\":3,\"Commission canadienne d'examen des exportations de biens culturels\":1,\"Canadian Museum of History\":3,\"Centre canadien de lutte contre les toxicomanies\":3,\"Agence du revenu du Canada\":1,\"Agence spatiale canadienne\":3,\"Commission de la fonction publique du Canada\":3,\"Office of the Procurement Ombudsman\":1,\"Administration du pipe-line du Nord Canada\":14,\"Institutions démocratiques\":6,\"National Defence\":2,\"Canadian Security Intelligence Service\":2,\"Canadian Food Inspection Agency\":6,\"House of Commons\":1,\"Finances Canada, Ministère des\":1,\"Agriculture et Agroalimentaire Canada\":6,\"Policy Horizons Canada\":4,\"Copyright Board Canada\":3,\"Financement agricole Canada\":6,\"Développement économique Canada pour les régions du Québec\":2,\"Public Servants Disclosure Protection Tribunal Canada\":1,\"Farm Products Council of Canada\":1,\"Canadian Institutes of Health Research\":3,\"Federal Court of Appeal\":1,\"Santé Canada\":2,\"Competition Tribunal\":2,\"Canadian International Trade Tribunal\":8,\"Conseil de la radiodiffusion et des télécommunications canadiennes\":2,\"Centre canadien d'hygiène et de sécurité au travail\":2,\"Agence de la santé publique du Canada\":8,\"Administration de pilotage de l'Atlantique Canada\":26,\"Canada Council for the Arts\":5,\"International Development Research Centre\":1,\"Natural Sciences and Engineering Research Council of Canada\":2,\"Indigenous Services Canada\":2,\"Secrétariat des conférences intergouvernementales canadiennes\":1,\"Caisse d'indemnisation des dommages dus à la pollution par hydrocarbures causée par les navires\":3,\"Bureau du directeur général des élections\":4,\"Halifax Port Authority\":2,\"Banque du Canada\":5,\"Rural Economic Development\":2,\"Parole Board of Canada\":1,\"Office national de l'énergie\":1,\"Commissariat au lobbying du Canada\":3,\"Commission du droit d'auteur Canada\":5,\"Greffe du Tribunal des revendications particulières du Canada\":3,\"Commission de la capitale nationale\":5,\"Canadian Grain Commission\":1,\"Musée canadien de la nature\":1,\"Administration de pilotage du Pacifique Canada\":12,\"Canadian Environmental Assessment Agency\":5,\"Parks Canada\":2,\"Commissariat aux conflits d'intérêts et à l'éthique\":2,\"Indian Residential Schools Adjudication Secretariat\":3,\"Correctional Service Canada\":1,\"Conseil des arts du Canada\":6,\"Conseil des produits agricoles du Canada\":3,\"Canadian Nuclear Safety Commission\":4,\"National Energy Board\":3,\"Centre de la sécurité des télécommunications Canada\":4,\"Canadian Museum of Immigration at Pier 21\":3,\"Commission canadienne des grains\":1,\"Gouverneur général du Canada\":1,\"Atlantic Canada Opportunities Agency\":6,\"Administration canadienne de la sûreté du transport aérien\":53,\"Canadian Commercial Corporation\":9,\"Veterans Affairs Canada\":2,\"Parcs Canada\":4,\"Office of the Commissioner for Federal Judicial Affairs Canada\":2,\"Musée canadien de l'immigration du Quai 21\":2,\"Administration de pilotage des Laurentides Canada\":16,\"Innovation, Science and Economic Development Canada\":1,\"Bureau du surintendant des institutions financières Canada\":2,\"Office of the Leader of the Government in the House of Commons\":2,\"Service des poursuites pénales du Canada\":3,\"Canadian Northern Economic Development Agency\":6,\"Cour suprême du Canada\":4,\"Transport Canada\":1,\"Transports Canada\":1,\"Agence canadienne d'évaluation environnementale\":9,\"Directeur parlementaire du budget\":2,\"National Film Board of Canada\":2,\"Office of the Privacy Commissioner of Canada\":3,\"The Jacques Cartier and Champlain Bridges Incorporated\":2,\"Commissariat à la protection de la vie privée du Canada\":1,\"Statistics Canada\":1,\"Commission de l'immigration et du statut de réfugié du Canada\":3,\"Défense nationale\":4,\"Royal Canadian Mint\":1,\"Conseil fédéral du Québec\":1,\"Infrastructure Canada\":6,\"Secrétariat du Conseil du Trésor du Canada\":1,\"Royal Canadian Mounted Police\":2,\"Commission des relations de travail et de l'emploi dans la fonction publique\":1,\"Atomic Energy of Canada Limited\":7,\"Musée des beaux-arts du Canada\":3,\"Radio Canada\":2,\"Public Prosecution Service of Canada\":3,\"Great Lakes Pilotage Authority Canada\":2,\"Agence des services frontaliers du Canada\":6,\"Tribunal de la sécurité sociale du Canada\":1,\"Anciens Combattants Canada\":3,\"Instituts de recherche en santé du Canada\":1,\"Affaires autochtones et du Nord Canada\":7,\"Public Services and Procurement Canada\":2,\"Agence canadienne de développement économique du Nord\":6,\"Administration portuaire de Halifax\":16,\"Commissariat aux langues officielles\":1,\"Association professionnelle des cadres supérieurs de la Fonction publique du Canada\":7,\"Ingenium\":4,\"Agence canadienne d'inspection des aliments\":5,\"Canadian Dairy Commission\":4,\"Parliamentary Budget Officer\":3,\"Conseil canadien des relations industrielles\":4,\"Bank of Canada\":6,\"Cour d'appel de la cour martiale du Canada\":1,\"Développement économique rural\":1,\"Agence fédérale de développement économique pour le Sud de l'Ontario\":3,\"Standards Council of Canada\":3,\"Société des ponts fédéraux\":3,\"Immigration, Refugees and Citizenship Canada\":4,\"Canada School of Public Service\":4,\"Office of the Public Sector Integrity Commissioner of Canada\":2,\"Enquêteur correctionnel Canada\":3,\"Court Martial Appeal Court of Canada\":1,\"Commission canadienne du lait\":2,\"Affaires mondiales Canada\":13,\"Pacific Pilotage Authority Canada\":2,\"Secrétariat d'adjudication des pensionnats indiens\":2,\"Canadian Heritage\":6,\"Centre de recherches pour le développement international\":3,\"Public Service Commission\":3,\"Commission civile d'examen et de traitement des plaintes relatives à la GRC\":2,\"Fisheries and Oceans Canada\":4,\"Women and Gender Equality Canada\":2,\"Telefilm Canada\":3,\"Parlement du Canada\":2,\"Shared Services Canada\":2,\"Conseil national de recherches Canada\":3,\"Sécurité publique Canada\":1,\"Bureau du secrétaire du gouverneur général\":7,\"Federal Public Sector Labour Relations and Employment Board\":2,\"Auditor General of Canada, Office of the\":7,\"Financial Consumer Agency of Canada\":1,\"Corporation commerciale canadienne\":4,\"Ship-source Oil Pollution Fund\":1,\"Femmes et Égalité des genres Canada\":2,\"Democratic Institutions\":2,\"Pêches et Océans Canada\":2,\"Bureau du vérificateur général du Canada\":4,\"Ressources naturelles Canada\":1,\"Health Canada\":4,\"Conseil de recherches en sciences et en génie Canada\":2,\"Bureau de l'ombudsman de l'approvisionnement\":4,\"CBC/Radio-Canada\":2,\"Canadian Human Rights Tribunal\":6,\"Construction de Défense Canada\":1,\"Federal Court\":2,\"Privy Council Office\":2,\"Justice Canada\":1,\"Polar Knowledge Canada\":1,\"Services aux Autochtones Canada\":2,\"Emploi et Développement social Canada\":3,\"Bibliothèque du Parlement\":3,\"Civilian Review and Complaints Commission for the RCMP\":5,\"Centre national des arts\":3,\"Laurentian Pilotage Authority Canada\":1,\"Agence de promotion économique du Canada atlantique\":4,\"Bureau de l'ombudsman des contribuables\":3,\"Conseil canadien des normes\":3,\"Canadian Museum for Human Rights\":4,\"Security Intelligence Review Committee\":1,\"Conseil de recherches en sciences humaines du Canada\":4,\"Horizons de politiques Canada\":1,\"Service canadien du renseignement de sécurité\":2,\"Office of the Senate Ethics Officer\":4,\"Canada Revenue Agency\":6,\"Supreme Court of Canada\":2,\"Bureau du commissaire du Centre de la sécurité des télécommunications\":4,\"Environnement et Changement climatique Canada\":5,\"Canadian Space Agency\":2,\"Indigenous and Northern Affairs Canada\":3,\"Public Safety Canada\":2,\"Service correctionnel Canada\":1,\"Public Health Agency of Canada\":2,\"Canadian Cultural Property Export Review Board\":6,\"Bureau du Conseil privé\":5,\"Société d'assurance-dépôts du Canada\":1,\"Affaires intergouvernementales du Nord et commerce intérieur\":5,\"Canada Deposit Insurance Corporation\":3,\"International Joint Commission\":1,\"Services partagés Canada\":1,\"PPP Canada\":5,\"Tribunal d'appel des transports du Canada\":3,\"Farm Credit Canada\":1,\"Office of the Taxpayers' Ombudsman\":7,\"Social Security Tribunal of Canada\":1,\"Énergie atomique du Canada, Limitée\":5,\"National Research Council Canada\":3,\"Agriculture and Agri-Food Canada\":2,\"Social Sciences and Humanities Research Council of Canada\":1,\"Finance Canada\":2,\"Office of the Commissioner of Official Languages\":2,\"Office of the Chief Electoral Officer\":2,\"Administrative Tribunals Support Service of Canada\":13,\"Transportation Safety Board of Canada\":1}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "GC_Org"
            }, {
                "uid": "test_sur_q_3",
                "total": 1000,
                "question": "[\"What is your classification (group and level)?\",\"Quelle est votre classification (groupe et niveau)?\"]",
                "stats": "{\"LI-03\":1,\"VM-05\":3,\"LI-04\":3,\"DA-CON-06\":2,\"DA-CON-07\":4,\"DA-CON-08\":2,\"GL-MAN-06\":2,\"GL-MAN-08\":1,\"GL-MAN-07\":2,\"GL-MAN-09\":1,\"GL-MAN-10\":1,\"GL-MAN-12\":1,\"GL-MAN-14\":2,\"EU-PEI-01\":1,\"GL-EIM-10\":3,\"EU-PEI-02\":2,\"DS-01\":2,\"GL-EIM-14\":3,\"GL-EIM-11\":4,\"GL-EIM-07\":2,\"GL-EIM-05\":2,\"GL-EIM-04\":1,\"SO-MAO-03\":2,\"SO-MAO-04\":1,\"GL-EIM-09\":1,\"SO-MAO-08\":2,\"SO-MAO-06\":1,\"OM-01\":2,\"OM-02\":1,\"SO-MAO-09\":1,\"OM-03\":1,\"SR-PIP-02\":1,\"SR-PIP-03\":1,\"GL-MAN-00\":1,\"GL-MAN-01\":1,\"GL-MAN-03\":1,\"DA-CON-01\":2,\"SR-PIP-08\":2,\"DA-CON-03\":1,\"AC-03\":13,\"SR-PIP-07\":1,\"AC-02\":8,\"AC-01\":21,\"GL-EIM-00\":3,\"SR-PIP-05\":2,\"GS-STS-01\":1,\"GS-STS-03\":1,\"AS-DEV\":2,\"LS-01\":2,\"PE-06\":1,\"GL-MOC-10\":1,\"PE-05\":2,\"LS-03\":1,\"GL-MOC-13\":1,\"GL-MOC-14\":1,\"LS-02\":1,\"FI-DEV\":1,\"GL-MAM-04\":1,\"GL-MAM-09\":1,\"GL-MOC-06\":1,\"SE-RES-01\":1,\"GL-MAM-10\":1,\"SE-RES-02\":2,\"GL-MOC-05\":1,\"SE-RES-05\":1,\"GL-MAM-11\":3,\"GL-MAM-14\":1,\"GL-MAM-13\":1,\"NU-HOS-03\":2,\"PE-DEV\":1,\"PI-1-CGC\":1,\"NU-HOS-04\":1,\"GS-STS-08\":1,\"GL-MOC-03\":1,\"GL-MOC-00\":1,\"GS-STS-06\":1,\"GL-MOC-01\":1,\"SC-ERD-05\":1,\"SC-ERD-06\":2,\"GS-MPS-08\":1,\"SR-WOW-02\":1,\"GS-MPS-06\":1,\"PO-IMA-03\":1,\"GS-MPS-05\":1,\"PO-IMA-02\":1,\"GS-MPS-04\":1,\"MA-04\":1,\"GS-MPS-03\":2,\"MA-03\":3,\"SC-ERD-01\":1,\"SC-ERD-02\":1,\"SR-INM-05\":1,\"SR-INM-09\":1,\"PC-04\":1,\"TI-01\":1,\"TI-02\":1,\"SO-MAO-TO\":2,\"GL-MST-14\":1,\"TI-08\":1,\"GL-MST-12\":1,\"GL-MST-13\":1,\"EN-ENG-02\":3,\"EN-ENG-03\":1,\"PG-PER\":1,\"EN-ENG-04\":1,\"EN-ENG-05\":6,\"EN-ENG-06\":1,\"GL-MST-10\":2,\"FI-03\":1,\"FI-04\":1,\"GL-WOW-01\":1,\"FI-01\":1,\"GS-MPS-01\":2,\"SW-SCW-02\":1,\"GL-WOW-05\":1,\"GS-MPS-00\":1,\"SR-INM-11\":1,\"GL-WOW-08\":1,\"GL-WOW-07\":2,\"GL-MST-04\":1,\"GL-MST-01\":1,\"GL-MST-02\":2,\"GL-MST-07\":4,\"GL-MST-08\":1,\"GL-AIM-09\":2,\"GL-MST-05\":2,\"GL-MST-06\":1,\"GL-AIM-08\":3,\"GL-AIM-07\":2,\"GL-AIM-06\":3,\"GL-AIM-05\":1,\"GL-AIM-04\":2,\"GL-AIM-03\":2,\"GL-AIM-02\":2,\"GL-MST-00\":1,\"GL-AIM-00\":1,\"SC-SPT-04\":1,\"CO-03\":4,\"CO-04\":1,\"SC-STD-03\":1,\"PR-MAI-01\":1,\"SC-STD-04\":1,\"SC-SPT-01\":1,\"SC-STD-05\":1,\"CO-01\":3,\"PY-02\":1,\"PY-03\":1,\"PY-04\":2,\"PY-05\":1,\"GL-MST-09\":2,\"SC-SPT-07\":1,\"EG-02\":1,\"EG-01\":1,\"EG-03\":1,\"GL-AIM-14\":3,\"GL-AIM-13\":3,\"GL-AIM-11\":3,\"GL-AIM-10\":1,\"HP-04\":1,\"HP-03\":1,\"OE-CEO-02\":2,\"HP-08\":1,\"HP-07\":1,\"OE-CEO-03\":1,\"PO-IMA-01\":1,\"SR-WOW-08\":1,\"EG-06\":2,\"HP-02\":1,\"HP-01\":1,\"EG-08\":5,\"EG-07\":3,\"GL-VHE-01\":1,\"ST-COR-A\":1,\"ST-COR-B\":1,\"GL-VHE-05\":3,\"GL-VHE-04\":2,\"GL-VHE-03\":1,\"GL-VHE-02\":1,\"GL-VHE-09\":1,\"NU-CHN-05\":2,\"GL-VHE-07\":2,\"GL-VHE-06\":2,\"NU-CHN-04\":1,\"NU-CHN-01\":1,\"PG-02\":2,\"OP-02\":1,\"DE-02\":1,\"PG-03\":1,\"DE-03\":1,\"OP-03\":1,\"OP-01\":1,\"DE-01\":2,\"PG-05\":1,\"PG-01\":1,\"OE-MEO-04\":1,\"OE-MEO-03\":1,\"OE-MEO-05\":2,\"ST-SCY-01\":1,\"PO-TCO-01\":1,\"ND-DIT-02\":2,\"GL-PRW-10\":1,\"SR-MAN-08\":1,\"GL-PRW-08\":2,\"GL-PRW-03\":1,\"GL-PRW-02\":1,\"OE-DEO-02\":1,\"OE-DEO-03\":1,\"GL-PRW-06\":1,\"GL-PRW-04\":1,\"SR-EEW-11\":1,\"GL-VHE-12\":1,\"SG-SRE-01\":1,\"GL-VHE-11\":1,\"SG-SRE-04\":2,\"GL-VHE-14\":1,\"SG-SRE-07\":1,\"SR-MAC-02\":1,\"SR-MAC-05\":1,\"SR-EEW-06\":2,\"SR-MAC-04\":1,\"SR-MAC-09\":1,\"SR-EEW-09\":2,\"SR-EEW-02\":1,\"PH-01\":1,\"PH-02\":1,\"AU-02\":1,\"AU-01\":3,\"CX-02\":4,\"SR-MAM-10\":1,\"AU-05\":1,\"AU-04\":3,\"SR-BOB-03\":1,\"SR-BOB-06\":2,\"CM-04\":2,\"SR-MDO-01\":2,\"CM-03\":2,\"GL-MAM-00\":1,\"CM-02\":3,\"GL-MAM-02\":1,\"WP-04\":1,\"CM-01\":1,\"CM-06\":2,\"WP-01\":1,\"SR-MAM-04\":2,\"SR-MAM-01\":2,\"DD-08\":1,\"GL-MDO-00\":2,\"DD-07\":2,\"GL-MDO-01\":2,\"DD-09\":4,\"GL-MDO-02\":2,\"DD-04\":2,\"IS-04\":1,\"SR-MAM-06\":2,\"DD-03\":2,\"IS-03\":1,\"SR-MAM-09\":3,\"IS-02\":1,\"DD-06\":1,\"IS-01\":1,\"DD-05\":1,\"DD-02\":2,\"DD-01\":1,\"PI-4-CGC\":1,\"HR-05\":1,\"HR-01\":1,\"HR-03\":1,\"HR-04\":2,\"GL-PCF-10\":1,\"GL-PCF-11\":3,\"GL-PCF-13\":2,\"GL-MDO-10\":3,\"GL-MDO-11\":2,\"GL-MDO-12\":1,\"GL-MDO-09\":2,\"CO-DEV\":1,\"ED-LAT-01\":3,\"ED-LAT-02\":4,\"SC-EQO-07\":2,\"SC-EQO-06\":1,\"GL-PCF-00\":1,\"GL-PCF-01\":1,\"SC-EQO-05\":1,\"GL-PCF-02\":1,\"SC-EQO-04\":1,\"SC-EQO-03\":1,\"GL-PCF-03\":1,\"GL-PCF-05\":1,\"GL-PCF-06\":2,\"GL-PCF-07\":1,\"GL-PCF-08\":3,\"GL-MDO-14\":2,\"PM-PER\":1,\"PR-OFO-09\":1,\"PR-OFO-08\":2,\"PR-OFO-03\":1,\"PR-OFO-07\":1,\"GL-GHW-04\":2,\"PR-BIN-03\":1,\"PR-BIN-04\":1,\"GL-GHW-01\":3,\"SO-FLP-04\":1,\"GL-GHW-08\":1,\"GL-GHW-07\":2,\"SO-FLP-05\":1,\"GL-GHW-06\":1,\"PR-OFO-10\":1,\"GL-GHW-05\":1,\"SO-FLP-07\":2,\"SO-FLP-01\":1,\"HS-02\":1,\"HS-04\":1,\"GL-GHW-09\":1,\"SO-FLP-03\":1,\"SR-PLE-09\":2,\"SR-PLE-07\":1,\"SR-PLE-01\":1,\"PR-OFO-11\":1,\"GL-SMW-07\":1,\"GL-SMW-00\":2,\"PR-OFO-16\":1,\"GL-SMW-01\":2,\"GL-SMW-02\":4,\"SC-01\":1,\"SC-02\":1,\"GL-SMW-03\":1,\"GL-GHW-14\":2,\"SR-SPS-05\":1,\"SR-SPS-07\":1,\"AS-07\":2,\"AS-08\":1,\"AS-05\":2,\"AS-06\":1,\"PI-5-CGC\":1,\"MD-MOF-02\":1,\"MD-MOF-03\":2,\"GS-PRC-06\":1,\"GS-PRC-04\":2,\"SR-PLE-10\":1,\"GS-PRC-08\":1,\"GS-PRC-02\":1,\"LC-03\":1,\"PG-GIT\":1,\"ST-OCE-02\":1,\"ST-OCE-03\":1,\"ST-OCE-01\":1,\"GS-BUS-00\":1,\"GS-LAS-09\":1,\"GS-LAS-07\":1,\"GS-LAS-06\":1,\"GS-LAS-04\":1,\"GS-LAS-00\":2,\"AI-02\":12,\"AI-01\":4,\"GS-PRC-10\":2,\"FO-03\":2,\"EC-04\":1,\"AI-07\":7,\"GS-BUS-03\":1,\"EC-03\":1,\"GS-BUS-04\":1,\"EC-01\":2,\"AI-04\":3,\"EC-08\":1,\"AI-03\":2,\"GS-BUS-07\":1,\"EC-07\":1,\"AI-06\":6,\"EC-06\":2,\"AI-05\":3,\"GS-BUS-09\":2,\"EC-05\":1,\"SR-EME-06\":1,\"ND-ADV-02\":1,\"ND-ADV-01\":2,\"AO-HPS-01\":5,\"PS-04\":2,\"AO-HPS-02\":4,\"BI-01\":2,\"SR-EME-03\":2,\"PS-01\":1,\"SR-EME-05\":1,\"BI-05\":3,\"BI-04\":2,\"BI-03\":1,\"BI-02\":1,\"SR-PRW-02\":1,\"AO-ETP-01\":3,\"SR-PRW-06\":1,\"SR-PRW-08\":1,\"AR-05\":2,\"AR-04\":3,\"AR-06\":3,\"SR-PRW-01\":1,\"FR-01\":1,\"EU-LAI-01\":3,\"AR-01\":4,\"AR-03\":3,\"AR-02\":3,\"FR-06\":1,\"EX-03\":3,\"EX-02\":1,\"EX-01\":1,\"AG-05\":6,\"LP-03\":1,\"SR-EME-01\":1,\"AG-01\":9,\"AG-02\":8,\"LP-00\":2,\"AG-03\":10,\"LP-01\":2,\"AG-04\":4,\"LP-02\":1,\"GL-SMW-10\":1,\"AS-03\":3,\"AS-04\":5,\"AS-01\":3,\"AS-02\":5,\"GL-AMW-06\":1,\"GL-AMW-07\":2,\"GL-SMW-13\":1,\"GL-AMW-09\":1,\"GL-AMW-03\":3,\"GL-SMW-08\":1,\"GL-SMW-09\":1,\"GL-AMW-01\":2,\"GL-PIP-14\":1,\"GL-PIP-13\":2,\"SO-INS-01\":1,\"CO-PER\":2,\"GL-PIP-10\":3,\"GL-PIP-12\":1,\"GL-PIP-11\":2,\"GT-08\":1,\"GT-07\":2,\"GL-AMW-13\":1,\"GL-AMW-14\":1,\"GL-AMW-10\":1,\"GL-AMW-11\":1,\"GL-AMW-12\":2,\"GL-PIP-04\":1,\"GL-PIP-07\":2,\"GL-PIP-06\":1,\"GL-PIP-09\":1,\"GL-PIP-08\":2,\"OE-BEO-01\":1,\"FS-01\":1,\"EL-07\":3,\"FS-04\":5,\"EL-05\":2,\"EL-04\":2,\"EL-03\":1,\"EL-02\":1,\"EL-01\":1,\"UT-04\":1,\"RO-00\":1,\"RO-01\":1,\"RO-05\":1,\"RO-06\":1,\"GL-COI-04\":1,\"GL-COI-05\":1,\"GS-FOS-12\":1,\"GL-COI-06\":1,\"GL-INM-02\":1,\"GS-FOS-11\":3,\"GL-INM-01\":1,\"GS-FOS-10\":1,\"GL-COI-00\":1,\"GL-COI-01\":1,\"GL-COI-02\":1,\"FB-02\":1,\"FB-01\":1,\"FB-04\":1,\"FB-03\":1,\"FB-06\":2,\"PR(S)-02\":1,\"CS-05\":2,\"NU-EMA-01\":1,\"CS-03\":1,\"CS-04\":2,\"PR(S)-03\":1,\"ND-HME-01\":1,\"PM-02\":1,\"GL-INM-07\":1,\"ND-HME-03\":1,\"GL-WOW-13\":1,\"PM-06\":1,\"GL-INM-06\":1,\"PM-04\":2,\"GL-INM-05\":1,\"GS-FOS-01\":1,\"GL-INM-12\":1,\"GL-COI-12\":1,\"GL-COI-13\":1,\"GS-MPS-13\":1,\"GL-COI-14\":1,\"DA-PRO-06\":4,\"DA-PRO-04\":4,\"GS-FOS-09\":2,\"GL-COI-10\":2,\"DA-PRO-05\":3,\"GS-FOS-08\":2,\"GS-FOS-07\":1,\"DA-PRO-02\":1,\"DA-PRO-03\":4,\"GS-FOS-06\":1,\"GS-FOS-05\":1,\"DA-PRO-01\":1,\"AS-PER\":4,\"SG-PAT-07\":1,\"SG-PAT-06\":1,\"TR-04\":1,\"TR-03\":1,\"GL-COI-08\":2,\"FI-PER\":3,\"SG-PAT-01\":1,\"SG-PAT-02\":2,\"MT-01\":1,\"MT-05\":3,\"MT-04\":1,\"MT-03\":1,\"GS-MES-09\":2,\"ED-EDS-05\":2,\"ED-EDS-02\":1,\"ED-EDS-01\":2,\"GS-MES-07\":1,\"ED-EDS-03\":2,\"GS-MES-08\":1,\"GS-MES-01\":3,\"EN-SUR-04\":1,\"GS-MES-02\":1,\"GS-MES-03\":2,\"EN-SUR-05\":2,\"GS-MES-04\":1,\"EN-SUR-01\":1,\"PG-DEV\":2,\"GS-MES-00\":3,\"EN-SUR-02\":1,\"CS-01\":1,\"CS-02\":2,\"SO-RAD-03\":2,\"DA-CON-C\":1,\"OM-PER\":1,\"CH-01\":6,\"AO-CAI-04\":1,\"CH-03\":3,\"CH-02\":3,\"AO-CAI-03\":4,\"AO-CAI-02\":3,\"CH-05\":2,\"AO-CAI-01\":5,\"CH-04\":2,\"GS-MES-10\":2,\"GS-MES-11\":1,\"GL-ELE-01\":1,\"GL-ELE-04\":2,\"GL-ELE-03\":1,\"GL-ELE-05\":2,\"PR-OFE-02\":1,\"CR-01\":1,\"PR-OFE-04\":2,\"PR-OFE-05\":2,\"PR-PRC-02\":1,\"PR-PRC-03\":1,\"PR-PRC-05\":1,\"PR-PRC-07\":1,\"GL-ELE-13\":1,\"GL-ELE-12\":2,\"DS-07\":1,\"DS-02\":3,\"DS-04\":2,\"DS-05\":1,\"ST-COR-02\":1,\"GL-ELE-10\":1,\"CR-06\":4,\"CR-07\":3,\"CR-04\":1,\"CR-05\":1,\"CR-02\":2,\"CR-03\":3,\"GL-ELE-09\":1}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "GC_ClsLvl"
            }, {
                "uid": "test_sur_q_4",
                "total": 1000,
                "question": "[\"What is the highest degree or level of school you have completed?\",\"Quel est le degré ou le niveau d'études le plus élevé que vous avez complété?\"]",
                "stats": "{\"Apprenticeship or trades certificate or diploma\":119,\"No certificate, diploma or degree\":418,\"University certificate or diploma below bachelor level\":92,\"College, CEGEP or other non-university certificate or diploma\":98,\"Secondary (high) school diploma or equivalency certificate\":175,\"University certificate, diploma or degree at bachelor level or above\":98}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_5",
                "total": 1000,
                "question": "[\"During which month of the year are you most likely to participate in work learning activities?\",\"Au cours de quel mois de l'année êtes-vous le plus susceptible de participer à des activités d'apprentissage professionnel?\"]",
                "stats": "{\"June\":65,\"May\":60,\"September\":64,\"March\":101,\"April\":70,\"August\":40,\"October\":40,\"December\":33,\"July\":49,\"January\":292,\"February\":96,\"None\":43,\"November\":47}",
                "questionType": "MULTI_CHOICE",
                "classifiedAs": "CGROUP"
            }, {
                "uid": "test_sur_q_6",
                "total": 1000,
                "question": "[\"What is your preferred method of learning?\",\"Quelle est votre méthode d'apprentissage préférée?\"]",
                "stats": "{\"Virtual classroom\":54,\"Web conference\":102,\"In-class\":162,\"Learning events\":65,\"Documentation\":80,\"Webcast\":91,\"Online\":369,\"Other\":77}",
                "questionType": "MULTI_CHOICE",
                "classifiedAs": "CGROUP"
            }, {
                "uid": "test_sur_q_7",
                "total": 1000,
                "question": "[\"What are your overall impressions about Evalhalla?\",\"Quelles sont vos impressions générales sur Evalhalla?\"]",
                "stats": "{\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":122,\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":177,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":99,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":157,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":445}",
                "questionType": "FREE_TEXT",
                "classifiedAs": "TEXTAREA"
            }, {
                "uid": "test_sur_q_8",
                "total": 1000,
                "question": "[\"In your opinion, what are the most useful features of Evalhalla?\",\"A votre avis, quelles sont les fonctionnalités les plus utiles d'Evalhalla?\"]",
                "stats": "{\"Survey preview, while designing the survey\":168,\"Survey designer tool\":371,\"Overall user experience\":80,\"Overall look and feel\":84,\"Ease of filling out the survey\":122,\"Instant access to real-time dashboards\":105,\"None\":70}",
                "questionType": "MULTI_CHOICE",
                "classifiedAs": "CGROUP"
            }, {
                "uid": "test_sur_q_9",
                "total": 1000,
                "question": "[\"What would you like to see changed or improved in Evalhalla?\",\"Qu'aimeriez-vous voir changé ou amélioré dans Evalhalla?\"]",
                "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":188,\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":116,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":122,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":153,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":421}",
                "questionType": "FREE_TEXT",
                "classifiedAs": "TEXTAREA"
            }, {
                "uid": "test_sur_q_10",
                "total": 1000,
                "question": "[\"Based on the demo you saw today, does it look easy to create surveys using Evalhalla?\",\"D'après la demo que vous avez vue aujourd'hui, semble-t-il facile de créer des enquêtes à l'aide d'Evalhalla?\"]",
                "stats": "{\"No\":202,\"Yes\":612,\"Unsure\":186}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_11",
                "total": 1000,
                "question": "[\"Overall, Evalhalla meets my expectations and needs for a course and event evaluation tool.\",\"Dans l'ensemble, Evalhalla répond à mes attentes et à mes besoins en matière d'outil d'évaluation de cours et d'événement.\"]",
                "stats": "{\"Neither agree nor disagree\":149,\"Strongly disagree\":107,\"Strongly agree\":426,\"Agree\":197,\"Disagree\":121}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_12",
                "total": 1000,
                "question": "[\"On a scale from 1 (not at all likely) to 10 (extremely likely), how likely would you recommend Evalhalla to others?\",\"Sur une échelle de 1 (pas du tout probable) à 10 (extrêmement probable), dans quelle mesure recommanderiez-vous Evalhalla à d'autres?\"]",
                "stats": "{\"1\":332,\"2\":114,\"3\":87,\"4\":78,\"5\":66,\"6\":51,\"7\":65,\"8\":51,\"9\":54,\"Unsure\":43,\"10\":59}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "SCALE_1_TO_10"
            }, {
                "uid": "test_sur_q_13",
                "total": 1000,
                "question": "[\"Overall, how satisfied are you with the presentation?\",\"Globalement, dans quelle mesure êtes-vous satisfait de la présentation?\"]",
                "stats": "{\"Somewhat dissatisfied\":127,\"Very satisfied\":465,\"Satisfied\":175,\"Very dissatisfied\":97,\"Neither satisfied nor dissatisfied\":136}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_14",
                "total": 1000,
                "question": "[\"How satisfied are you with the presentation and demo delivery method?\",\"Dans quelle mesure êtes-vous satisfait de la méthode de présentation et de démo?\"]",
                "stats": "{\"Somewhat dissatisfied\":121,\"Very satisfied\":435,\"Satisfied\":173,\"Very dissatisfied\":112,\"Neither satisfied nor dissatisfied\":159}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_15",
                "total": 1000,
                "question": "[\"Is there anything else you would like to share about the presentation, demo or Evalhalla?\",\"Y a-t-il autre chose que vous voudriez partager au sujet de la présentation, de la démo ou d'Evalhalla?\"]",
                "stats": "{\"This was very nice. It met my needs well. There is some room for improvement, but good overall\":185,\"This was ok but it could be much better. Some parts did not work for me and I was confused at times\":119,\"I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy.\":105,\"It was fine. Nothing really stood out as a positive or a negative really. It works.\":148,\"I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.\":443}",
                "questionType": "FREE_TEXT",
                "classifiedAs": "TEXTAREA"
            }]
        }
    };
    stat_node_responses.push(stat_node_response_start);
    stat_node_responses.push(stat_node_response_1);
    stat_node_responses.push(stat_node_response_2);
    stat_node_responses.push(stat_node_response_end);

    return stat_node_responses;
};


_E.feature.cortex.messages.create_survey_template_msg = function (jo) {
    (_E.feature.cortex.messages.debug) ? console.log(`create_survey_template_msg`) : true;
    let msg_cortex = {
        "uid": "",//
        "title": "",//
        "description": "",//
        "valid": {
            "from": "2019-06-01", // default to 2019-06-01
            "to": "2020-06-01" // default to 2020-06-01
        },
        "version": "0.0.1",
        "questions": [
            /*
                {
                    "question_label": "",//"SINGLE_CHOICE|MULTI_CHOICE|CLASSIFIED|BINARY|FREE_TEXT"
                    "question_interpretation": "",//"AS_CHOICE|AS_TRUTH|AS_FREE_TEXT|CLASSIFIED_AS"
                    "AT_ORDER": ""//
                }
            */
        ]
    };

    msg_cortex.uid = jo.survey.trim();
    msg_cortex.title = jo.title;
    msg_cortex.description = jo.description;
    msg_cortex.questions = jo.questions;
    msg_cortex = _E.fxn.common.trim_json_object_keyvalues(msg_cortex);

    return msg_cortex;
};

_E.feature.cortex.messages.create_survey_evalese_msg = function (jo) {
    (_E.feature.cortex.messages.debug) ? console.log(`create_survey_evalese_msg`) : true;
    let msg_cortex = {
        "uid": "",//
        "sur_evalese": ""
    };

    msg_cortex.uid = jo.survey.trim();
    msg_cortex.sur_evalese = _E.core.interpreter.sur_evalese.trim();
    msg_cortex = _E.fxn.common.trim_json_object_keyvalues(msg_cortex);

    return msg_cortex;
};


// qa = question answer
_E.feature.cortex.messages.create_survey_response_qa_part = function (jo) {
    let msg_cortex = {
        "uid": "",
        "cortexQuestionType": "",
        "classifiedAs": "",
        "atOrder": "",
        "questionAnswer": "",
        "questionText": ""
    };
    return msg_cortex;
}
_E.feature.cortex.messages.create_survey_response_msg = function (jo) {

    let msg_cortex = {
        "uid": "PENDING_TODO",
        "respondent": {
            "fluent_at": "",// "tombstone_language",
            "in_department": "",// "tombstone_department",
            "located_in": "",// "tombstone_city",
            "work_as": "",// "tombstone_classification"
            //},
            //"response": {
            "userAgent": "",
            "surveyEntryMethod": "",
            "conducted": ""
        },
        "data": {
            /*questions:[
                {
                    "uid": cortex_response.response.conducted + "_q_" + tokens[2],
                    "questionType": _E.core.interpreter.cortex_questiontypes[tokens[0]].type,
                    "classifiedAs": _E.core.interpreter.cortex_questiontypes[tokens[0]].subtype,
                    "atOrder": tokens[2],
                    "questionAnswer": jo[key],
                    "questionText": jo["textofquestion_qid_" + tokens[1]]
                }
            }
        ]*/
        },
        "created": {
            "from": "", // default to 2019-06-01
            "to": "" // default to 2020-06-01
        }
    };
    if (typeof jo === "undefined") {
        console.log("Exiting early from create_survey_response_msg");
        return msg_cortex;
    }
    /*
    "tombstone_department": "",
    "tombstone_city": "",
    "tombstone_classification": "",
    "tombstone_offering_id": "",
    "tombstone_language": "en",
 
    "meta_useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "meta_entry_method": "",
    "meta_question_count": 14,
    "meta_evalhalla_sur": "eldp",
    "meta_submission_time": "2019-08-17T22:03:26.727Z"
    */

    // WARN: Might only work for ELDP
    msg_cortex.respondent.conducted = jo["meta_evalhalla_sur"].toUpperCase(); // WARN: Uppercase, this will cause issues
    // need to slugify and fix
    // TODO
    msg_cortex.respondent.surveyEntryMethod = (jo["meta_entry_method"] == "") ? "DIRECT_LINK" : jo["meta_entry_method"];
    msg_cortex.respondent.userAgent = jo["meta_useragent"];
    //cortex_response.response.conducted = jo["meta_evalhalla_sur"];

    msg_cortex.respondent.fluent_at = jo["tombstone_language"];
    msg_cortex.respondent.in_department = jo["tombstone_department"];
    msg_cortex.respondent.located_in = jo["tombstone_city"];
    msg_cortex.respondent.work_as = jo["tombstone_classification"];


    msg_cortex.created.from = jo["meta_submission_time"];
    msg_cortex.created.to = jo["meta_submission_time"];

    for (let key in jo) {
        let tokens = key.split("_");
        if (tokens[0] == "tombstone") {
            continue;
        } else if (tokens[0] == "meta") {
            continue;
        } else if (tokens[0] == "rgroup" || tokens[0] == "cgroup" || tokens[0] == "scale" || tokens[0] == "scale1to10" ||
            tokens[0] == "scale1to5" || tokens[0] == "textarea") {

            msg_cortex.data[msg_cortex.respondent.conducted + "_q_" + tokens[2]] = jo[key];

            /*msg_cortex.questions.push(
                {
                    "uid": msg_cortex.respondent.conducted + "_q_" + tokens[2],
                    "cortexQuestionType": _E.core.interpreter.cortex_questiontypes[tokens[0]].type,
                    "classifiedAs": _E.core.interpreter.cortex_questiontypes[tokens[0]].subtype,
                    "atOrder": tokens[2],
                    "questionAnswer": jo[key],
                    "questionText": jo["textofquestion_qid_" + tokens[1]]
                }
            );*/
        }
    }
    return msg_cortex;
}

_E.feature.cortex.messages.enable_feature = function () {
    (_E.feature.cortex.messages.debug) ? console.log(`enable_feature`) : true;
};
