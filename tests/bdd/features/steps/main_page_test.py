import requests
import re
from behave import given, when, then, step
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from nose.tools import assert_equal, assert_true

@given('I navigate to survey with id "{survey_id}"')
def step_impl(context, survey_id):
    context.driver.get(context.SURVEY_URL + survey_id)

@then('I expect that the title is "{title}"')
def step_when_switch_blender_on(context, title):
    assert_equal(title, context.driver.title)

@then('I expect a button with text "{text}"')
def step_when_switch_blender_on(context, text):
    elem = context.driver.find_element(By.XPATH, '//*[@id="step_lang"]//button')
    assert_equal(text, elem.text)