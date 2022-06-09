from fer import Video
from fer import FER

# Put in the location of the video file that has to be processed
location_videofile = "../employee_service/data/output.avi"

# Build the Face detection detector
face_detector = FER(mtcnn=True)
# Input the video for processing
input_video = Video(location_videofile)

# The Analyze() function will run analysis on every frame of the input video.
# It will create a rectangular box around every image and show the emotion values next to that.
# # Finally, the method will publish a new video that will have a box around the face of the human with live emotion values.
processing_data = input_video.analyze(face_detector, display=False, save_frames=False, save_video=False, zip_images=False)

# We will now convert the analysed information into a dataframe.
# This will help us import the data as a .CSV file to perform analysis over it later
vid_df = input_video.to_pandas(processing_data)
vid_df = input_video.get_first_face(vid_df)
vid_df = input_video.get_emotions(vid_df)

# We will now work on the dataframe to extract which emotion was prominent in the video
emotions = {
    'Angry': sum(vid_df.angry),
    'Disgust': sum(vid_df.disgust),
    'Fear': sum(vid_df.fear),
    'Happy': sum(vid_df.happy),
    'Sad': sum(vid_df.sad),
    'Surprise': sum(vid_df.surprise),
    'Neutral': sum(vid_df.neutral)
}

max_emotion = ''
max_emotion_value = 0
all_emotions_sum = 0
for emotion, value in emotions.items():
    all_emotions_sum += value
    if value > max_emotion_value:
        max_emotion_value = value
        max_emotion = emotion

print(max_emotion, max_emotion_value / all_emotions_sum * 100)

