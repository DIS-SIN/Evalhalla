var tsq = `
# 
TSQ1

## 
/en Transferable Skills Questionnaire /;
/fr NEED_TLX Transferable Skills Questionnaire /;

### 
/en Description of the form /;
/fr NEED_TLX  Description of the form /;

// 
/en Privacy details, contact info, etc /;
/fr NEED_TLX Privacy details, contact info, etc /;

Q: 
/en Have you taken a CSPS course in the past two years /;
/en NEED_TLX Have you taken a CSPS course in the past two years /;
/one
/en Yes /; /fr Oui /;
/en No /; /fr Non /;
;

Q: 
/en If yes, which course did you take? /;
/fr NEED_TLX If yes, which course did you take? /;
/open

Q: 
/en How can we help you and your department better receive and.or deliver information? /;
/fr NEED_TLX How can we help you and your department better receive and.or deliver information? /;
/any
/en Course Development /; /fr NEED_TLX Course Development /;
/en Create a collaborate space /; /fr NEED_TLX Create a collaborate space /;
/en Course Facilitate /; /fr NEED_TLX Course Facilitate /;
/en Information Guidance /; /fr NEED_TLX Information Guidance /;
/en Other /; /fr Autres /;
;

Q: 
/en What else can we do to help? /;
/fr NEED_TLX What else can we do to help? /;
/open

/pagebreak

// 
/en Business Acumen: Definitions of the term /;
/fr NEED_TLX Business Acumen: Definitions of the term /;

Q: 
/en In regards to Business Acumen, what subject areas do you most want to learn about? /;
/fr NEED_TLX In regards to Business Acumen, what subject areas do you most want to learn about? /;
/any
/en Planning /; /fr NEED_TLX /;
/en Finance /; /fr NEED_TLX /;
/en Operations /; /fr NEED_TLX /;
/en Strategy /; /fr NEED_TLX /;
/en Integrated Risk Management /; /fr NEED_TLX /;
/en Portfolios /; /fr NEED_TLX /;
/en Alignment Goals /; /fr NEED_TLX /;
/en Utilizing Social Media /; /fr NEED_TLX /;
/en Digital Marketing /; /fr NEED_TLX /;
/en Project Management /; /fr NEED_TLX /;
/en Risk Management  /; /fr NEED_TLX /;
/en Other /; /fr NEED_TLX /;
;

Q: 
/en What other subject areas do you want to learn about? /;
/fr NEED_TLX What other subject areas do you want to learn about? /;
/open

Q: 
/en In regards to Leadership Fundamentals, what subject areas do you most want to learn about? /;
/fr In regards to Leadership Fundamentals, what subject areas do you most want to learn about? /;
/any
/en Leadership Coaching /; /fr NEED_TLX /;
/en Employee Engagement /; /fr NEED_TLX /;
/en Resilience /; /fr NEED_TLX /;
/en Change Management /; /fr NEED_TLX /;
/en Leading Strategically /; /fr NEED_TLX /;
/en Leading Virtual Teams /; /fr NEED_TLX /;
/en Introspective Leadership /; /fr NEED_TLX /;
/en Mental Health Peer Coaching /; /fr NEED_TLX /;
/en Emotional Intelligence /; /fr NEED_TLX /;
/en Other /; /fr NEED_TLX /;
;

Q: 
/en What other leadership fundamentals do you want to learn about? /;
/fr NEED_TLX What other leadership fundamentals do you want to learn about? /;
/open

Q: In regards to Enabling Skills what subject areas do you most want  to learn about?
/any
Behavioral Insights
Briefing
Design Thinking
Engagement
Experimentation
Foresight
Innovation
Partnering
Problem Solving
Story Telling
Facilitation
Systems Thinking
Working in the open
Other
;

Q: What other enabling skills do you want to learn about?
/open

/pagebreak

Q: Select topics that you would like us to prioritized?
/any
Behavioral Insights
Briefing
Design Thinking
Engagement
Experimentation
Foresight
Innovation
Partnering
Problem Solving
Story Telling
Facilitation
Systems Thinking
Working in the open
Leadership Coaching
Employee Engagement
Resilience
Change Management
Leading Strategically
Leading Virtual Teams
Introspective Leadership
Mental Health Peer Coaching
Emotional Intelligence
Planning
Finance
Operations
Strategy
Integrated Risk Management
Portfolios
Alignment Goals
Utilizing Social Media
Digital Marketing
Project Management
Risk Management 
;

/pagebreak

Q: What kind of learner are you?
/any
Visual (Spatial)
Aural (Auditory-Musical)
Verbal (Linguistic)
Physical (Kinesthetic)
Logical (Mathematical)
Social (Interpersonal)
Solitary (Alone)
;

Q: What are you top methods of learning?
/any
Attending a conference
TEDx talks, Podcasts, & Videos
Collaborative/Group Work
Armchair Discussions
In-class Course
Active participation through hands-on training
Self-directed learning, individual worksheets and/or handouts
Other
;

Q: What other methods of learning work best for you?
/open

Q: What challenges do you face in the workplaces in regards to learning?
/any
Time restrictions
Location
Management
Accessibility
Not enough resources
Technology issues
;

/pagebreak

Q: How would you like to receive additional information on out upcoming courses and events?
/any
Subscribe to e-updates
CSPS Newsletter
CSPS Website Posting
Twitter (follow the school on Twitter @School_GC)
Other
;

Q: Is there anything more you would like to share with?
/open


`;

var moonshot = `
# MOON_LUNE

## 
/en Moonshot  Pre-Survey /;
/fr Tir de la lune pré-sondage /;

### 
/en We want to gather some information from you in preparation of the Moonshot event. Please answer the following questions. /;
/fr Nous souhaitons recueillir des informations auprès de vous pour préparer l'événement Moonshot. Merci de répondre aux questions suivantes. /;

Q: 
/en How comfortable are you when dealing with a new problem? /;
/fr Êtes-vous à l'aise face à un nouveau problème? /;
/one
/en Extremely Comfortable /; /fr Extrêmement confortable /; 
/en Very Comfortable /; /fr Très confortable /; 
/en Comfortable /; /fr Confortable /; 
/en Somewhat Comfortable /; /fr Plutôt confortable /; 
/en Not at all Comfortable /; /fr Pas du tout confortable /;
;

Q: 
/en What topics do you want to learn more about? Check all that apply. /;
/fr Sur quels sujets souhaitez-vous en savoir plus? Cochez toutes les cases. /;
/any
/en How to define a problem before trying to solve it /; /fr Comment définir un problème avant d'essayer de le résoudre /;
/en How to prevent jumping to solutions early on /; /fr Comment prévenir le saut aux solutions dès le début /;
/en How to look at a problem from a different perspective /; /fr Comment regarder un problème sous un angle différent /;
/en How to distinguish problem symptoms versus actual problems /; /fr Comment distinguer les symptômes du problème des problèmes réels /;
;

// 
/en Thank you! /;
/fr Merci! /;

`;