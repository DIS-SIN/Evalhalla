from behave import given, when, then, step
from selenium.webdriver.common.by import By
from nose.tools import assert_equal, assert_true
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common_functions import isElementWithTextPresent, isElementWithIdPresent, getAllElementsWithPath
from selenium.webdriver.common.keys import Keys

@given('I have started a survey')
def step_impl(context):
    pass

@given('I answer to all questions')
def step_impl(context):
    pass
    
@when('I submit my answers')
def step_impl(context):
    pass

@then('I should see "{text}" text')
def step_impl(context, text):
    pass