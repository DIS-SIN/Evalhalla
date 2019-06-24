#
# The environment.py module may define code to run
# before and after certain events during your testing.
#
import os
from enum import Enum
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

#---
# Chrome: headless (default) or gui mode?
#
webdriver_headless_mode = True

def use_headless_mode(on_or_off: bool):
    global webdriver_headless_mode
    webdriver_headless_mode = on_or_off


#---
# default high-level query engine for Chrome
#

class WebBrowserType(Enum):
    CHROME = 1
    FIREFOX = 2  
    IE = 3    

web_browser = WebBrowserType.CHROME

def behave_use_chrome():
    global web_browser
    web_browser = WebBrowserType.CHROME


#---
# setting for chrome webdriver
#

chrome_options = Options()
chrome_options.add_argument('no-sandbox')
chrome_options.add_argument('disable-setuid-sandbox')
chrome_options.add_argument('window-size=1920,1080')
CHROME_EXE_PATH='/usr/local/bin/chromedriver'

#---
# common hooks
#

def before_all(context):
    print("> Starting the browser")

    global chrome_options
    global web_browser

    context.SURVEY_URL = 'file:///' + os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')) + "\index.html?sur="

    if web_browser == WebBrowserType.CHROME:
        if webdriver_headless_mode:
            chrome_options.add_argument('headless')
            context.driver = webdriver.Chrome(executable_path=CHROME_EXE_PATH, 
                chrome_options=chrome_options)
        else:
            context.driver = webdriver.Chrome(executable_path=CHROME_EXE_PATH, 
                chrome_options=chrome_options)
        


def after_all(context):
    print("< Closing the browser")
    if web_browser == WebBrowserType.CHROME:
        context.driver.close()

print('------------------')