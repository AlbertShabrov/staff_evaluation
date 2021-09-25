from flask import Flask, request, make_response
from competences.competences import get_competences_by_position, get_competences_by_user
import json

app = Flask(__name__)


@app.route('/api/competence/position', methods=["GET"])
def get_competences_by_position_route():
    return make_response(json.dumps(get_competences_by_position(request.args.get('id')), ensure_ascii=False))
    

@app.route('/api/competence/user', methods=["GET"])
def get_competences_by_user_route():
    return make_response(json.dumps(get_competences_by_user(request.args.get('id')), ensure_ascii=False))


if __name__ == '__main__':
    app.run(debug=True)