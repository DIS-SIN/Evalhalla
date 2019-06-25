from behave import given, when, then, step
from selenium.webdriver.common.by import By
from nose.tools import assert_equal, assert_true
from common_functions import isElementWithTextPresent

@given('I have completed the main page steps')
def step_impl(context):
    pass

@when('I click "{button_text}" button')
def step_impl(context, button_text):
    if isElementWithTextPresent(context, By.XPATH, "//button[text()= '" + button_text + "']"):
        elem = context.driver.find_element(By.XPATH, "//button[text()= '" + button_text + "']")
        elem.click()
    else:
        assert_true(False)    

@then('I should be able to see course offering choice text "{text}"')
def step_impl(context, text):
    assert_true(isElementWithTextPresent(context, By.XPATH, "//span[text()= '" + text + "']"))