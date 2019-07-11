// example nanos surveys
var example_nanos = "# 2019-1317\n" +
    "## Classroom Learning Activity Evaluation Questionnaire\n" +
    "### This questionnaire is designed to assess the quality of your learning experience with\n" +
    "the Canada School of\n" +
    "Public Service.\n" +
    "Together, learners, the School and departments, can work towards building a stronger government\n" +
    "wide learning culture.\n" +
    "\n" +
    "This information is being collected under the authority of paragraph 4(f) of the Canada School\n" +
    "of Public Service Act and\n" +
    "will be stored in the School’s evaluation system.\n" +
    "Please note that your personal informationwill remain confidential and is protected under the\n" +
    "Privacy Act. For more\n" +
    "information, refer to the School's Privacy Notice.\n" +
    "\n" +
    "Q: 1. Please rate your overall satisfaction or dissatisfaction with this learning\n" +
    "activity, on a scale of 1 to 10\n" +
    "where 1 is very dissatisfied and 10 is very satisfied.\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    "\n" +
    "Q: 2. Why did you give that score?\n" +
    "/OPEN\n" +
    "\n" +
    "// Please rate your satisfaction or dissatisfaction with the following components of\n" +
    "this learning activity,\n" +
    "on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied.\n" +
    "\n" +
    "/RAND\n" +
    "Q: 3. The level of detail of the content\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    "\n" +
    "Q: 4. The quality of the content\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    "\n" +
    "Q: 5. The language quality (English and French) of the materials\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    "\n" +
    "Q: 6. The overall quality of the instructor/facilitator\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    "\n" +
    "Q: 7. The subject matter knowledge of the instructor/facilitator\n" +
    "/SCALE Very dissatisfied, Very satisfied, Unsure\n" +
    ";RAND\n" +
    "\n" +
    "Q: 8.Would you say that the instructor/facilitatorspent too much, the right amount or\n" +
    "not enough time covering\n" +
    "the content of the learning activity.\n" +
    "/ONE\n" +
    "Too much time...1\n" +
    "The right amount of time...2\n" +
    "Not enough time...3\n" +
    "Unsure...4\n" +
    ";\n" +
    "\n" +
    "// Please rate your level of knowledge of the subject areaon a scalefrom 1 to 10,\n" +
    "where 1 is very low level\n" +
    "of knowledge in the subject area and 10 is a very high level of knowledge in the subject area.\n" +
    "\n" +
    "Q: 9. Before this learning activity\n" +
    "/SCALE Low level of knowledge, High level of knowledge, Unsure\n" +
    "\n" +
    "Q: 10. After this learning activity\n" +
    "/SCALE Low level of knowledge, High level of knowledge, Unsure\n" +
    "\n" +
    "Q: 11. Would you say that your expectations were exceeded, met or not met?\n" +
    "/ONE\n" +
    "Exceeded...1\n" +
    "Met...2\n" +
    "Not met...3\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    "Q: 12. Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this\n" +
    "learning activity to a\n" +
    "colleage?\n" +
    "/ONE\n" +
    "Likely...1\n" +
    "Somewhat likely...2\n" +
    "Somewhat unlikely...3\n" +
    "Unlikely...4\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    "Q: 13. Do you have any comments you would like to share about the\n" +
    "facilitator(s)/instructor(s)? For privacy\n" +
    "reasons, please do not use facilitator / instructor names in your comments.\n" +
    "/OPEN\n" +
    "\n" +
    "Q: 14. Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your\n" +
    "learning?\n" +
    "/ONE\n" +
    "Yes...1 (CONTINUE TO Q15)\n" +
    "No...2 (SKIP TO Q19)\n" +
    ";\n" +
    "\n" +
    "// Were the following tools valuable, somewhat valuable, somewhat not valuable or not\n" +
    "valuable in terms of\n" +
    "contributing to your learning?\n" +
    "\n" +
    "/RAND\n" +
    "\n" +
    "Q: 15. Videos\n" +
    "/ONE\n" +
    "Valuable...1\n" +
    "Somewhat valuable...2\n" +
    "Somewhat not valuable...3\n" +
    "Not valuable...4\n" +
    "Did not use tool...5\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    "Q: 16. Blogs\n" +
    "/ONE\n" +
    "Valuable...1\n" +
    "Somewhat valuable...2\n" +
    "Somewhat not valuable...3\n" +
    "Not valuable...4\n" +
    "Did not use tool...5\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    "Q: 17. Forums\n" +
    "/ONE\n" +
    "Valuable...1\n" +
    "Somewhat valuable...2\n" +
    "Somewhat not valuable...3\n" +
    "Not valuable...4\n" +
    "Did not use tool...5\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    "Q: 18. Job aids\n" +
    "/ONE\n" +
    "Valuable...1\n" +
    "Somewhat valuable...2\n" +
    "Somewhat not valuable...3\n" +
    "Not valuable...4\n" +
    "Did not use tool...5\n" +
    "Unsure...77\n" +
    ";\n" +
    "\n" +
    ";RAND\n" +
    "\n" +
    "/RANDO\n" +
    "Q: 19. Please rank why you took this learning activity where 1 is the most important\n" +
    "reason, 2 is the second most\n" +
    "important reason and so forth?\n" +
    "/RANK\n" +
    "To acquire new knowledge, skills,attitudes\n" +
    "To complete mandatory training\n" +
    "To pursue my professional development\n" +
    "To prepare for a test\n" +
    "To prepare for a career change\n" +
    "My supervisor requested I take the course\n" +
    "General interest\n" +
    "Other (please specify)\n" +
    ";\n" +
    ";RANDO\n" +
    "\n" +
    "// Reflecting on the learning activity, please rate the following statements,where 1\n" +
    "is a very negative\n" +
    "impression and 10 is a very positive impression in terms of your impression of the experience\n" +
    "and potential impact, if\n" +
    "any, of the learning activity.\n" +
    "\n" +
    "/RAND\n" +
    "\n" +
    "Q: 20. This learning activity as a valuableuse of my time.\n" +
    "/SCALE Very negative impression, Very positive impression, Unsure\n" +
    "\n" +
    "Q: 21. The relevance of the learning activity to my job.\n" +
    "/SCALE Very negative impression, Very positive impression, Unsure\n" +
    "\n" +
    "Q: 22. The learning activity contributing to my performance on the job.\n" +
    "/SCALE Very negative impression, Very positive impression, Unsure\n" +
    "\n" +
    "Q: 23. Applying what I have learned to my job.\n" +
    "/SCALE Very negative impression, Very positive impression, Unsure\n" +
    "\n" +
    ";RAND\n" +
    "\n" +
    "Q: 24. Are there any other comments you would like to share in order to help the CSPS\n" +
    "improve? For privacy\n" +
    "reasons, please do not use instructor/facilitator names in your comments.\n" +
    "/OPEN\n" +
    "\n" +
    "// Thank you for sharing your views\n" +
    "";
var example_nanos_paged = "# 2019-1317\n" +
    "##\n" +
    "/en Classroom Learning Activity Evaluation Questionnaire /;\n" +
    "/fr Questionnaire d'évaluation d'une activitée d'apprentissage /;\n" +
    "\n" +
    "###\n" +
    "/en This questionnaire is designed to assess the quality of your learning experience with the Canada School of Public Service. Together, learners, the School and departments, can work towards building a stronger government wide learning culture. This information is being collected under the authority of paragraph 4(f) of the Canada School of Public Service Act and will be stored in the School’s evaluation system. Please note that your personal information will remain confidential and is protected under the Privacy Act. For more information, refer to the School's Privacy Notice. /;\n" +
    "/fr Le présent questionnaire est conçu pour évaluer la qualité de votre expérience d'apprentissage à l'École de la fonction publique du Canada. Vos réponses contribueront à déterminer les facteurs qui influencent comment vous mettez en pratique, dans votre milieu de travail, les notions que vous avez apprises dans l'activité d'apprentissage. Ainsi, les apprenants, les ministères et l'École peuvent travailler ensemble à la création d'une culture d'apprentissage pangouvernementale. Les renseignements personnels sont recueillis en vertu de l'alinéa 4f) de la Loi sur l'École de la fonction publique du Canada et conservés dans le système d'évaluation de l'École. Vos renseignements personnels sont protégés en vertu de la Loi sur la protection des renseignements personnels. Pour en savoir davantage, veuillez consulter l'Avis de confidentialité de l'École. Veuillez sélectionner votre réponse pour chacun des énoncés ci-après. /;\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "Q:\n" +
    "/en Please rate your overall satisfaction or dissatisfaction with this learning activity, on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied. /;\n" +
    "/fr Veuillez indiquer votre degré de satisfaction à l'égard de l'activité d'apprentissage, sur une échelle de 1 (très insatisfait) à 10 (très satisfait). /;\n" +
    "\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q:\n" +
    "/en Why did you give that score? /;\n" +
    "/fr Veuillez nous dire les raisons pour lesquelles vous avez attribué cette note à l'activité d'apprentissage. /;\n" +
    "/OPEN\n" +
    "/pagebreak\n" +
    "// /en Please rate your satisfaction or dissatisfaction with the following components of this learning activity, on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied. /;\n" +
    "/fr Veuillez indiquer votre degré de satisfaction à l'égard des éléments suivants de l'activité d'apprentissage, sur une échelle de 1 (très insatisfait) à 10 (très satisfait). /;\n" +
    "\n" +
    "/RAND\n" +
    "Q: /en The level of detail of the content /;\n" +
    "/fr Niveau de détail du contenu /;\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The quality of the content /;\n" +
    "/fr Qualité du contenu /;\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The language quality (English and French) of the materials /;\n" +
    "/fr Qualité de la langue du matériel (français ou anglais) /;\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The overall quality of the instructor/facilitator /;\n" +
    "/fr La qualité globale de l'instructeur / animateur /;\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The subject matter knowledge of the instructor/facilitator /;\n" +
    "/fr La connaissance du sujet de l'instructeur / animateur /;\n" +
    "/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain\n" +
    ";RAND\n" +
    "\n" +
    "Q: /en Would you say that the instructor/facilitator spent too much, the right amount or not enough time covering the content of the learning activity. /;\n" +
    "/fr Diriez-vous que l'instructeur / animateur a dépensé trop, assez ou pas assez de temps pour couvrir le contenu de l'activité d'apprentissage. /;\n" +
    "/ONE\n" +
    "/en Too much time...1 /; /fr Trop de temps ... 1 /;\n" +
    "/en The right amount of time...2 /; /fr La bonne quantité de temps ... 2 /;\n" +
    "/en Not enough time...3 /; /fr Pas assez de temps ... 3 /;\n" +
    "/en Unsure...4 /; /fr Pas sûr ... 4 /;\n" +
    ";\n" +
    "\n" +
    "//\n" +
    "/en Please rate your level of knowledge of the subject area on a scale from 1 to 10, where 1 is very low level of knowledge in the subject area and 10 is a very high level of knowledge in the subject area. /;\n" +
    "/fr Veuillez évaluer votre connaissance du sujet abordé, sur une échelle de 1 (très faible connaissance du sujet) à 10 (très grande connaissance du sujet). /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Before this learning activity /;\n" +
    "/fr Avant l'activité d'apprentissage /;\n" +
    "/SCALE Low level of knowledge / Faible connaissance, High level of knowledge / Grande connaissance, Unsure / Incertain\n" +
    "\n" +
    "Q: /en After this learning activity /;\n" +
    "/fr Après l'activité d'apprentissage /;\n" +
    "/SCALE Low level of knowledge / Faible connaissance, High level of knowledge / Grande connaissance, Unsure / Incertain\n" +
    "/pagebreak\n" +
    "\n" +
    "Q: /en Would you say that your expectations were exceeded, met or not met? /;\n" +
    "/fr Diriez-vous que l'activité d'apprentissage a dépassé vos attentes, répondu à vos attentes ou déçu vos attentes? /;\n" +
    "/ONE\n" +
    "/en Exceeded...1 /; /fr Dépassé mes attentes...1 /;\n" +
    "/en Met...2 /; /fr Répondu à mes attentes...2 /;\n" +
    "/en Not met...3 /; /fr Déçu mes attentes...3 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this learning activity to a colleage? /;\n" +
    "/fr Est-il probable, plutôt probable, plutôt improbable ou improbable que vous recommandiez cette activité d'apprentissage à un collègue? /;\n" +
    "/ONE\n" +
    "/en Likely...1 /; /fr Probable...1 /;\n" +
    "/en Somewhat likely...2 /; /fr Plutôt probable...2 /;\n" +
    "/en Somewhat unlikely...3 /; /fr Plutôt improbable...3 /;\n" +
    "/en Unlikely...4 /; /fr Improbable...4 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Do you have any comments you would like to share about the \n" +
    "facilitator(s)/instructor(s)? For privacy\n" +
    "reasons, please do not use facilitator / instructor names in your comments. /;\n" +
    "/fr Avez-vous des commentaires à faire sur le\n" +
    "facilitateur (s) / instructeur (s)? Pour des raisons de confidentialité, veuillez ne pas nommer les personnes par leur nom dans vos commentairesveuillez ne pas nommer l'instructeur/animateur dans vos commentaires. /;\n" +
    "/OPEN\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "Q: /en Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your \n" +
    "learning? /;\n" +
    "/fr Avez-vous utilisé des outils (par exemple des blogues, des vidéos, etc.) provenant de GCcampus pour enrichir votre formation? /;\n" +
    "/ONE\n" +
    "/en Yes...1 /; /fr Oui...1 /;\n" +
    "/en No...2 /; /fr Non...2 /;\n" +
    ";\n" +
    "\n" +
    "//\n" +
    "/en Were the following tools valuable, somewhat valuable, somewhat not valuable or not valuable in terms of contributing to your learning? /;\n" +
    "/fr Les outils suivants se sont ils avérés utiles, plutôt utiles, plutôt inutiles ou inutiles dans le cadre de votre apprentissage? /;\n" +
    ";\n" +
    "\n" +
    "/RAND\n" +
    "\n" +
    "Q: /en Videos /;\n" +
    "/fr Vidéos /;\n" +
    "/ONE\n" +
    "/en Valuable...1 /; /fr Utiles...1 /;\n" +
    "/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;\n" +
    "/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;\n" +
    "/en Not valuable...4 /; /fr Inutiles...4 /;\n" +
    "/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Blogs /;\n" +
    "/fr Blogues /;\n" +
    "/ONE\n" +
    "/en Valuable...1 /; /fr Utiles...1 /;\n" +
    "/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;\n" +
    "/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;\n" +
    "/en Not valuable...4 /; /fr Inutiles...4 /;\n" +
    "/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Forums /;\n" +
    "/fr Forums /;\n" +
    "/ONE\n" +
    "/en Valuable...1 /; /fr Utiles...1 /;\n" +
    "/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;\n" +
    "/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;\n" +
    "/en Not valuable...4 /; /fr Inutiles...4 /;\n" +
    "/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    "Q: /en Job aids /;\n" +
    "/fr Outils de travail /;\n" +
    "/ONE\n" +
    "/en Valuable...1 /; /fr Utiles...1 /;\n" +
    "/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;\n" +
    "/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;\n" +
    "/en Not valuable...4 /; /fr Inutiles...4 /;\n" +
    "/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;\n" +
    "/en Unsure...77 /; /fr Incertain...77 /;\n" +
    ";\n" +
    "\n" +
    ";RAND\n" +
    "/pagebreak\n" +
    "/RANDO\n" +
    "Q: /en Please rank why you took this learning activity where 1 is the most important reason, 2 is the second most important reason and so forth? /;\n" +
    "/fr Veuillez indiquer en ordre d'importance les raisons pour lesquelles vous avez participé à cette activité d'apprentissage (1 étant la raison la plus importante, 2 la suivante, etc.)? /;\n" +
    "/RANK\n" +
    "/en To acquire new knowledge, skills, attitudes /; /fr Pour acquérir de nouvelles connaissances, habiletés, attitudes /;\n" +
    "/en To complete mandatory training /; /fr Pour suivre une formation obligatoire /;\n" +
    "/en To pursue my professional development /; /fr Pour poursuivre mon perfectionnement professionnel /;\n" +
    "/en To prepare for a test /; /fr Pour me préparer à un examen /;\n" +
    "/en To prepare for a career change /; /fr Pour me préparer à un changement de carrière /;\n" +
    "/en My supervisor requested I take the course /; /fr Mon superviseur m'a demandé de suivre ce cours /; \n" +
    "/en General interest /; /fr Intérêt général /;\n" +
    "/en Other (please specify) /; /fr Autre (veuillez préciser) /;\n" +
    ";\n" +
    ";RANDO\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "// \n" +
    "/en Reflecting on the learning activity, please rate the following statements, where 1 is a very negative impression and 10 is a very positive impression in terms of your impression of the experience and potential impact, if any, of the learning activity. /;\n" +
    "/fr En réfléchissant à l'activité, veuillez évaluer les énoncés suivants sur une échelle de 1 à 10 en fonction de vos impressions sur l'expérience d'apprentissage et sur l'incidence possible de l'activité en question (1 = impression très défavorable, et 10 = impression favorable). /;\n" +
    "\n" +
    "/RAND\n" +
    "\n" +
    "Q: /en This learning activity as a valuable use of my time. /;\n" +
    "/fr Le temps consacré à l'activité d'apprentissage en valait la peine. /;\n" +
    "/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The relevance of the learning activity to my job. /;\n" +
    "/fr L'activité d'apprentissage était pertinente pour mon emploi. /;\n" +
    "/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain\n" +
    "\n" +
    "Q: /en The learning activity contributing to my performance on the job. /;\n" +
    "/fr L'activité d'apprentissage a contribué à mon rendement au travail. /;\n" +
    "/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain\n" +
    "\n" +
    "Q: /en Applying what I have learned to my job. /;\n" +
    "/fr Les notions apprises peuvent être appliquées dans mon travail. /;\n" +
    "/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain\n" +
    "\n" +
    ";RAND\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "Q: /en Are there any other comments you would like to share in order to help the CSPS improve? For privacy reasons, please do not use instructor/facilitator names in your comments. /;\n" +
    "/fr Avez vous des commentaires à formuler afin d'aider l'École à s'améliorer? Pour des raisons de confidentialité, veuillez ne pas nommer les personnes par leur nom dans vos commentairesveuillez ne pas nommer l'instructeur/animateur dans vos commentaires. /;\n" +
    "/OPEN\n" +
    "\n" +
    "// /en Thank you for sharing your views /; /fr Merci de partager vos points de vue /;\n" +
    "";