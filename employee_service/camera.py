import cv2
import os
from flask import Response


class Recording:
    def __init__(self):
        self.capture_object = None
        self.output_file = None
        self.location = 'data/output.avi'

    def start(self):
        self.capture_object = cv2.VideoCapture(0)
        self.output_file = cv2.VideoWriter(self.location, cv2.VideoWriter_fourcc(*"MJPG"), 20, (640, 480))

        while (self.capture_object.isOpened()):
            frame_was_taken_successfully, frame = self.capture_object.read()
            if frame_was_taken_successfully:
                frame = cv2.flip(frame, 180)
                self.output_file.write(frame)
            else:
                break

    def stop(self):
        self.capture_object.release()
        self.capture_object.release()
        cv2.destroyAllWindows()

    def get_chunk(self, byte1=0, byte2=None):
        file_size = os.stat(self.location).st_size
        start = 0

        if byte1 < file_size:
            start = byte1
        if byte2:
            length = byte2 + 1 - byte1
        else:
            length = file_size - start

        with open(self.location, 'rb') as video_file:
            video_file.seek(start)
            chunk = video_file.read(length)
        return chunk, start, length, file_size

    def get_file(self):
        chunk, start, length, file_size = self.get_chunk()
        resp = Response(chunk, 206, mimetype='video/mp4', content_type='video/mp4', direct_passthrough=True)
        resp.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size))
        return resp
