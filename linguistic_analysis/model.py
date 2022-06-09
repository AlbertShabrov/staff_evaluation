import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer


class LRegression:
    def __init__(self, training_set):
        self.data = training_set
        self.result = []
        for data in self.data:
            self.result.append(data.pop())
        self.result = pd.Series(self.result)
        print(self.result)

    def train(self):
        self.clf = LogisticRegression(penalty='l2')
        model = self.clf.fit(self.data, self.result)
        return model

    def predict(self, model, data):
        data = [data]
        return model.predict_proba(data)
