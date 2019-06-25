from behave import given, when, then, step
from selenium.webdriver.common.by import By
from nose.tools import assert_equal, assert_true
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common_functions import isElementWithTextPresent, isElementWithIdPresent
from selenium.webdriver.common.keys import Keys

@given('I have selected a course offering')
def step_impl(context):
    wait = WebDriverWait(context.driver, 5)
    elem = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@id='off_1']//span[text()='Select']")))
    elem.click()

@then('I should see a "{button_text}" button')
def step_impl(context, button_text):
    assert_true(isElementWithTextPresent(context, By.XPATH, '//span[text()= "' + button_text + '"]'))

@then('my city data has been loaded')
def step_impl(context):
    check_input = isElementWithIdPresent(context, 'autocomplete-input-city')
    if check_input:
        input_elem = context.driver.find_element_by_id('autocomplete-input-city')
        input_text = input_elem.get_attribute("value")
        assert_true(len(input_text) > 0)
    else:
        assert_true(False)
    
@when('I provide my department "{dept}"')
def step_impl(context, dept):
    check_input = isElementWithIdPresent(context, 'autocomplete-input-department')
    if check_input:
        input_elem = context.driver.find_element_by_id('autocomplete-input-department')
        input_elem.send_keys(dept)
        input_elem.send_keys(Keys.ARROW_DOWN)
        input_elem.send_keys(Keys.RETURN)
        input_elem.send_keys(Keys.TAB)
    else:
        assert_true(False)

@when('I provide my classification "{classification}"')
def step_impl(context, classification):
    check_input = isElementWithIdPresent(context, 'autocomplete-input-classification')
    if check_input:
        input_elem = context.driver.find_element_by_id('autocomplete-input-classification')
        input_elem.send_keys(classification)
        input_elem.send_keys(Keys.ARROW_DOWN)
        input_elem.send_keys(Keys.RETURN)
    else:
        assert_true(False)

@when('I choose to start the survey')
def step_impl(context):
    start_button = context.driver.find_element(By.XPATH, '//span[text()= "Start"]')
    start_button.click()

@then('I should be able to see a survey progress bar')
def step_impl(context):
    assert_true(isElementWithTextPresent(context, By.XPATH, '//div[@class="progress"]'))
    
    