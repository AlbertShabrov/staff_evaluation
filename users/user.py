import db
from pprint import pprint
from analyze_tools.Slack import get_users_messages, create_communication_graph
from users.templates import GET_USER, GET_EMPLOYEES_LIST, GET_EMPLOYEES_RESPONSIBILITY_AREAS,\
    GET_COMMUNICATION_GRAPH, GET_SLACK_ID_BY_USER_ID


def get_all_user_info_by_id(id):
    data = db.Database().SqlQuery(GET_USER, id)
    if data:
        res = {
            'id': data[0]['id'],
            'name': data[0]['name'], 
            'surname': data[0]['surname'], 
            'patronymic': data[0]['patronymic'],
            'age': data[0]['age'],
            'gender': data[0]['gender'],
            'role': data[0]['role'],
            'position': data[0]['position'],
            'position_id': data[0]['position_id'],
        }
        responsibility_areas = {}
        for elem in data:
            if elem['responsibility_area'] not in responsibility_areas.keys():
                responsibility_areas[(elem['responsibility_area'] or '')] = elem['success']
        res['responsibility_areas'] = responsibility_areas
        return res


def get_competences_by_user_id(id):
    data = db.Database().SqlQuery(GET_USER, id)
    if data:
        res = {
            'competences': []
        }
    competences = {}
    timeline = {}
    for elem in data:
        timeline[str(elem['date'])] = str(elem['level'])
        if (elem['competence'] or '') + str(elem['date']) not in competences.keys():
            competences[(elem['competence'] or '') + str(elem['date'])] = (elem['competence'] or '') + ";" + str(\
                elem['level']) + ";" + str(elem['date']) + ";" + str(elem['main'] or '') + ";" + str(
                elem['description'])
    for value in competences.values():
        competence = value.split(';')
        res['competences'].append(
            {'competence': competence[0], 'value': competence[1], 'date': competence[2], 'main': competence[3],
             'description': competence[4]})
    res['timeline'] = timeline
    return res


def get_employees_list():
    data = db.Database().SqlQuery(GET_EMPLOYEES_LIST)
    return data

def get_communication_graph(user_id):
    graph = []
    slack_user_id = db.Database().SqlQueryScalar(GET_SLACK_ID_BY_USER_ID, user_id)
    if not slack_user_id:
        return []

    result = create_communication_graph(get_users_messages(slack_user_id))

    if not result or not result.keys():
        return []

    data = db.Database().SqlQuery(GET_COMMUNICATION_GRAPH.format(slack_ids=f"""('{"', '".join(result.keys())}')"""))
    for slack_id in result.keys():
        user = dict(list(filter(lambda x: x['slack_id'] == slack_id, data))[0])
        user['contacts'] = result[user['slack_id']]
        del user['slack_id']
        graph.append(user)

    return graph

print(get_employees_list())