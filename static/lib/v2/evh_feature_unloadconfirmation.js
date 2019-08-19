/*

Evalhalla Evalese to JSON export feature

Given Sinan, a survey taker
When Sinan leaves the application
  And he might have unsaved work
Then the applicant will ask him before closing

_E["feature"]["unloadconfirmation"]

*/

// init the package
_E.feature.unloadconfirmation = {};

_E.feature.unloadconfirmation.enable_feature = function () {
    // Since some mobile phone refresh the page when you aggresively scroll back up
    // we want to help ensure a respondent does lose their work.
    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
    });
};
