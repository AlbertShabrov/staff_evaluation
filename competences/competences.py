import db
from datetime import datetime, timedelta

from competences.templates import GET_COMPETENCES_BY_POSITION, GET_COMPETENCES_BY_USER, GET_COMPETENCES_BY_USER_FOR_YEAR


def get_competences_by_position(id):
    return db.Database().SqlQuery(GET_COMPETENCES_BY_POSITION, id)


def get_competences_by_user(id):
    res = db.Database().SqlQuery(GET_COMPETENCES_BY_USER, id)
    for elem in res:
        elem['date'] = str(elem['date'])
    return res


def get_competences_by_user_for_year(id):
    date = str(datetime.now() - timedelta(days=365)).split(" ")[0]
    res = db.Database().SqlQuery(GET_COMPETENCES_BY_USER_FOR_YEAR, id, date)
    for elem in res:
        elem['date'] = str(elem['date'])
    return res
