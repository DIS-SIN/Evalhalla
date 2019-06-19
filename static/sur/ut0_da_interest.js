var ut0_da_interest = `# UT0-DA
## DevOps Skills and Learning
### This 5-10 min assessment will help us design and deliver supports for the GoC DevOps community.\n\nWe may use the results of this assessment in aggregate(without individual attribution) to help the Digital Academy and other learning partners plan and develop learning products.
*Q: Are you a regional employee?
/one
Yes
No
;

// Please rank your knowledge of the following 10 devops competencies on a scale of 0-5 
<ul>
<li>0 - I don’t understand or do not yet possess this competence</li>
<li>1 - Novice: I have a basic understanding of this competence</li>
<li>2 - Advanced beginner: I can demonstrate this competence under supervision</li>
<li>3 - Competent: I can demonstrate this competence independently</li>
<li>4 - Proficient: I can mentor other people in this competence</li>
<li>5 - Expert: I develop new ways of applying this competence</li>
</ul>

*Q: Agile software development process
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Web accessibility (a11Y) testing
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Contributing to open source projects
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Publishing open source software
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Open source software legal compliance
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Python coding
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Cloud computing
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Continuous integration and continuous delivery
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Docker (Containerization)
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Security automation
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Test automation
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Linux command Line
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

/pagebreak

// Provide additional context for your skills

*Q: Applying DevOps in the government context 
/one
0 - No Competency
1 - Novice
2 - Advanced Beginner
3 - Competent
4 - Proficient
5 - Expert
;

*Q: Which of these tools are you competent at using?
/any
Git Command Line Interface
GitHub
GitLab
Bitbucket
Visual Studio Code
Anaconda
Jenkins
AWS cloud
Azure cloud
Node
;

*Q: Are there any other devops tools and tech that you are competent at using? Includes tools an tech you are comfortable using at levels 3-5 (competent, proficient or an expert level)
/open

*Q: How did you acquire most of your existing programming skills? Select all options that apply
/any
On my own initiative
On the job
Through formal education
;

/pagebreak

// Tell us about how you learn

*Q: What resources do you use today to learn new about DevOps?
/any
Podcasts
Videos
Classroom
Online courses
Peers
Workshops and conferences
;

*Q: How do you prefer to learn?
/open

/pagebreak

// Would you like to connect with the Digital Academy?

Q: Would you like to contribute to the Digital Academy?
/any
Participate in future learning opportunities
Help us design content and delivery training
Provide us advice on leading DevOps practices
Be a digital coach for others on their DevOps journey
;

Q: Please provide any other comments 
/open
`;



/*
    "\n" +
    "// On a scale from 1-5 where 1 is Not Relevant and 5 is Very Relevant\n" +
    "\n" +
    "*Q: Cloud (AWS, Azure) \n" +
    "/scale1-5 Not Relevant / Pas pertinent, Very Relevant / Très pertinent, Unsure / Incertain\n" +
    "\n" +
    "Q: Python\n" +
    "/scale1-5 Not Relevant / Pas pertinent, Very Relevant / Très pertinent, Unsure / Incertain\n" +
    "\n" +
    "Q: Continuous Integration / Continuous Delivery\n" +
    "/scale1-5 Not Relevant / Pas pertinent, Very Relevant / Très pertinent, Unsure / Incertain\n" +
    "\n" +
    "Q: Open Source\n" +
    "/scale1-5 Not Relevant / Pas pertinent, Very Relevant / Très pertinent, Unsure / Incertain\n" +
    "\n" +
    "*Q: Cloud Native Development\n" +
    "/scale1-5 Not Relevant / Pas pertinent, Very Relevant / Très pertinent, Unsure / Incertain\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "Q: What skills would you like to learn?\n" +
    "/any\n" +
    "Cybersecurity\n" +
    "People Skills / 'Soft Skills'\n" +
    "Advanced Cloud Computing/Cloud Native Engineering\n" +
    ";\n" +
    "\n" +
    "*Q: What resources do you use today to learn new technology?\n" +
    "/any\n" +
    "Podcasts\n" +
    "Books\n" +
    "Colleagues/Other professionals\n" +
    "YouTube\n" +
    "Classroom training\n" +
    ";\n" +
    "\n" +
    "Q: Other:\n" +
    "/open\n" +
    "\n" +
    "Q: How do you prefer to learn?\n" +
    "/any\n" +
    "Classroom\n" +
    "Online/YouTube/On-Demand\n" +
    "Blend of each\n" +
    ";\n" +
    "\n" +
    "Q: Other:\n" +
    "/open\n" +
    "\n" +
    "/pagebreak\n" +
    "\n" +
    "*Q: Would you like to contribute to the Digital Academy?\n" +
    "/any\n" +
    "Instructor\n" +
    "Fellow\n" +
    ";\n" +
    "\n" +
    "Q: Other:\n" +
    "/open\n" +
    "\n" +
    "Q: Are you interested in training with the Digital Academy?\n" +
    "/one\n" +
    "Yes\n" +
    "No\n" +
    "Maybe\n" +
    ";\n" +
    "\n" +
    "*Q: Are you a regional employee?\n" +
    "/one\n" +
    "Yes\n" +
    "No\n" +
    ";\n" +
    "";
    */