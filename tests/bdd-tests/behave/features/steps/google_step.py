# -- FILE: features/steps/google_steps.py
import requests
import re
from pyshould import *
from behave import given, when, then, step
from capybara.dsl import *
from selenium.webdriver.common.keys import Keys

URL_GOOGLE = 'https://www.google.ca'

@given(u'I am on the Google page')
def step_impl(context):
    #--> raw selenium version
    # context.driver.get(URL_GOOGLE)

    #--> elementium version
    # context.driver.navigate(URL_GOOGLE)

    #--> capybara version
    visit(URL_GOOGLE)


@when(u'I search for \'{keyword}\'')
def step_impl(context, keyword):
    #--> elementium version
    # search_box = context.driver.find('#lst-ib', wait=True)[0]
    # search_box.write(keyword).write(Keys.RETURN)
    # result_text = context.driver.find("#resultStats", wait=True).item.text

    #--> capybara version
    find('[name=q]').set(keyword)
    find('[name=q]').native.send_keys(Keys.RETURN)

    save_screenshot("logs/search_for_%s_screenshot.png" % keyword)

    result_text = find("#resultStats").text
    print('result_text [' + result_text + ']')
    context.result_count = count_search_results(result_text)


@then('I can see at least \'{number}\' results.')
def step_impl(context, number):
    assert len(context.result_count) > 0
    print('context.result_count: ' + context.result_count + ', number: ' + number + "\n")
    assert int(context.result_count.replace(',', '')) >= int(number.replace(',', ''))


def count_search_results(result_text: str) -> str:
    """Count the number of Google search results.

    Args:
        result_text (str): text containing the count string.

    Returns:
        str: The extracted count.
    """
    m = re.search(r'[A-Za-z]+\s*([\d\,]+)\s*[a-z]+\s*', result_text)
    return m.group(1)
