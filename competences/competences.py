import db
from competences.templates import GET_COMPETENCES_BY_POSITION

def get_competences_by_position(id):
    return db.Database().SqlQuery(GET_COMPETENCES_BY_POSITION, id)