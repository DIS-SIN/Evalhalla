from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By 

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


def getAllElementsWithPath(context, path):
    try:
        elements = context.driver.find_elements(By.XPATH, path)
        return elements
    except NoSuchElementException:
        return None