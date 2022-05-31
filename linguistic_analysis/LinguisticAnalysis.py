"""
Класс реализации лингвистического анализа
"""

import nltk

from db import Database
from templates import GET_MESSAGES_BY_EP_ID, GET_ACCEPTANCE_DATE
from const import TOO_FEW_MESSAGES_ERROR, MINIMUM_MESSAGES_TO_ANALYSIS, MINIMUM_DAYS_IN_COMPANY, MINIMUM_DAYS_ERROR


class LinguisticAnalysis:
    def __init__(self, data):
        self.ep_id = data.get('employee_id')
        self.date_on = data.get('date_on')
        self.date_to = data.get('date_to')

    def analyze(self):
        prepared_data = self.data_preparing()
        if prepared_data is str():
            return prepared_data

    def data_preparing(self):
        """
        Подготовим данные для анализа
        :return: list
        """
        messages = Database.SqlQuery(GET_MESSAGES_BY_EP_ID, self.ep_id, self.date_on, self.date_to)
        acceptance_date = Database.SqlQueryRecord(GET_ACCEPTANCE_DATE, self.ep_id).get('acceptance_date')

        if not messages or messages < MINIMUM_MESSAGES_TO_ANALYSIS:
            return TOO_FEW_MESSAGES_ERROR

        if acceptance_date < MINIMUM_DAYS_IN_COMPANY:
            return MINIMUM_DAYS_ERROR.format(acceptance_date)

