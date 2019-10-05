var discover = `# discover

##
/en Registration: Discover Digital CSPS Pilot /;
/fr Inscription: Pilote EFPC Découvrez le numérique /;

###
/en These sessions are reserved for CSPS employees. Please complete this form to register for one of the pilot offerings. /;
/fr Ces séances sont réservées pour les employés de l'EFPC. Veuillez compléter ce formulaire afin de vous inscire à une des séance du pilote. /;

//
/en Note: This platform is open source. The information being shared is public. If you prefer not to submit your application via this platform, please email these details to: csps.digitalacademy-academiedunumerique.efpc @canada.ca. /;
/fr Note : Cette plateforme est un logiciel libre. L'information partagée est publique. Si vous préférez ne pas soumettre votre candidature via cette plateforme, veuillez envoyer ces informations par courriel à : csps.digitalacademy-academiedunumerique.efpc @canada.ca. /;


*Q:
/en I consent to this information being public /;
/fr J'accepte que ces informations soient publiques /;
/one
/en Yes /; /fr Oui /;
;


*Q:
/en Which session do you wish to attend? /;
/fr À quelle séance désirez-vous assister? /;
/one
/en English - September 4, 2019 (111 Sussex, Ottawa, On) /; /fr Anglais - 4 septembre 2019 (111 Sussex, Ottawa, On) /;
/en French - September 5, 2019 (111 Sussex, Ottawa, On) /; /fr Français - 5 septembre 2019 (111 Sussex, Ottawa, On) /;
;

*Q:
/en Name /;
/fr Nom /;
/open

*Q:
/en Department /;
/fr Ministère /;
/department

*Q:
/en Email /;
/fr Courriel /;
/open

//
/en Thank you for your time! /; /fr Merci pour vos réponses! /;

`;
/**
 *
Q:
/en Registration options  /;
/fr Options d'inscriptions /;
/one
/en I wish to register as an individual. /; /fr Je veux m'inscire en tant qu'individu. /;
/en I wish to register a group of up to 3 people. /; /fr Je veux inscrire un groupe de 3 personnes maximum. /;
;
 */

var discover_dig = `
 # DISCOVER_DIGITAL

## 
/en Discover Digital -1205 /;
/fr Découvrez le numérique – 1205 /;

### 
/en Course evaluation /;
/fr Évaluation de cours /;

/TOMBSTONEPAGE

Q: 
/en Please rate your overall satisfaction or dissatisfaction with the Discover Digital course /;
/fr Veuillez évaluer votre satisfaction ou votre insatisfaction globale à l'égard de l'atelier Découvrez le numérique  /;
/dropdown
/en Very Dissatisfied /; /fr Très Insatisfait /;
/en Dissatisfied/; /fr Insatisfait/;
/en Unsure /; /fr Incertain /;
/en Satisfied/; /fr Satisfied/;
/en Very Satisfied /; /fr Très Satisfait  /;
;

Q:
/en Why did you give that score? /;
/fr Pourquoi avez-vous attribué cette note? /;
/open

// 
/en Please rate your satisfaction or dissatisfaction with the following components of this learning activity from 1 to 5, where 1 is very dissatisfied, 3 is unsure, and 5 is very satisfied  /;
/fr Veuillez évaluer votre satisfaction ou votre insatisfaction à l'égard des éléments suivants de cette activité d'apprentissage /;

Q: 
/en a. The quality of the content /;
/fr La qualité du contenu /;
/scale1to5
/en Very Dissatisfied /; /fr Très Insatisfait /;,
/en Very Satisfied /; /fr Très Satisfait  /;,
/en Unsure /; /fr Incertain /;

Q: 
/en b. The pace of the course /;
/fr Le rythme du cours  /;
/scale1to5
/en Very Dissatisfied /; /fr Très Insatisfait /;,
/en Very Satisfied /; /fr Très Satisfait  /;,
/en Unsure /; /fr Incertain /;

Q: 
/en c. The overall quality of the instructor/facilitator /;
/fr La qualité globale de l'instructeur/facilitateur /;
/scale1to5
/en Very Dissatisfied /; /fr Très Insatisfait /;,
/en Very Satisfied /; /fr Très Satisfait  /;,
/en Unsure /; /fr Incertain /;

Q: 
/en d. The subject matter knowledge of the instructor/facilitator /;
/fr Les connaissances de l'instructeur ou de l'animateur en la matière /;
/scale1to5
/en Very Dissatisfied /; /fr Très Insatisfait /;,
/en Very Satisfied /; /fr Très Satisfait  /;,
/en Unsure /; /fr Incertain /;

Q: 
/en e. The room structure /;
/fr La structure de la salle /;
/scale1to5
/en Very Dissatisfied /; /fr Très Insatisfait /;,
/en Very Satisfied /; /fr Très Satisfait  /;,
/en Unsure /; /fr Incertain /;

Q: 
/en Would you say that your expectations of the course were /;
/fr Diriez-vous que vos attentes à l'égard du cours ont été /;
/dropdown
/en Exceeded /; /fr Surpassées /;
/en Met /; /fr Rencontrées /;
/en Not met /; /fr Pas rencontrées  /;
/en Unsure /; /fr Incertain /;
;

Q:
/en What were the key things that you learned in this course?  /;
/fr Quelles sont les principales choses que vous avez apprises dans ce cours ? /;
/open

Q:
/en Is there anything you learned in this course that you might apply to the way you work now? If yes, please tell us what you will do, or how you will think, differently in your work.  /;
/fr  Y a-t-il quelque chose que vous avez appris dans ce cours que vous pourriez appliquer à votre façon de travailler présentement ? Si oui, veuillez nous dire ce que vous ferez, ou comment vous penserez différemment dans votre travail.  /;
/open

Q:
/en What barriers/challenges do you foresee in implementing what you learned in your work? /;
/fr Quels obstacles/défis prévoyez-vous dans votre travail pour la mise en œuvre de ce que vous avez appris? /;
/open

Q: 
/en How likely are you to recommend the Discover Digital course to a colleague? /;
/fr Dans quelle mesure êtes-vous susceptible de recommander le cours Découvrez le numérique à un collègue ? /;
/dropdown
/en Likely /; /fr Très Probable /;
/en Somewhat Likely /; /fr Probable /;
/en Somewhat Unlikely/; /fr Possiblement /;
/en Unlikely/; /fr Peu Probable /;
/en Unsure/; /fr Incertain  /;
;

Q:
/en What would you recommend we add and/or change about the course? /;
/fr  Que recommanderiez-vous que nous ajoutions et/ou changions dans le cours ? /;
/open
 `;
// joe bonamassa riding withe the king