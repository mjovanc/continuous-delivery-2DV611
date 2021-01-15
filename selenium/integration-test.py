from selenium import webdriver
from selenium.webdriver import Remote
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import random

try:
    url = sys.argv[1]
    version = random.randint(1,99999)

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

    driver.get('{}/register'.format(url))
    driver.find_element_by_name('email').send_keys('test{}@mail.com'.format(version))
    driver.find_element_by_name('password').send_keys('testtest')
    driver.find_element_by_name('name').send_keys('Testaren')
    driver.find_element_by_xpath('//button[.="Submit"]').click()

    WebDriverWait(driver, 10).until(
        EC.url_to_be('{}/login'.format(url))
    )

    header = driver.find_element_by_xpath('//h1[.="Login"]').text
    assert header == 'Login'

    driver.find_element_by_name('email').send_keys('test{}@mail.com'.format(version))
    driver.find_element_by_name('password').send_keys('testtest')
    driver.find_element_by_xpath('//button[.="Submit"]').click()
    
    print(driver.title)
    assert 'React App' in driver.title
finally:
    try:
        driver.close()
    except:
        pass