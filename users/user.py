import db
from users.templates import GET_USER


def get_all_user_info_by_id(id):
    data = db.Database().SqlQuery(GET_USER, id)
    if data:
        res = {
            'name': data[0]['name'], 
            'surname': data[0]['surname'], 
            'patronymic': data[0]['patronymic'],
            'age': data[0]['age'],
            'gender': data[0]['gender'],
            'role': data[0]['role'],
            'position': data[0]['position'],
            'competences': []
        }
        competences = {}
        responsibility_areas = []
        for elem in data:
            if elem['competence']+ str(elem['date']) not in competences.keys():
                competences[elem['competence']+ str(elem['date'])] = elem['competence'] + ";" + str(elem['level']) + ";" + str(elem['date'])
            if elem['responsibility_area'] not in responsibility_areas:
                responsibility_areas.append(elem['responsibility_area'])
        for value in competences.values():
            competence = value.split(';')
            res['competences'].append({'competence': competence[0], 'value': competence[1], 'date': competence[2]})
        res['responsibility_areas'] = responsibility_areas
        return res