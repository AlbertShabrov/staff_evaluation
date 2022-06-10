from flask import Flask
from flask_cors import CORS
from camera import Recording
from multiprocessing import Process
from multiprocessing.managers import BaseManager

app = Flask(__name__)
CORS(app)
recording = None


@app.after_request
def after_request(response):
    response.headers.add('Accept-Ranges', 'bytes')
    return response


@app.route('/camera/start', methods=["GET"])
def start_camera_recording():
    Process(target=recording.start, daemon=True).start()
    return 'Success'


@app.route('/camera/stop', methods=["GET"])
def stop_camera_recording():
    recording.stop()
    return 'Success'


@app.route('/camera/get_last_recording', methods=["GET"])
def get_camera_last_recording():
    return recording.get_file()


if __name__ == '__main__':
    try:
        BaseManager.register('Recording', Recording)
        manager = BaseManager()
        manager.start()
        recording = manager.Recording()
        app.run(debug=True, port=8010)
    except Exception as e:
        print('Bad exit')
        recording.stop()
