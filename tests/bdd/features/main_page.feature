Feature: Main page behavior
    Scenario: Test the main page 
        Given I navigate to survey with id "ut1_june18_event"
        Then I expect that the title is "Evalhalla - Surveys and Evaluations done right | Enquêtes et évaluations bien faites" 
        And I expect a button with text "ENGLISH"