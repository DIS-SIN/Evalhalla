# Evalhalla. Forms that function. Simply.

Evalhalla - and experiment in making form generation easy as writing an email.

# General Information

A little bit of HTML, JS, and CSS. Nice styles by Materialize. Horsepower thanks to standing on the shoulders of giants.

See it in action: COMING SOON

# Getting it Running

Here's a sample survey script, it's not a real one yet, but you can get the general idea of how you'd use it to build a "real world" survey. This "Evalese" script is consumed by the "Evalese" interpreter to product HTML and JSON representations of the form. With a little bit of API and some JSON you can get everything working.

```bash
# TEST_SUR

##
/en Evalhalla /;
/fr Evalhalla /;

###
/en Thank you for taking part in this survey. The results of this survey will be used to demonstrate how Evalhalla can be used to quickly collect valuable data and provide instant access to survey results through a real-time dashboard for immediate consumption. <br>
<br>
Please take a few minutes to answer the following questions. /; 
/fr Merci de participer à cette sondage. Les résultats de cette sondage serviront à vous montrer comment Evalhalla peut être utilisé pour la collecte rapide des données utiles ainsi que pour fournir un accès instantané aux résultats de sondage via un tableau de bord en temps réel pour une consommation immédiate.<br>
<br>
Veuillez prendre quelques minutes pour répondre aux questions suivantes. /;

/NOTOMBSTONEPAGE

/NOOFFERINGPAGE

/pagebreak 

//
/en Tell us a little about yourself. /;
/fr Dites nous un peu à votre sujet /;

Q: 
/en What is your first official language? /; 
/fr Quelle est votre première langue officielle? /;
/language

Q: 
/en Which department do you currently work for? /;
/fr Pour quel ministère travaillez-vous actuellement? /;
/department

Q: 
/en What is your classification (group and level)? /;
/fr Quelle est votre classification (groupe et niveau)? /;
/classification

*Q: 
/en What is the highest degree or level of school you have completed? /;
/fr Quel est le degré ou le niveau d'études le plus élevé que vous avez complété? /;
/dropdown
/en No certificate, diploma or degree /; /fr Aucun certificat, diplôme ou degré /;
/en Secondary (high) school diploma or equivalency certificate /; /fr Diplôme d'études secondaires ou attestation d'équivalence /;
/en Apprenticeship or trades certificate or diploma /; /fr Certificat ou diplôme d'apprenti ou d'une école de métiers /;
/en College, CEGEP or other non-university certificate or diploma /; /fr Certificat ou diplôme d'un collège, d'un cégep ou d'un autre établissement non universitaire /;
/en University certificate or diploma below bachelor level /; /fr Certificat ou diplôme universitaire inférieur au baccalauréat /;
/en University certificate, diploma or degree at bachelor level or above /; /fr Certificat, diplôme ou grade universitaire au niveau du baccalauréat ou supérieur /;
;

*Q:
/en During which month of the year are you most likely to participate in work learning activities? /;
/fr Au cours de quel mois de l'année êtes-vous le plus susceptible de participer à des activités d'apprentissage professionnel? /;
/dropdown
/en January /; /fr Janvier /;
/en February /; /fr Février /;
/en March /; /fr Mars /;
/en April /; /fr Avril /;
/en May /; /fr Mai /;
/en June /; /fr Juin /;
/en July /; /fr Juillet /;
/en August /; /fr Août /;
/en September /; /fr Septembre /;
/en October /; /fr Octobre /;
/en November /; /fr Novembre /;
/en December /; /fr Decembre /;
/en None /; /fr Aucun /;
;

*Q:
/en What is your preferred method of learning? /;
/fr Quelle est votre méthode d'apprentissage préférée? /;
/any
/en Online /; /fr En ligne /;
/en In-class /; /fr En cours /;
/en Web conference /; /fr Conférence Web /;
/en Documentation /; /fr Documentation /;
/en Webcast /; /fr Webcast /;
/en Virtual classroom /; /fr Classe virtuelle /;
/en Learning events /; /fr Événements d’apprentissage /;
/en Other /; /fr Autre /;
; 

/pagebreak

//
/en Tell us about your overall impressions about the Evalhalla evaluation tool? /;
/fr Dites nous au sujet de vos impréssions générales de l’outil d’évaluation Evalhalla /;

*Q:
/en What are your overall impressions about Evalhalla? /;
/fr Quelles sont vos impressions générales sur Evalhalla? /;
/open

*Q:
/en In your opinion, what are the most useful features of Evalhalla? /; 
/fr A votre avis, quelles sont les fonctionnalités les plus utiles d'Evalhalla? /; 
/any
/en Survey designer tool /; /fr Outil de conception du sondage /;
/en Survey preview, while designing the survey /; /fr Aperçu du sondage, lors de la conception du sondage /;
/en Ease of filling out the survey /; /fr Facilité à remplir du sondage /;
/en Instant access to real-time dashboards /; /fr Accès instantané aux tableaux de bord en temps réel /;
/en Overall look and feel /; /fr Apparence générale /;
/en Overall user experience /; /fr Expérience globale de l'utilisateur /;
/en None /; /fr Auncune /;
; 

Q:
/en What would you like to see changed or improved in Evalhalla? /;
/fr Qu'aimeriez-vous voir changé ou amélioré dans Evalhalla? /;
/open

*Q:
/en Based on the demo you saw today, does it look easy to create surveys using Evalhalla? /;
/fr D'après la demo que vous avez vue aujourd'hui, semble-t-il facile de créer des sondage à l'aide d'Evalhalla? /;
/one
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
/en Unsure /; /fr Incertain /;
;

*Q:
/en Overall, Evalhalla meets my expectations and needs for a course and event evaluation tool. /;
/fr Dans l’ensemble, Evalhalla répond à mes attentes et à mes besoins en matière d’outil d’évaluation de cours et d’événement. /;
/one
/en Strongly agree /; /fr Tout à fait d'accord /;
/en Agree /; /fr D'accord /;
/en Neither agree nor disagree /; /fr Ni d’accord ou ni en désaccord /;
/en Disagree /; /fr Désaccord /;
/en Strongly disagree /; /fr Pas du tout d’accord /;
;

*Q:
/en On a scale from 1 (not at all likely) to 10 (extremely likely), how likely would you recommend Evalhalla to others? /;
/fr Sur une échelle de 1 (pas du tout probable) à 10 (extrêmement probable), dans quelle mesure recommanderiez-vous Evalhalla à d'autres? /;
/scale 
/en Not at all likely /; /fr Pas du tout probable /; , 
/en Extremely likely /; /fr Extrêmement probable /; , 
/en Unsure /; /fr Incertain /;

/pagebreak

//
/en Tell us about your overall impressions of today’s presentation and demo. /;
/fr Dites-nous au sujet de vos impressions générales sur la présentation et la démo d’aujourd’hui. /;

*Q:
/en Overall, how satisfied are you with the presentation? /;
/fr Globalement, dans quelle mesure êtes-vous satisfait de la présentation? /;
/one
/en Very satisfied /; /fr Très satisfait /;
/en Satisfied /; /fr Satisfait /;
/en Neither satisfied nor dissatisfied /; /fr Ni satisfait ni insatisfait /;
/en Somewhat dissatisfied /; /fr Quelque peu insatisfait /;
/en Very dissatisfied /; /fr Très insatisfait /;
;

*Q:
/en How satisfied are you with the presentation and demo delivery method? /;
/fr Dans quelle mesure êtes-vous satisfait de la méthode de présentation et de démo? /;
/one
/en Very satisfied /; /fr Très satisfait /;
/en Satisfied /; /fr Satisfait /;
/en Neither satisfied nor dissatisfied /; /fr Ni satisfait ni insatisfait /;
/en Somewhat dissatisfied /; /fr Quelque peu insatisfait /;
/en Very dissatisfied /; /fr Très insatisfait /;
;

Q:
/en Is there anything else you would like to share about the presentation, demo or Evalhalla? /;
/fr Y a-t-il autre chose que vous voudriez partager au sujet de la présentation, de la démo ou d'Evalhalla? /;
/open
```

You can also add some preprocessing commands to turn off some of our pre-canned pages

```bash
/NOOFFERINGPAGE

/NOTOMBSTONEPAGE
```

# Notes

This is only aimed to serve as a proof of concept. Alpha technology. Expect changes.