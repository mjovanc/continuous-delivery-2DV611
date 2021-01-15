from selenium import webdriver
from selenium.webdriver import Remote
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys

try:
    url = sys.argv[1]

    #RUN WITH BROWSER
    #driver = webdriver.Firefox()

    #RUN HEADLESS
    fireFoxOptions = webdriver.FirefoxOptions()
    fireFoxOptions.headless = True
    #driver = webdriver.Firefox(options=fireFoxOptions)
    
    #RUN REMOTELY
    driver = webdriver.Remote(
        options=fireFoxOptions,
        command_executor='http://selenium__standalone-firefox:4444/wd/hub'
    )

    driver.get('{}'.format(url))
    assert 'React App' in driver.title

finally:
    try:
        driver.close()
    except:
        pass