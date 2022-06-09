"""
Класс реализации лингвистического анализа
"""
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from datetime import date
from linguistic_analysis.model import LRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import sent_tokenize, word_tokenize
import random

from db import Database
from linguistic_analysis.templates import GET_MESSAGES_BY_EP_ID, GET_ACCEPTANCE_DATE, ADD_ANALYSIS_RESULT
from linguistic_analysis.const import TOO_FEW_MESSAGES_ERROR, MINIMUM_MESSAGES_TO_ANALYSIS, MINIMUM_DAYS_IN_COMPANY,\
    MINIMUM_DAYS_ERROR, TRAINING_SET


class LinguisticAnalysis:
    def __init__(self, data):
        self.ep_id = random.randint(0, 1)
        self.date_on = data.get('date_on')
        self.date_to = data.get('date_to')

    def _text_tone_analyze(self, prepared_data):
        """
        Метод анализа тональности сообщений
        :param prepared_data: сообщения сотрудника
        :return: dict
        """
        stop_words = stopwords.words('russian')
        lemmatizer = WordNetLemmatizer()
        normalized_data = []
        message_list = [data['message'] for data in prepared_data]
        for data in message_list:
            data = data.lower()
            data = nltk.word_tokenize(data)
            filtered_tokens = [word for word in data if word not in stop_words]
            lemma = [lemmatizer.lemmatize(word) for word in filtered_tokens]
            normalized_data.append(lemma)

        return 1 if self.ep_id == 0 else 0

    def analyze(self):
        prepared_data = self.data_preparing()
        if isinstance(prepared_data, str):
            return prepared_data

        print(prepared_data)
        text_tone_result = self._text_tone_analyze(prepared_data)
        print(text_tone_result)
        ignore_messages = self._ignore_messages(prepared_data)
        print(ignore_messages)
        messages_amount = int(self._messages_amount(prepared_data))
        messages_amount = 0 if messages_amount < 50 else 1
        print(messages_amount)
        result = self._get_analysis_by_employee(text_tone_result, ignore_messages, messages_amount)
        Database().SqlQuery(ADD_ANALYSIS_RESULT, self.ep_id, 'Communication', result, date.today())
        return [{"ep_id": self.ep_id, "name": "Communication", "result": result}]

    def data_preparing(self):
        """
        Подготовим данные для анализа
        :return: list
        """
        messages = Database().SqlQuery(GET_MESSAGES_BY_EP_ID, self.ep_id)
        acceptance_date = Database().SqlQueryRecord(GET_ACCEPTANCE_DATE, self.ep_id)
        if acceptance_date:
            acceptance_date = acceptance_date.get('acceptance_date')
        if not messages or (len(messages) <= MINIMUM_MESSAGES_TO_ANALYSIS):
            return TOO_FEW_MESSAGES_ERROR

        if (date.today() - acceptance_date).days < MINIMUM_DAYS_IN_COMPANY:
            return MINIMUM_DAYS_ERROR.format(acceptance_date)

        return messages

    def _ignore_messages(self, prepared_data):
        return 1 if self.ep_id == 0 else 0

    @staticmethod
    def _messages_amount(prepared_data):
        """
        Метод получения количества сообщений в процентах
        Чем больше сообщений тем выше процент
        В среднем за месяц обычный сотрудник написывает около 500 сообщений
        Возьмем 450 - 100%
        prepared_data  - x%
        :param prepared_data: Сообщения сотрудника
        :return: double
        """
        return len(prepared_data) * 100 / 450 if len(prepared_data) < 450 else 100

    @staticmethod
    def _get_analysis_by_employee(tone, ignore, amount):
        lr_class = LRegression(TRAINING_SET)
        model = lr_class.train()
        result = lr_class.predict(model, [tone, ignore, amount])
        percent = 0
        for res in result:
            percent = res[1]
        print(result)
        return percent
