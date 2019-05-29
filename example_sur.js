var example_nanos = `# 2019-1317
## Classroom Learning Activity Evaluation Questionnaire
### This questionnaire is designed to assess the quality of your learning experience with
the Canada School of
Public Service.
Together, learners, the School and departments, can work towards building a stronger government
wide learning culture.

This information is being collected under the authority of paragraph 4(f) of the Canada School
of Public Service Act and
will be stored in the School’s evaluation system.
Please note that your personal informationwill remain confidential and is protected under the
Privacy Act. For more
information, refer to the School's Privacy Notice.

Q: 1. Please rate your overall satisfaction or dissatisfaction with this learning
activity, on a scale of 1 to 10
where 1 is very dissatisfied and 10 is very satisfied.
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 2. Why did you give that score?
/OPEN

// Please rate your satisfaction or dissatisfaction with the following components of
this learning activity,
on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied.

/RAND
Q: 3. The level of detail of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 4. The quality of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 5. The language quality (English and French) of the materials
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 6. The overall quality of the instructor/facilitator
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 7. The subject matter knowledge of the instructor/facilitator
/SCALE Very dissatisfied, Very satisfied, Unsure
;RAND

Q: 8.Would you say that the instructor/facilitatorspent too much, the right amount or
not enough time covering
the content of the learning activity.
/ONE
Too much time...1
The right amount of time...2
Not enough time...3
Unsure...4
;

// Please rate your level of knowledge of the subject areaon a scalefrom 1 to 10,
where 1 is very low level
of knowledge in the subject area and 10 is a very high level of knowledge in the subject area.

Q: 9. Before this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure

Q: 10. After this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure

Q: 11. Would you say that your expectations were exceeded, met or not met?
/ONE
Exceeded...1
Met...2
Not met...3
Unsure...77
;

Q: 12. Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this
learning activity to a
colleage?
/ONE
Likely...1
Somewhat likely...2
Somewhat unlikely...3
Unlikely...4
Unsure...77
;

Q: 13. Do you have any comments you would like to share about the
facilitator(s)/instructor(s)? For privacy
reasons, please do not use facilitator / instructor names in your comments.
/OPEN

Q: 14. Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your
learning?
/ONE
Yes...1 (CONTINUE TO Q15)
No...2 (SKIP TO Q19)
;

// Were the following tools valuable, somewhat valuable, somewhat not valuable or not
valuable in terms of
contributing to your learning?

/RAND

Q: 15. Videos
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 16. Blogs
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 17. Forums
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 18. Job aids
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

;RAND

/RANDO
Q: 19. Please rank why you took this learning activity where 1 is the most important
reason, 2 is the second most
important reason and so forth?
/RANK
To acquire new knowledge, skills,attitudes
To complete mandatory training
To pursue my professional development
To prepare for a test
To prepare for a career change
My supervisor requested I take the course
General interest
Other (please specify)
;
;RANDO

// Reflecting on the learning activity, please rate the following statements,where 1
is a very negative
impression and 10 is a very positive impression in terms of your impression of the experience
and potential impact, if
any, of the learning activity.

/RAND

Q: 20. This learning activity as a valuableuse of my time.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 21. The relevance of the learning activity to my job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 22. The learning activity contributing to my performance on the job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 23. Applying what I have learned to my job.
/SCALE Very negative impression, Very positive impression, Unsure

;RAND

Q: 24. Are there any other comments you would like to share in order to help the CSPS
improve? For privacy
reasons, please do not use instructor/facilitator names in your comments.
/OPEN

// Thank you for sharing your views
`;
var example_nanos_paged = `# 2019-1317
##
/en Classroom Learning Activity Evaluation Questionnaire /;
/fr Questionnaire d'évaluation d'une activitée d'apprentissage /;

###
/en This questionnaire is designed to assess the quality of your learning experience with the Canada School of Public Service. Together, learners, the School and departments, can work towards building a stronger government wide learning culture. This information is being collected under the authority of paragraph 4(f) of the Canada School of Public Service Act and will be stored in the School’s evaluation system. Please note that your personal information will remain confidential and is protected under the Privacy Act. For more information, refer to the School's Privacy Notice. /;
/fr Le présent questionnaire est conçu pour évaluer la qualité de votre expérience d'apprentissage à l'École de la fonction publique du Canada. Vos réponses contribueront à déterminer les facteurs qui influencent comment vous mettez en pratique, dans votre milieu de travail, les notions que vous avez apprises dans l'activité d'apprentissage. Ainsi, les apprenants, les ministères et l'École peuvent travailler ensemble à la création d'une culture d'apprentissage pangouvernementale. Les renseignements personnels sont recueillis en vertu de l'alinéa 4f) de la Loi sur l'École de la fonction publique du Canada et conservés dans le système d'évaluation de l'École. Vos renseignements personnels sont protégés en vertu de la Loi sur la protection des renseignements personnels. Pour en savoir davantage, veuillez consulter l'Avis de confidentialité de l'École. Veuillez sélectionner votre réponse pour chacun des énoncés ci-après. /;

/pagebreak

Q:
/en Please rate your overall satisfaction or dissatisfaction with this learning activity, on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied. /;
/fr Veuillez indiquer votre degré de satisfaction à l'égard de l'activité d'apprentissage, sur une échelle de 1 (très insatisfait) à 10 (très satisfait). /;

/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain

Q:
/en Why did you give that score? /;
/fr Veuillez nous dire les raisons pour lesquelles vous avez attribué cette note à l'activité d'apprentissage. /;
/OPEN
/pagebreak
// /en Please rate your satisfaction or dissatisfaction with the following components of this learning activity, on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied. /;
/fr Veuillez indiquer votre degré de satisfaction à l'égard des éléments suivants de l'activité d'apprentissage, sur une échelle de 1 (très insatisfait) à 10 (très satisfait). /;

/RAND
Q: /en The level of detail of the content /;
/fr Niveau de détail du contenu /;
/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain

Q: /en The quality of the content /;
/fr Qualité du contenu /;
/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain

Q: /en The language quality(English and French)of the materials /;
/fr Qualité de la langue du matériel (français ou anglais) /;
/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain

Q: /en The overall quality of the instructor/facilitator /;
/fr La qualité globale de l'instructeur / animateur /;
/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain

Q: /en The subject matter knowledge of the instructor/facilitator /;
/fr La connaissance du sujet de l'instructeur / animateur /;
/SCALE Very dissatisfied / Très insatisfait, Very satisfied / Très satisfait, Unsure / Incertain
;RAND

Q: /en Would you say that the instructor/facilitator spent too much, the right amount or not enough time covering the content of the learning activity. /;
/fr Diriez-vous que l'instructeur / animateur a dépensé trop, assez ou pas assez de temps pour couvrir le contenu de l'activité d'apprentissage. /;
/ONE
Too much time...1
The right amount of time...2
Not enough time...3
Unsure...4
;

//
/en Please rate your level of knowledge of the subject area on a scale from 1 to 10, where 1 is very low level of knowledge in the subject area and 10 is a very high level of knowledge in the subject area. /;
/fr Veuillez évaluer votre connaissance du sujet abordé, sur une échelle de 1 (très faible connaissance du sujet) à 10 (très grande connaissance du sujet). /;
;

Q: /en Before this learning activity /;
/fr Avant l'activité d'apprentissage /;
/SCALE Low level of knowledge / Faible connaissance, High level of knowledge / Grande connaissance, Unsure / Incertain

Q: /en After this learning activity /;
/fr Après l'activité d'apprentissage /;
/SCALE Low level of knowledge / Faible connaissance, High level of knowledge / Grande connaissance, Unsure / Incertain
/pagebreak

Q: /en Would you say that your expectations were exceeded, met or not met? /;
/fr Diriez-vous que l'activité d'apprentissage a dépassé vos attentes, répondu à vos attentes ou déçu vos attentes? /;
/ONE
/en Exceeded...1 /; /fr Dépassé mes attentes...1 /;
/en Met...2 /; /fr Répondu à mes attentes...2 /;
/en Not met...3 /; /fr Déçu mes attentes...3 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

Q: /en Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this learning activity to a colleage? /;
/fr Est-il probable, plutôt probable, plutôt improbable ou improbable que vous recommandiez cette activité d'apprentissage à un collègue? /;
/ONE
/en Likely...1 /; /fr Probable...1 /;
/en Somewhat likely...2 /; /fr Plutôt probable...2 /;
/en Somewhat unlikely...3 /; /fr Plutôt improbable...3 /;
/en Unlikely...4 /; /fr Improbable...4 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

Q: /en Do you have any comments you would like to share about the 
facilitator(s)/instructor(s)? For privacy
reasons, please do not use facilitator / instructor names in your comments. /;
/fr Avez-vous des commentaires à faire sur le
facilitateur (s) / instructeur (s)? Pour des raisons de confidentialité, veuillez ne pas nommer les personnes par leur nom dans vos commentairesveuillez ne pas nommer l'instructeur/animateur dans vos commentaires. /;
/OPEN

/pagebreak

Q: /en Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your 
learning? /;
/fr Avez-vous utilisé des outils (par exemple des blogues, des vidéos, etc.) provenant de GCcampus pour enrichir votre formation? /;
/ONE
/en Yes...1 /; /fr Oui...1 /;
/en No...2 /; /fr Non...2 /;
;

//
/en Were the following tools valuable, somewhat valuable, somewhat not valuable or not valuable in terms of contributing to your learning? /;
/fr Les outils suivants se sont ils avérés utiles, plutôt utiles, plutôt inutiles ou inutiles dans le cadre de votre apprentissage? /;
;

/RAND

Q: /en Videos /;
/fr Vidéos /;
/ONE
/en Valuable...1 /; /fr Utiles...1 /;
/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;
/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;
/en Not valuable...4 /; /fr Inutiles...4 /;
/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

Q: /en Blogs /;
/fr Blogues /;
/ONE
/en Valuable...1 /; /fr Utiles...1 /;
/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;
/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;
/en Not valuable...4 /; /fr Inutiles...4 /;
/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

Q: /en Forums /;
/fr Forums /;
/ONE
/en Valuable...1 /; /fr Utiles...1 /;
/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;
/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;
/en Not valuable...4 /; /fr Inutiles...4 /;
/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

Q: /en Job aids /;
/fr Outils de travail /;
/ONE
/en Valuable...1 /; /fr Utiles...1 /;
/en Somewhat valuable...2 /; /fr Plutôt utiles...2 /;
/en Somewhat not valuable...3 /; /fr Plutôt inutiles...3 /;
/en Not valuable...4 /; /fr Inutiles...4 /;
/en Did not use tool...5 /; /fr N'a pas utilisé les outils...5 /;
/en Unsure...77 /; /fr Incertain...77 /;
;

;RAND
/pagebreak
/RANDO
Q: /en Please rank why you took this learning activity where 1 is the most important reason, 2 is the second most important reason and so forth? /;
/fr Veuillez indiquer en ordre d'importance les raisons pour lesquelles vous avez participé à cette activité d'apprentissage (1 étant la raison la plus importante, 2 la suivante, etc.)? /;
/RANK
/en To acquire new knowledge, skills, attitudes /; /fr Pour acquérir de nouvelles connaissances, habiletés, attitudes /;
/en To complete mandatory training /; /fr Pour suivre une formation obligatoire /;
/en To pursue my professional development /; /fr Pour poursuivre mon perfectionnement professionnel /;
/en To prepare for a test /; /fr Pour me préparer à un examen /;
/en To prepare for a career change /; /fr Pour me préparer à un changement de carrière /;
/en My supervisor requested I take the course /; /fr Mon superviseur m'a demandé de suivre ce cours /; 
/en General interest /; /fr Intérêt général /;
/en Other (please specify) /; /fr Autre (veuillez préciser) /;
;
;RANDO

/pagebreak
// /en Reflecting on the learning activity, please rate the following statements, where 1 is a very negative impression and 10 is a very positive impression in terms of your impression of the experience and potential impact, if any, of the learning activity.
/fr En réfléchissant à l'activité, veuillez évaluer les énoncés suivants sur une échelle de 1 à 10 en fonction de vos impressions sur l'expérience d'apprentissage et sur l'incidence possible de l'activité en question (1 = impression très défavorable, et 10 = impression favorable). /;
/RAND

Q: /en This learning activity as a valuable use of my time. /;
/fr Le temps consacré à l'activité d'apprentissage en valait la peine. /;
/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain

Q: /en The relevance of the learning activity to my job. /;
/fr L'activité d'apprentissage était pertinente pour mon emploi. /;
/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain

Q: /en The learning activity contributing to my performance on the job. /;
/fr L'activité d'apprentissage a contribué à mon rendement au travail. /;
/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain

Q: /en Applying what I have learned to my job. /;
/fr Les notions apprises peuvent être appliquées dans mon travail. /;
/SCALE Very negative impression / Impression très défavorable, Very positive impression / Impression favorable, Unsure / Incertain

;RAND

/pagebreak

Q: /en Are there any other comments you would like to share in order to help the CSPS improve? For privacy reasons, please do not use instructor/facilitator names in your comments. /;
/fr Avez vous des commentaires à formuler afin d'aider l'École à s'améliorer? Pour des raisons de confidentialité, veuillez ne pas nommer les personnes par leur nom dans vos commentairesveuillez ne pas nommer l'instructeur/animateur dans vos commentaires. /;
/OPEN

// /en Thank you for sharing your views /; /fr Merci de partager vos points de vue /;
`;