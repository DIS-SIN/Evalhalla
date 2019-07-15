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

Q: What is your first official language?
/one
English
French
;

Q: What job category did you grow up in before you became an EX?
/open

Q: How many years were you an executive before you became a DM?
/one
1-5
5-10
10-15
15+
;

Q: How many ministers have you had since you have been a DM?
/scale1-5 , , More than 5

Q: How many clerks have you worked for since you became a DM?
/scale1-5 , , More than 5

Q: What’s your highest level of education?
/one
Secondary
Bachelors
Masters
Doctorate
;

Q: What do you like for fun?
/open

Q: Are you a vegetarian?
/one
Yes
No
I reduce what I can
;

Q: Do you have any allergies?
/one
Yes
No
;

Q: Are you fluent in any non-official languages?
/one
Yes
No
;

Q: Do you have children?
/one
Yes
No
;

Q: How many?
/scale1-5 , , More than 5

Q: Estimate how many hours a day you work?
/one
7.5
8-10
11-14
14+
;

Q: What’s your favorite genre of music?
/open

Q: If you could be DM of any department, what department would it be?
/open

Q: When do you plan to retire ? 
/one
2 years
3-5 years
10+ years
Not sure
Not intending on retiring. Ever.
;

Q: How many books did you read last year?
/scale , , More than 10

Q: Do you own a cottage?
/one
Yes
No
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