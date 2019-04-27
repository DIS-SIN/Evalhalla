# Evalhalla. Forms that function. Simply.

Evalhalla - and experiment in making form generation easy as writing an email.

# General Information

A little bit of HTML, JS, and CSS. Nice styles by Materialize. 

# Getting it Running

This is the shorthand code:

```bash
# 1234 
## This is my title 
### This is a cool survey, you should fill it out. 

Q: How about them apples 
/ONE 
Red 
Green 
Gala 
; 

Q: How cool was that ? 
/SCALE Meh, Cool! , Unsure 

// 3 is good 1 is bad 
Q: Rate the following from 1 to 3 
/RATE 
Apples 
Oranges 
; 

Q: Ok, you in right ? 
/ANY 
Yes 
YUSSSS 
OMG 
; 

Q: Parting thoughts ? 
/OPEN 

// Thank you!
```

These are the commands:

```bash
[SURVEY] 1234
```
Adds a survey ID number

```bash
[TITLE] A title of titles
```
Adds a title

```bash
[INTRO] This is some explanatory text
```
Adds text for form details

```bash
[QUESTION] What is this?
```
Starts a question

```bash
[PICKONE] 
Option
Option
Option
[END]
```
Radio choice

```bash
[PICKANY] 
Option
Option
Option
[END]
```
Checkbox choice

```bash
[RATE] 
Option
Option
Option
[END]
```
Rating choice

```bash
[OPEN]
```
Freetext

```bash
[INSTRUCTION] Explanatory statements
```
Non question explanatory statements

# Notes

This is only aimed to serve as a proof of concept. Alpha technology. Expect changes.