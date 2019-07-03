Feature: Survey provision
	
	The CSPS-EFPC has many questions that can only be answered by the people who attend
    Its courses and events. In order to get the best data possible we must survey the
    Attendees. The attendees who respond to our surveys are our respondents. 

    Scenario: Answering the survey questions

        Given I have started a survey
        And I answer to all questions
        When I submit my answers
        Then I should see "Thank you for taking the time" text

