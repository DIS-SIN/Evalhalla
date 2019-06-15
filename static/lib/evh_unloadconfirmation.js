// Since some mobile phone refresh the page when you aggresively scroll back up
// we want to help ensure a respondent does lose their work.
window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
});