import jira
from jira import JIRA


login = "albertshabrov720@gmail.com"
passwd = "84rhjn))"


jira_options = {'server': 'https://watchbeyond.atlassian.net'}
j = JIRA(options=jira_options, basic_auth=(login, "wjHt9xqODfTnZXlg7EBd2E13"))

issue = jira.Issue()
