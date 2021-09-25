from flask import Flask, request
from competences.competences import get_competences_by_position

app = Flask(__name__)


@app.route('/api/competence/position', methods=["GET"])
def get_competences_by_position():
    return get_competences_by_position(request.args.get('id'))


if __name__ == '__main__':
    app.run(debug=True)