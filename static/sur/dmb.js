// DM Breakfast Survey
var dmb = `# DM-B

## 
/en DM Breakfast /;
/fr Petit Dejeuner DM /;

### 
/en Integrative. Instant. Insight. /;
/fr Intégrative. Instant. Perspicacité. /;

//
/en Information becomes available in an instant. /; 
/fr Veuillez nous faire part de votre expérience jusqu'à présent /; 

Q: 
/en What is your first official language? /;
/fr Quelle est votre première langue officielle? /;
/one
/en English /; /fr Anglais /;
/en French /; /fr Français /;
;

Q: 
/en Are you fluent in any non-official languages? /;
/fr Parlez-vous couramment une langue non officielle? /;
/one
/en Yes /; /fr Oui /;
/en No  /; /fr Non /;
;

Q: 
/en What job category did you grow up in before you became an EX? /;
/fr Dans quelle catégorie d'emploi avez-vous grandi avant de devenir un EX? /;
/open

Q: 
/en How many years were you an executive before you became a DM? /;
/fr Combien d'années avez-vous été cadre avant de devenir DM? /;
/one
1-5
5-10
10-15
15+
;

Q: 
/en How many ministers have you had since you have been a DM? /;
/fr Combien de ministres avez-vous eu depuis que vous êtes DM? /;
/scale1-5 , , 5+

Q: 
/en How many clerks have you worked for since you became a DM? /;
/fr Pour combien de commis avez-vous travaillé depuis que vous êtes devenu DM? /;
/scale1-5 , , 5+

Q: 
/en What’s your highest level of education? /;
/fr Quel est votre plus haut niveau d’éducation? /;
/one
/en Secondary /; /fr Secondaire /;
/en Bachelors /; /fr Les bacheliers /;
/en Masters /; /fr Maîtrise /;
/en Doctorate /; /fr Doctorat /;
;

Q: 
/en If you could be DM of any department, what department would it be? /;
/fr Si vous pouviez être sous-ministre d'un ministère, de quel ministère s'agirait-il? /;
/open

Q: 
/en Estimate how many hours a day you work? /;
/fr Estimez combien d'heures par jour vous travaillez? /;
/one
7.5
8-10
11-14
14+
;

/pagebreak

Q: 
/en What do you like to do for fun? /;
/fr Qu'aimez-vous pour vous amuser? /;
/open

Q: 
/en Are you a vegetarian? /;
/fr Êtes-vous végétarien? /;
/one
/en Yes /; /fr Oui /;
/en No  /; /fr Non /;
/en I reduce what I can /; /fr Je réduis ce que je peux /;
;

Q: 
/en Do you have any allergies? /;
/fr As tu des allergies? /;
/one
/en Yes /; /fr Oui /;
/en No  /; /fr Non /;
;

Q: 
/en Do you have children? /;
/fr Avez-vous des enfants? /;
/one
/en Yes /; /fr Oui /;
/en No  /; /fr Non /;
;

Q: 
/en How many? /;
/fr Combien? /;
/scale1-5 , , 5+

Q: 
/en What’s your favorite genre of music? /;
/fr Quel est votre genre de musique préféré? /;
/open

Q: 
/en When do you plan to retire (years until)? /;
/fr Quand comptez-vous prendre votre retraite (années jusqu'à)? /;
/one
2
3-5
10+
/en Not sure /; /fr Pas certain /;
/en Not intending on retiring. Ever. /; /fr Pas l'intention de prendre sa retraite. Déjà. /;
;

Q: 
/en How many books did you read last year? /;
/fr Combien de livres avez-vous lu l'année dernière? /;
/scale , , 10+

Q: 
/en Do you own a cottage? /;
/fr Possédez-vous un chalet? /;
/one
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
;

/en Thank you for your time! /; /fr Merci pour vos réponses! /;

`;

/**



Q:
/en Do you have a 'big picture' of the data at your department /;
/fr Avez-vous une 'grande image' des données dans votre département? /;
/one
/en Yes /; /fr Oui /;
/en A bit /; /fr Un peu /;
/en No /; /fr Non /;
;

Q:
/en Open access to modern tools is essential to transforming how public servants work and serve Canadians. How do you help facilitate this change? /;
/fr Le libre accès aux outils modernes est essentiel pour transformer le mode de fonctionnement et de service des fonctionnaires. Comment aidez-vous à faciliter ce changement? /;
/open

Q:
/en Do you see benefit in actively seeking out and experimenting with new transformative technologies? /;
/fr Voyez-vous un avantage à rechercher activement et à expérimenter de nouvelles technologies de transformation? /;
/one
/en Yes /; /fr Oui /;
/en A bit /; /fr Un peu /;
/en No /; /fr Non /;
;

/pagebreak

//
/en This survey app and dashboard built itself. CSPS DIS developers automated the entire process, now the hard part is what questions to ask in the first place. /;
/fr Cette application et ce tableau de bord ont été conçus de manière autonome. Les développeurs de EFPC SIN ont automatisé l’ensemble du processus. Désormais, le plus difficile est de savoir quelles questions poser en premier. /;

Q:
/en On a scale from 1-5 how ready is your department for disruptive change? /;
/fr Sur une échelle de 1 à 5, dans quelle mesure votre département est-il prêt pour un changement perturbateur? /;
/scale1-5 Not Ready / Pas Prêt, Very Ready / Très Prêt, Unsure / Incertain

Q:
/en What concrete things do we need to be ready for disruptive change? /;
/fr De quelles choses concrètes avons-nous besoin pour être prêts? /;
/open

Q:
/en Other comments /;
/fr Autres commentaires /;
/open

/en Thank you for your time! /; /fr Merci pour vos réponses! /;


 */