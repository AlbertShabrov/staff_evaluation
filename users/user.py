import db
from pprint import pprint
from analyze_tools.Slack import get_users_messages
from users.templates import GET_USER, GET_EMPLOYEES_LIST, GET_EMPLOYEES_RESPONSIBILITY_AREAS,\
    GET_COMMUNICATION_GRAPH


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

def get_employees_list():
    data = db.Database().SqlQuery(GET_EMPLOYEES_LIST)
    for i in data:
        data2 = db.Database().SqlQuery(GET_EMPLOYEES_RESPONSIBILITY_AREAS, i['id'])
        i['responsibility_areas'] = list(map(lambda x: x['name'], data2))

    return data

def get_communication_graph(user_id):
    result = get_users_messages(user_id)
    data = db.Database().SqlQuery(GET_COMMUNICATION_GRAPH, result.keys())
    graph = []
    for slack_id in result.keys():
        user = list(filter(lambda x: x['slack_id'] == slack_id, data))[0]
        del user['slack_id']
        graph.append(user)
    return graph

get_communication_graph(user_id = "U02F75EADFZ")