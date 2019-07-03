Feature: Tombstone data collection
	
	The CSPS-EFPC has many people that attend their courses and events. In order
    To better serve the people that attend we need to know just a little bit about
    Them. We currently need department, classification, and city/region. This list
    May grow or shrink depending on currently unknown requirements. 

	Scenario: Setting tombstone data

        Given I have selected a course offering
        Then I should see a "Start" button
        And my city data has been loaded
        When I provide my department "CSPS"
        And I provide my classification "CS-01"
        And I choose to start the survey
        Then I should be able to see a survey progress bar
        
