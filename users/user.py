import db
from pprint import pprint
from analyze_tools.Slack import get_users_messages
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
            'competences': []
        }
        competences = {}
        responsibility_areas = []
        for elem in data:
            if (elem['competence'] or '') + str(elem['date']) not in competences.keys():
                competences[(elem['competence'] or '')+ str(elem['date'])] = (elem['competence'] or '') + ";" + str(elem['level']) + ";" + str(elem['date'])
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
    graph = []
    slack_user_id = db.Database().SqlQueryRecord(GET_SLACK_ID_BY_USER_ID, user_id)
    if not slack_user_id:
        return []

    result = get_users_messages(slack_user_id)

    data = db.Database().SqlQuery(GET_COMMUNICATION_GRAPH.format(slack_ids=f"""('{"', '".join(result.keys())}')"""))
    for slack_id in result.keys():
        user = dict(list(filter(lambda x: x['slack_id'] == slack_id, data))[0])
        user['contacts'] = result[user['slack_id']]
        del user['slack_id']
        graph.append(user)

    return graph