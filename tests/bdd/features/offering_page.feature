Feature: Offering selection    

	The CSPS-EFPC has many courses and events that it hosts. In order to ensure we
    Collect the right data we have to determine which event or course the respondent
    Is actually responding to. Depending on the context we may show different surveys
    Based on the offering chosen. 

	Scenario: Setting respondent Offering
        Given I have completed the main page steps
        When I click "English" button
        Then I should be able to see course offering choice text "Please choose your event/course"