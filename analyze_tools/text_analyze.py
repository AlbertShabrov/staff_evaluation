from sklearn import datasets
from pprint import pprint
from analyze_tools.Slack import get_users_messages
from sklearn.cluster import KMeans
from scipy.spatial import distance as sci_distance
import matplotlib.pyplot as plt
import nltk
import numpy as np

def getAnalysis(id):
    return 'hello from text_analyze module!'


def take_all_users_messages():
    messages_dict = {
        'U02F75EADFZ': [],
        'U02FMSG8U3C': [],
        'U02G0FE9ASD': []
    }

    for id in messages_dict.keys():
        messages, ids = get_users_messages(id)
        messages_dict.update({id: messages})
    frequency = data_normalization(messages_dict)
    return frequency

def average_length(message_list):
    count = 0
    for message in message_list:
        count += len(message)
    text_length = count / len(message_list)
    print("text_length:", text_length)
    if text_length < 21:
        return [1, 0, 0]
    if (text_length > 20 and text_length < 41):
        return [0, 1, 0]
    if text_length > 40:
        return [0, 0, 1]

def data_normalization(messages):
    frequency = []
    for message in messages:
        message_list = messages.get(message)
        sms_string = ' '.join(message_list)
        sms_string = clean_string(sms_string)
        str_list = nltk.word_tokenize(sms_string)
        frequency.append(create_frequency_for_str(str_list) + average_length(message_list))

    return frequency


def create_frequency_for_str(str_list):
    count = 0
    try:
        for str in str_list:
            if str.lower() == 'да' or str.lower() == 'нет':
                count += 1
        frequency = float(count) / float(len(str_list))
        if frequency < 0.11:
            return [1, 0, 0, 0, 0]
        if (frequency > 0.10 and frequency < 0.21):
            return [0, 1, 0, 0, 0]
        if (frequency > 0.20 and frequency < 0.31):
            return [0, 0, 1, 0, 0]
        if (frequency > 0.30 and frequency < 0.41):
            return [0, 0, 0, 1, 0]
        if frequency > 0.40:
            return [0, 0, 0, 0, 1]
    except ZeroDivisionError as e:
        pass


def clean_string(str):
    str = str.replace('.', '')
    str = str.replace('<', '')
    str = str.replace('>', '')
    str = str.replace(':', '')
    str = str.replace('@', '')
    str = str.replace(',', '')
    str = str.replace('!', '')
    str = str.replace('?', '')
    str = str.replace('«', '')
    str = str.replace('»', '')
    str = str.replace('(', '')
    str = str.replace(')', '')

    return str