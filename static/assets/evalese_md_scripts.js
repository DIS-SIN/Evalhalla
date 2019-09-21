let g_intro_script = "" +
    "# 123\n\n" +
    "##\n/en Evalhalla Survey /;\n/fr Sondage Evalhalla /; \n\n" +
    "###\n/en It's easy to make a survey. /;\n/fr Il est facile de faire une sondage. /; \n" +
    "\n" +
    "*Q:\n/en Have you clicked on 'tutorial' yet? /;\n/fr Avez-vous déjà cliqué sur 'tutorial'? /; \n" +
    "/ONE\n" +
    "/en Yes /; /fr Oui /; \n" +
    "/en No /; /fr Non /; \n" +
    ";\n\n" +
    "/pagebreak\n\n" +
    "Q: Generic Info Stuff (autofilled)\n" +
    "/generics\n" +
    "\n" +
    "// /en Thanks /; /fr Merci /; \n" +
    "";

let g_intro_script_fr = "" +
    "# 123\n" +
    "## /en Evalhalla Survey /; /fr Sondage Evalhalla /; \n" +
    "### /en It's easy to make a survey. /; /fr Il est facile de faire une sondage. /; \n" +
    "\n" +
    "Q: /en Have you clicked on 'tutorial' yet? /; /fr Avez-vous déjà cliqué sur 'tutorial'? /; \n" +
    "/ONE\n" +
    "/en Yes/;  /fr Oui /; \n" +
    "/en No/;  /fr Non /; \n" +
    ";\n" +
    "\n" +
    "// /en Thanks /; /fr Merci /; \n" +
    "";

const g_tutorial_script = "" +
    "[SURVEY] 1234 \n" +
    "[TITLE] This is my title \n" +
    "[INTRO] This is a cool survey, you should fill it out. \n" +
    "\n" +
    "[QUESTION] How about them apples \n" +
    "[PICKONE] \n" +
    "Red \n" +
    "Green \n" +
    "Gala \n" +
    "[END] \n" +
    "\n" +
    "[QUESTION] How cool was that ? \n" +
    "[SCALE] Meh, Cool! , Unsure \n" +
    "\n" +
    "[INSTRUCTION] 3 is good 1 is bad \n" +
    "[QUESTION] Rate the following from 1 to 3 \n" +
    "[RATE] \n" +
    "Apples \n" +
    "Oranges \n" +
    "[END] \n" +
    "\n" +
    "[QUESTION] Ok, you in right ? \n" +
    "[PICKANY] \n" +
    "Yes \n" +
    "YUSSSS \n" +
    "OMG \n" +
    "[END] \n" +
    "\n" +
    "[QUESTION] Parting thoughts ? \n" +
    "[OPEN] \n" +
    "\n" +
    "[INSTRUCTION] Thank you!\n";

var g_shorthand_script = `

# DEMO

##
/en Evalhalla /;
/fr Evalhalla /;

###
/en Thank you for taking part in this survey. /; 
/fr Merci de participer à cette sondage. /;

*Q:
/en Are you here in person? /;
/fr Êtes-vous ici en personne? /;
/one
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
;

/pagebreak

*Q:
/en Overall, how satisfied were you with this presentation? /;
/fr Dans l’ensemble, à quel point êtes-vous satisfait(e) de cette présentation? /;
/scale1to5 
/en Very dissatisfied /; /fr Très insatisfait /;,
/en Very satisfied /; /fr Très satisfait /;,
/en Unsure /; /fr Incertain /;

Q:
/en Any other thoughts? /;
/fr D'autres pensées? /;
/open

/NOOFFERINGPAGE

`;
/*
"" +
    "# 1234 \n" +
    "## This is my title \n" +
    "### This is a cool survey, you should fill it out. \n" +
    "\n" +
    "Q: How about them apples \n" +
    "/ONE \n" +
    "Red \n" +
    "Green \n" +
    "Gala \n" +
    "; \n" +
    "\n" +
    "Q: How cool was that ? \n" +
    "/SCALE Meh, Cool! , Unsure \n" +
    "\n" +
    "// 3 is good 1 is bad \n" +
    "Q: Rate the following from 1 to 3 \n" +
    "/RATE \n" +
    "Apples \n" +
    "Oranges \n" +
    "; \n" +
    "\n" +
    "Q: Ok, you in right ? \n" +
    "/ANY \n" +
    "Yes \n" +
    "YUSSSS \n" +
    "OMG \n" +
    "; \n" +
    "\n" +
    "Q: Parting thoughts ? \n" +
    "/OPEN \n" +
    "\n" +
    "// Thank you!\n" +
    "";
*/
var g_shorthand_script_fr = g_shorthand_script;
/*"" +
    "# 1234\n" +
    "## c'est mon titre\n" +
    "### Ceci est une bonne sondage, vous devriez le remplir.\n" +
    "\n" +
    "Q: Et les pommes\n" +
    "/UN\n" +
    "rouge\n" +
    "vert\n" +
    "Gala\n" +
    "; \n" +
    "\n" +
    "Q: Comment était-ce cool?\n" +
    "/ÉCHELLE Meh, Cool! , Incertain\n" +
    "\n" +
    "// 3 est bon 1 est mauvais\n" +
    "Q: Évaluez ce qui suit de 1 à 3\n" +
    "/TAUX\n" +
    "Pommes\n" +
    "Des oranges\n" +
    "; \n" +
    "\n" +
    "Q: Ok, vous avez raison?\n" +
    "/TOUT\n" +
    "Oui\n" +
    "YUSSSS\n" +
    "OMG\n" +
    "; \n" +
    "\n" +
    "Q: pensées de séparation?\n" +
    "/OUVRIR\n" +
    "\n" +
    "// Merci!\n" +
    "";
    */