from flask import Flask, request, make_response
from flask_cors import CORS
from competences.competences import get_competences_by_position, get_competences_by_user, get_competences_by_user_for_year
from users.user import get_all_user_info_by_id, get_employees_list, get_communication_graph, get_competences_by_user_id
from util import call_all_getAnalysis_methods
from linguistic_analysis.LinguisticAnalysis import LinguisticAnalysis
from linguistic_analysis.model import LRegression

import json

app = Flask(__name__)
CORS(app)


@app.route('/api/competence/position', methods=["GET"])
def get_competences_by_position_route():
    return make_response(json.dumps(get_competences_by_position(request.args.get('id')), ensure_ascii=False))


@app.route('/api/employee/<employee_id>/competence/getAnalysis', methods=["GET"])
def call_all_getAnalysis_methods_route(employee_id):
    return make_response(json.dumps(call_all_getAnalysis_methods(employee_id), ensure_ascii=False))


@app.route('/api/competence/user', methods=["GET"])
def get_competences_by_user_route():
    return make_response(json.dumps(get_competences_by_user(request.args.get('id')), ensure_ascii=False))


@app.route('/api/competence/user/year', methods=["GET"])
def get_competences_by_user_for_year_route():
    return make_response(json.dumps(get_competences_by_user_for_year(request.args.get('id')), ensure_ascii=False))


@app.route('/api/employee/<employee_id>/getInfo', methods=["GET"])
def get_all_user_info_by_id_route(employee_id):
    return make_response(json.dumps(get_all_user_info_by_id(employee_id), ensure_ascii=False))


@app.route('/api/employee/getAll', methods=["GET"])
def get_employees_list_route():
    return make_response(json.dumps(get_employees_list(), ensure_ascii=False))


@app.route('/api/user/communication_graph', methods=["GET"])
def get_communication_graph_route():
    return make_response(json.dumps(get_communication_graph(request.args.get('userId')), ensure_ascii=False))


@app.route('/api/user/ling_analysis', methods=["GET"])
def get_linguistic_analysis_route():
    return make_response(json.dumps(LinguisticAnalysis(request.args).analyze(), ensure_ascii=False))


if __name__ == '__main__':
    # app.run(debug=True)
    from svgelements import *





