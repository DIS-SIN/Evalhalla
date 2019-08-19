// Generic Test Survey
var test_sur = `# TEST-007 

##
/en Test Survey /;
/fr Enquête Test /;

### 
/en User Experience check-in.<br /><br />This 1 min assessment will help us get better. /; 
/fr Enregistrement de l'expérience utilisateur.<br /><br />Cette évaluation, qui vous prendra de 1 minutes, nous aidera en améliorer. /;

/NOTOMBSTONEPAGE

/NOOFFERINGPAGE

//
/en Please let us know about your experience so far /; 
/fr Veuillez nous faire part de votre expérience  jusqu'à présent /; 

Q: Offering
/offering

Q: Department
/department

Q: Lang
/language

Q: class
/classification

Q: loc
/location

/pagebreak 

Q:
/en Drop this? /;
/fr Voulez-vous nous dire pourquoi /;
/dropdown
/en This /; /fr Un chose /;
/en This /; /fr Un chose /;
/en This /; /fr Un chose /;
;

Q:
/en If you had to rate this episode from 1 (Bad) to 5 (Awesome) what would you give it? /;
/fr Si vous deviez évaluer cet épisode de 1 (mauvais) à 5 (génial), que lui donneriez-vous? /;
/scale1-5 /en Bad /; /fr Mauvais /; , /en Awesome /; /fr Génial /; , /en Unsure /; /fr Incertain /;

Q:
/en If you had to rate this episode from 1 (Bad) to 10 (Awesome) what would you give it? /;
/fr Si vous deviez évaluer cet épisode de 1 (mauvais) à 10 (génial), que lui donneriez-vous? /;
/scale /en Bad /; /fr Mauvais /; , /en Awesome /; /fr Génial /; , /en Unsure /; /fr Incertain /;

Q:
/en Want to tell us why? /;
/fr Voulez-vous nous dire pourquoi /;
/open

/pagebreak

Q: 
/en Would you come back for the next episode? /;
/fr Reviendriez-vous pour le prochain épisode /;
/one
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
/en Unsure /; /fr Incertain /;
;

Q: 
/en Would you come back for the next episode? /;
/fr Reviendriez-vous pour le prochain épisode /;
/any
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
/en Unsure /; /fr Incertain /;
;


// /en Thank you /; /fr Merci! /;

`;