from sklearn import datasets
from pprint import pprint
from Slack import get_users_messages
from sklearn.cluster import KMeans

def take_all_users_messages():
    id_list = ["U02F75EADFZ", "U02FMSG8U3C", "U02G0FE9ASD"]
    messages_dict = {
        'U02F75EADFZ': [],
        'U02FMSG8U3C': [],
        'U02G0FE9ASD': []
    }
    print(get_users_messages("U02F75EADFZ"))
#    for id in id_list:
#       messages_dict.update({id : })
    pprint(messages_dict)

take_all_users_messages()

# Загружаем набор данных
#iris_df = datasets.load_iris()


# # Описываем модель
# model = KMeans(n_clusters=3)
#
# # Проводим моделирование
# model.fit(iris_df.data)
#
# # Предсказание на единичном примере
# predicted_label = model.predict([[7.2, 3.5, 0.8, 1.6]])
#
# # Предсказание на всем наборе данных
# all_predictions = model.predict(iris_df.data)
#
# # Выводим предсказания
# print(predicted_label)
# print(all_predictions)