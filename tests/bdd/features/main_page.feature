Feature:  Language selection

    Because Canadian government application need to be bilingual
	we need to ensure that the respondent can select a language immediately
    it’s also considered best in class to allow the respondent 
    to change language after having set it without having to lose their place
    or in the case of surveys their data entered

    Scenario: Setting respondent language
        Given I navigate to survey with id "TEST_SUR"
        Then I expect that the title is "Evalhalla - Surveys and Evaluations done right | Sondage et évaluations bien faites" 
        And I expect a button with text "English"