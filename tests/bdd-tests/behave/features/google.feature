# -- FILE: features/google.feature
Feature: Search with Google
  As an information seeker,
  I want to search specific keyword on Google
  so that I can obtain related info.


  Scenario: Run a simple search
    Given I am on the Google page
     When I search for 'Digital Academy CSPS'
     Then I can see at least '1,340,000' results.


  Scenario Outline: Run a series of simple searches
    Given I am on the Google page
     When I search for '<keyword>'
     Then I can see at least '<number>' results.

    Examples: Search for an Infrastructure-as-a-Service by name
     | keyword                | number      |
     | Microsoft Azure        | 842,000,000 |
     | amazon web services    | 782,000,000 |
     | google cloud platform  | 858,000,000 |

    Examples: Search for a book by title
     | keyword               | number       |
     | Harry Potter          | 552,000,000  |
     | The Lord of the Rings | 163,000,000  |
