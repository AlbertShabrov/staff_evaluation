import db
from competences.templates import GET_COMPETENCES_BY_POSITION, GET_COMPETENCES_BY_USER

def get_competences_by_position(id):
    return db.Database().SqlQuery(GET_COMPETENCES_BY_POSITION, id)

def get_competences_by_user(id):
    res = db.Database().SqlQuery(GET_COMPETENCES_BY_USER, id)
    for elem in res:
        elem['date'] = str(elem['date'])
    return res