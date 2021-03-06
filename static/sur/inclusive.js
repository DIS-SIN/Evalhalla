// Inclusive Public Service Survey
var inclusive = "# /en IPS-004 /; /fr IPS-004 /;\n" +
    "\n" +
    "##\n" +
    "/en Events Evaluation /;\n" +
    "/fr Évaluation des activités /; \n" +
    "\n" +
    "###\n" +
    "/en Please let us know about your experience at this event /;\n" +
    "/fr Veuillez nous faire part de votre expérience lors de cet événement /; \n" +
    "\n" +
    "*Q:\n" +
    "/en 1. How did you participate in the event? /;\n" +
    "/fr 1. De quelle façon avez-vous participé à l’activité? /; \n" +
    "/ONE\n" +
    "/en In person /; /fr En personne /; \n" +
    "/en Via webcast /; /fr Par webdiffusion /; \n" +
    ";\n" +
    "\n" +
    "*Q: \n" +
    "/en 2. Overall, how satisfied were you with this learning event? Rate your satisfaction on a scale of 1 to 5, with 1 being very unsatisfied and 5 being very satisfied. /;\n" +
    "/fr 2. Dans l’ensemble, à quel point êtes-vous satisfait(e) de cette activité d’apprentissage? Évaluez votre satisfaction sur une échelle de 1 à 5, où 1 correspond à « très insatisfait » et 5 correspond à « très satisfait ». /;\n" +
    "/scale1to5 Very Unsatisfied / Très insatisfait, Very Satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "*Q: \n" +
    "/en 3a. Did this event meet your expectations as it was outlined in the advertisement? /;\n" +
    "/fr 3a. D’après la description de l’annonce, est-ce que cette activité a répondu à vos attentes? /;\n" +
    "/ONE\n" +
    "/en Yes /; /fr Oui /; \n" +
    "/en No /; /fr Non /; \n" +
    ";\n" +
    "\n" +
    "Q: \n" +
    "/en 3b. If no, why not? /;\n" +
    "/fr 3b. Dans la négative, pourquoi? /;\n" +
    "/open\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "*Q:\n" +
    "/en 4a. How satisfied were you with the speaker(s) for this event on a scale of 1 to 5, with 1 being very unsatisfied and 5 being very satisfied. /;\n" +
    "/fr 4a. À quel point êtes-vous satisfait(e) du ou des conférenciers ayant participé à cette activité? Évaluez votre satisfaction sur une échelle de 1 à 5, où 1 correspond à « très insatisfait » et 5 correspond à « très satisfait » /;\n" +
    "/scale1to5 Very Unsatisfied / Très insatisfait, Very Satisfied / Très satisfait, Unsure / Incertain\n" +
    "\n" +
    "Q: \n" +
    "/en 4b. Why did you give the score that you did? /;\n" +
    "/fr 4b. Veuillez justifier votre évaluation. /;\n" +
    "/open\n" +
    "\n" +
    "*Q: \n" +
    "/en 5a. Did you learn something new from this event? /;\n" +
    "/fr 5a. Avez-vous appris quelque chose de nouveau durant cette activité? /;\n" +
    "/ONE\n" +
    "/en I did not learn anything new /; /fr Je n’ai rien appris de nouveau. /;\n" +
    "/en I learned something new. /; /fr J’ai appris quelque chose de nouveau. /;\n" +
    "/en I learned a lot of new things. /; /fr J’ai appris beaucoup de choses. /;\n" +
    ";\n" +
    "\n" +
    "Q: \n" +
    "/en 5b. Please describe what you learned from this event /;\n" +
    "/fr 5b. Veuillez décrire ce que vous avez appris de cet événement? /;\n" +
    "/open\n" +
    "\n" +
    "*Q: \n" +
    "/en 6a. Is there something you can take away from this event that will help you in your job? /;\n" +
    "/fr 6a. Y a-t-il quelque chose que vous pouvez retirer de cette activité et qui vous aidera dans votre travail? /;\n" +
    "/ONE\n" +
    "/en Yes /; /fr Oui /; \n" +
    "/en No /; /fr Non /; \n" +
    ";\n" +
    "\n" +
    "Q: \n" +
    "/en 6b. If yes, what? /;\n" +
    "/fr 6b. Dans l’affirmative, qu’est-ce que c’est? /;\n" +
    "/open\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "*Q: \n" +
    "/en 7a. Would you recommend this event to others? /;\n" +
    "/fr 7a. Recommanderiez-vous cette activité à d’autres personnes? /;\n" +
    "/ONE\n" +
    "/en Yes /; /fr Oui /; \n" +
    "/en No /; /fr Non /; \n" +
    ";\n" +
    "\n" +
    "Q: \n" +
    "/en 7b. Why or why not? /;\n" +
    "/fr 7b. Pourquoi? /;\n" +
    "/open\n" +
    "\n" +
    "Q: \n" +
    "/en 8. Other comments /;\n" +
    "/fr 8. Autres commentaires /;\n" +
    "/open\n" +
    "\n" +
    "*Q:\n" +
    "/en 9a. Please rate your level of knowledge if the subject area. Before this learning activity: /;\n" +
    "/fr 9a. Veuillez évaluer votre niveau de connaissances dans le domaine en question. Avant l’activité d’apprentissage: /;\n" +
    "/ONE\n" +
    "/en High /; /fr Élevé /; \n" +
    "/en Good /; /fr Bon /; \n" +
    "/en Average /; /fr Moyen /; \n" +
    "/en A Little /; /fr Faible /;\n" +
    "/en None /; /fr Nul /; \n" +
    ";\n" +
    "\n" +
    "Q: \n" +
    "/en 9b. Please rate your level of knowledge if the subject area. After this learning activity:  /;\n" +
    "/fr 9b. Veuillez évaluer votre niveau de connaissances dans le domaine en question. Après l’activité d’apprentissage: /;\n" +
    "/ONE\n" +
    "/en High /; /fr Élevé /; \n" +
    "/en Good /; /fr Bon /; \n" +
    "/en Average /; /fr Moyen /; \n" +
    "/en A Little /; /fr Faible /;\n" +
    "/en None /; /fr Nul /; \n" +
    ";\n" +
    "\n" +
    "// /en Thank you for your time! /; /fr Merci pour vos réponses! /;\n" +
    "";