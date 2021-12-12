from sklearn import datasets
from pprint import pprint
from Slack import get_users_messages
from sklearn.cluster import KMeans
from scipy.spatial import distance as sci_distance
import matplotlib.pyplot as plt
import nltk
import numpy as np


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
        print(message_list)
        sms_string = ' '.join(message_list)
        sms_string = clean_string(sms_string)
        str_list = nltk.word_tokenize(sms_string)
        frequency.append(create_frequency_for_str(str_list) + average_length(message_list))

    print(frequency)
    return frequency


def create_frequency_for_str(str_list):
    count = 0
    try:
        for str in str_list:
            if str == 'да' or str == 'нет':
                count += 1
        frequency = float(count) / float(len(str_list))
        print(frequency)
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


frequency = np.asarray(take_all_users_messages())
# model = KMeans(n_clusters=2)
# # Проводим моделирование
# model.fit(frequency)

# Предсказание на единичном примере
# predicted_label = model.predict([[1, 0, 0, 0, 0, 1, 0, 0]])
#
# # Предсказание на всем наборе данных
# all_predictions = model.predict(frequency)

# Выводим предсказания
# print(predicted_label)
# print(all_predictions)


K = range(1, 20)
KM = (KMeans(n_clusters=k).fit(frequency) for k in K)
centroids = (k.cluster_centers_ for k in KM)

D_k = (sci_distance.cdist(frequency, cent, 'euclidean') for cent in centroids)
dist = (np.min(D, axis=1) for D in D_k)
avgWithinSS = [sum(d) / frequency.shape[0] for d in dist]
plt.plot(K, avgWithinSS, 'b*-')
plt.grid(True)
plt.xlabel('Number of clusters')
plt.ylabel('Average within-cluster sum of squares')
plt.title('Elbow for KMeans clustering')
plt.show()
