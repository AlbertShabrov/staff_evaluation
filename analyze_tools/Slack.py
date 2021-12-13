from pprint import pprint
from functools import reduce
import re
import logging
import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
# WebClient insantiates a client that can call API methods
# When using Bolt, you can use either `app.client` or the `client` passed to listeners.
client = WebClient(token = "xoxp-2544523475105-2517184353543-2532628417490-3a25dafc4b6eee2c1a466371a6e37e4e")
logger = logging.getLogger(__name__)
users_store = {}
users_identify = []
conversations_store = {}

def getAnalysis(id):
    return 'hello from Slack module!'


def fetch_conversations():
    try:
        # Call the conversations.list method using the WebClient
        result = client.conversations_list()
        save_conversations(result["channels"])

    except SlackApiError as e:
        logger.error("Error fetching conversations: {}".format(e))


# Put conversations into the JavaScript object
def save_conversations(conversations):
    conversation_id = ""
    for conversation in conversations:
        # Key conversation info on its unique ID
        conversation_id = conversation["id"]

        # Store the entire conversation object
        # (you may not need all of the info)
        conversations_store[conversation_id] = conversation


def get_users_messages(user_id):
    if not len(conversations_store.keys()):
        fetch_conversations()

    try:
        conversation_history = []
        # Call the conversations.history method using the WebClient
        # conversations.history returns the first 100 messages by default
        # These results are paginated, see: https://api.slack.com/methods/conversations.history$pagination
        for channel_id in conversations_store.keys():
            result = client.conversations_history(channel=channel_id)
            conversation_history.extend([
                x['text'] for x in filter(lambda x: x['user'] == user_id, result["messages"])
            ])

        return conversation_history, user_id
    except SlackApiError as e:
        logger.error("Error creating conversation: {}".format(e))


def create_communication_graph(messages, current_user_id):
    graph = {}
    for message in messages:
        user_ids = re.findall(r'<@(.*)>', message)
        if not len(user_ids):
            continue

        for user_id in user_ids[0].split():
            trimmed_user_id = user_id.replace('<@', '').replace('>', '')
            if graph.get(trimmed_user_id, None):
                graph[trimmed_user_id] += 1
            else:
                graph[trimmed_user_id] = 1

    if graph.get(current_user_id, None):
        del graph[current_user_id]
    return graph


if __name__ == "__main__":
    fetch_conversations()
    get_users_messages()
