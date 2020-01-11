# Evalhalla. Forms that function. Simply.

Evalhalla - an experiment in making form generation easy as writing an email.

# General Information

A little bit of HTML, JS, and CSS. Nice styles by Materialize. Horsepower thanks to standing on the shoulders of giants.

# Getting it Running

## Get the Backend

First thing to do is to head over and get [EvalhallaBackend](https://github.com/DIS-SIN/EvalhallaBackend)

Then follow the instructions there to get it up and running locally. Here's a quick start:

```bash
source .dev.env
export APP_ENV=development
export EVALHALLA_USE_SENTIMENT=False
docker-compose up --build 
```

Note, this will use PyPi, so if for some reason the network you're on blocks traffic here, you'll need to connect to a
network that doesnt. 

Once it builds and fires up you should be able to hit the following URLS. Let's assume our survey id is `MY_UNIQUE_SURVEY_ID`

```bash
# For the Evalese template of TEST_SUR
http://localhost:5000/evalese/MY_UNIQUE_SURVEY_ID
# For the Responses of TEST_SUR
http://localhost:5000/responses/MY_UNIQUE_SURVEY_ID
```

Great. Now the backend is working. Time to get the frontend working.

## Get the Frontend

Clone this repository and then get started. By default it's wired for production, you'll need to make a minor modification
to point it at the local dockers.

In `Evalhalla/integrations/cortex/cortex-functions.js` update the following:

```bash
// original prod backend connection
_C.connectedBackend = backendUrl;

// change the above to use the dev version of the url:
_C.connectedBackend = backendUrlDev;
```

That's all you'll need to update, but be sure to revert if you're deploying to production.

Now let's go ahead and build and run the front end. 

We've tried to group features together so you can turn them on and off with minimal refactoring, and to bundle them together we're using the [Closure Compiler](https://developers.google.com/closure/compiler/docs/gettingstarted_app). Go there and download the tool then update the path to the compiler in `static/dist/evh_compile.sh`. Look for the variable `CMP_JAR` in the script and change it to point at where you have your jar file. Ours is currently set here:

```bash
~/Development/closure-compiler/closure-compiler.jar
```

Once you have the compiler in place we can go ahead and bundle everything up. The compiler will produce `*_dist.js` files in the `static/dist/` folder which the HTML templates `/app` use to run everything. 

```bash
# closure compiler crunches everything together
sh static/dist/evh_compile.sh all
# build the docker wonders this will produce an ID like "84e0498d5272" you can then run 
docker build .
# the command above will output something like "Successfully built 84e0498d5272"
# run the image
docker run -p 8000:80 84e0498d5272
```

There wont be logging that indicates it's running, but if nothing errors out you should be able to go to the following
URLs to start everything up

```bash
# The survey builder/editor
http://localhost:8000/app/designer/basic/?sur=MY_UNIQUE_SURVEY_ID

# The Survey App
http://localhost:8000/app/player/survey/?sur=MY_UNIQUE_SURVEY_ID

# The Survey Dashboard
http://localhost:8000/app/player/dashboard/?sur=MY_UNIQUE_SURVEY_ID

# The QR Code Generator (note it will go to the prod version not dev)
http://localhost:8000/app/player/qrs/?sur=MY_UNIQUE_SURVEY_ID

# The Survey Data Table
http://localhost:8000/app/player/tableview/?sur=MY_UNIQUE_SURVEY_ID

```

## Make a survey!

Load up the designer from the `http://localhost:8000/app/designer/basic/` URL. You'll be prompted for an ID. Enter something like
`My unique survey id` this will become `MY_UNIQUE_SURVEY_ID` automatically.

*Note* Please dont use IE, it just doesn't work right reliably. Chrome or Firefox are your friends. Edge works most of the time, but we have run into weird edge cases (pun not intended). Mobile phones also work great.

Here's a sample "Evalese" (modified markdown) survey script - should give the general idea of how you'd use it to build a "real world" survey. This "Evalese" script is consumed by the "Evalese" interpreter to product HTML and JSON representations of the form. With a little bit of API and some JSON you can get everything working.

*note* The first line of any Evalhalla survey references the unique survey ID in this case by using the `# MY_UNIQUE_SURVEY_ID` command if your survey ID was instead `FISH` you'd have `# FISH` as the first line of your Evalese. The URL you'd visit would also have this ID defined like `http://localhost:8000/app/designer/basic/?sur=FISH`

```bash
# MY_UNIQUE_SURVEY_ID

##
/en Evalhalla /;
/fr Evalhalla /;

###
/en Thank you for taking part in this survey. /; 
/fr Merci de participer à cette sondage. /;

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

You can also add some preprocessing commands to turn on some of our pre-canned pages. These should appear after the `###` part of the evalese (before your first Q:)

```bash
/OFFERINGPAGE

/TOMBSTONEPAGE
```

Once you've put your Evalese in the editor, it's time to publish. You will need an `EDIT PIN`. Right now, we're keeping the pool of editors small while we test out our ideas and see what works with real users, once everything is baked we hope to enable others to replicate it for themselves. 

Let's say the edit pin was `ABC123` (it isn't, but examples and all that)

Open the edit pin entry by using the top menu of the designer to toggle the storage screen
```bash
View > Storage
```

Enter `ABC123` into the field. Then untoggle the storage screen (same menu action again):

```bash
View > Storage
```

Now you're ready to publish. Using the top menu:

```bash
Menu > Publish
```

This will push the evalese into the backend and create a QR code (note: it's wired for the production verion), so to least locally you'll need to use the local urls as stated above. That's it. It's ready to use.

Now load the survey
```bash
http://localhost:8000/app/player/survey/?sur=MY_UNIQUE_SURVEY_ID
```

Great. It loaded. enter some values, and then submit the response. Awesome. Now let's see the results

```bash
http://localhost:8000/app/player/dashboard/?sur=MY_UNIQUE_SURVEY_ID
```

There we have the results. It should look sweet. Enjoy the fruits of your labors.

# Notes

This is only aimed to serve as a proof of concept. POC Alpha technology. Expect changes.

The code base here has had many different experimental features added and removed over the course of iterating on it, so we don't recommend using this as your production starting point (our suggestion is to base it on a collection of microservices that provide profile, user auth, and leverage some kind of graph enabled backend like Prisma to really capitalize on the potential.) 

The goal here is to answer questions like "do users want dashboards that build themselves", "will users write in markdown",
"is there value in being able to build a survey, dash, and app without having to code".

Experiment early. Correct often. Listen to your users more than you listen to yourself.
