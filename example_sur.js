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

Q: 1.Please rate your overall satisfaction or dissatisfaction with this learning
activity, on a scale of 1 to 10
where 1 is very dissatisfied and 10 is very satisfied.
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 2.Why did you give that score?
/OPEN

// Please rate your satisfaction or dissatisfaction with the following components of
this learning activity,
on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied.

/RAND
Q: 3.The level of detail of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 4.The quality of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 5.The language quality(English and French)of the materials
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 6.The overall quality of the instructor/facilitator
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: 7.The subject matter knowledge of the instructor/facilitator
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

Q: 9.Before this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure

Q: 10.After this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure

Q: 11.Would you say that your expectations were exceeded, met or not met?
/ONE
Exceeded...1
Met...2
Not met...3
Unsure...77
;

Q: 12.Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this
learning activity to a
colleage?
/ONE
Likely...1
Somewhat likely...2
Somewhat unlikely...3
Unlikely...4
Unsure...77
;

Q: 13.Do you have any comments you would like to share aboutthe
facilitator(s)/instructor(s)? For privacy
reasons, please do not use facilitator / instructor names in your comments.
/OPEN

Q: 14.Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your
learning?
/ONE
Yes...1 (CONTINUE TO Q15)
No...2 (SKIP TO Q19)
;

// Were the following tools valuable, somewhat valuable, somewhat not valuable or not
valuable in terms of
contributing to your learning?

/RAND

Q: 15.Videos
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 16.Blogs
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 17.Forums
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 18.Job aids
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
Q: 19.Please rank why you took this learning activity where 1 is the most important
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

Q: 20.This learning activity as a valuableuse of my time.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 21.The relevance of the learning activity to my job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 22.The learning activity contributing to my performance on the job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 23.Applying what I have learned to my job.
/SCALE Very negative impression, Very positive impression, Unsure

;RAND

Q: 24.Are there any other comments you would like to share in order to help the CSPS
improve? For privacy
reasons, please do not use instructor/facilitator names in your comments.
/OPEN

// Thank you for sharing your views
`;
var example_nanos_paged = `# 2019-1317
## Classroom Learning Activity Evaluation Questionnaire
### This questionnaire is designed to assess the quality of your learning experience with
the Canada School of
Public Service.
Together, learners, the School and departments, can work towards building a stronger government
wide learning culture.

This information is being collected under the authority of paragraph 4(f) of the Canada School
of Public Service Act and
will be stored in the School’s evaluation system.
Please note that your personal information will remain confidential and is protected under the
Privacy Act. For more
information, refer to the School's Privacy Notice.
/pagebreak
Q: Please rate your overall satisfaction or dissatisfaction with this learning
activity, on a scale of 1 to 10
where 1 is very dissatisfied and 10 is very satisfied.
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: Why did you give that score?
/OPEN
/pagebreak
// Please rate your satisfaction or dissatisfaction with the following components of
this learning activity,
on a scale of 1 to 10 where 1 is very dissatisfied and 10 is very satisfied.

/RAND
Q: The level of detail of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: The quality of the content
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: The language quality(English and French)of the materials
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: The overall quality of the instructor/facilitator
/SCALE Very dissatisfied, Very satisfied, Unsure

Q: The subject matter knowledge of the instructor/facilitator
/SCALE Very dissatisfied, Very satisfied, Unsure
;RAND
/pagebreak
Q: Would you say that the instructor/facilitator spent too much, the right amount or
not enough time covering
the content of the learning activity.
/ONE
Too much time...1
The right amount of time...2
Not enough time...3
Unsure...4
;
/pagebreak
// Please rate your level of knowledge of the subject areaon a scalefrom 1 to 10,
where 1 is very low level
of knowledge in the subject area and 10 is a very high level of knowledge in the subject area.

Q: 9.Before this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure

Q: 10.After this learning activity
/SCALE Low level of knowledge, High level of knowledge, Unsure
/pagebreak
Q: 11.Would you say that your expectations were exceeded, met or not met?
/ONE
Exceeded...1
Met...2
Not met...3
Unsure...77
;

Q: 12.Are you likely, somewhat likely, somewhat unlikely or unlikely to recommend this
learning activity to a
colleage?
/ONE
Likely...1
Somewhat likely...2
Somewhat unlikely...3
Unlikely...4
Unsure...77
;
/pagebreak
Q: 13.Do you have any comments you would like to share aboutthe
facilitator(s)/instructor(s)? For privacy
reasons, please do not use facilitator / instructor names in your comments.
/OPEN
/pagebreak
Q: 14.Did you use any tools (e.g. blogs, videos, etc.) from GCcampus to complement your
learning?
/ONE
Yes...1 (CONTINUE TO Q15)
No...2 (SKIP TO Q19)
;
/pagebreak
// Were the following tools valuable, somewhat valuable, somewhat not valuable or not
valuable in terms of
contributing to your learning?

/RAND

Q: 15.Videos
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 16.Blogs
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 17.Forums
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

Q: 18.Job aids
/ONE
Valuable...1
Somewhat valuable...2
Somewhat not valuable...3
Not valuable...4
Did not use tool...5
Unsure...77
;

;RAND
/pagebreak
/RANDO
Q: 19.Please rank why you took this learning activity where 1 is the most important
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
/pagebreak
// Reflecting on the learning activity, please rate the following statements,where 1
is a very negative
impression and 10 is a very positive impression in terms of your impression of the experience
and potential impact, if
any, of the learning activity.

/RAND

Q: 20.This learning activity as a valuableuse of my time.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 21.The relevance of the learning activity to my job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 22.The learning activity contributing to my performance on the job.
/SCALE Very negative impression, Very positive impression, Unsure

Q: 23.Applying what I have learned to my job.
/SCALE Very negative impression, Very positive impression, Unsure

;RAND
/pagebreak
Q: 24.Are there any other comments you would like to share in order to help the CSPS
improve? For privacy
reasons, please do not use instructor/facilitator names in your comments.
/OPEN
/pagebreak
// Thank you for sharing your views
`;