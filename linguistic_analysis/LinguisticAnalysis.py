"""
Класс реализации лингвистического анализа
"""

import nltk

from db import Database
from templates import GET_MESSAGES_BY_EP_ID
from const import TOO_FEW_MESSAGES_ERROR


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
        if not messages or messages < 10:
            return TOO_FEW_MESSAGES_ERROR
