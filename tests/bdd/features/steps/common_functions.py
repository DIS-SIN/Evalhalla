from selenium.common.exceptions import NoSuchElementException

def isElementWithTextPresent(context, by, text):
    try:
        context.driver.find_element(by, text)
        return True
    except NoSuchElementException:
        return False

def isElementWithIdPresent(context, elem_id):
    try:
        context.driver.find_element_by_id(elem_id)
        return True
    except NoSuchElementException:
        return False