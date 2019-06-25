from behave import given, when, then, step
from selenium.webdriver.common.by import By
from nose.tools import assert_equal, assert_true
from common_functions import isElementWithTextPresent


@given('I navigate to survey with id "{survey_id}"')
def step_when_navigate(context, survey_id):
    context.driver.get(context.SURVEY_URL + survey_id)

@then('I expect that the title is "{title}"')
def step_after_navigation(context, title):
    assert_equal(title, context.driver.title)

@then('I expect a button with text "{button_text}"')
def step_on_main_page(context, button_text):
    assert_true(isElementWithTextPresent(context, By.XPATH, "//button[text()= '" + button_text + "']"))