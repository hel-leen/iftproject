from flask import Flask, request
import os
import json
import time

app = Flask(__name__)
JSON_DESTINATION = os.environ.get('JSON_DESTINATION', 'received_stuff')


@app.route('/save', methods=['POST'])
def save():
    request_dict = request.json
    uuid = request_dict[0]["uuid"]

    path = os.path.join(JSON_DESTINATION, str(time.time()) + '_' + uuid + '.json')
    with open(path, 'w') as f:
        json.dump(request_dict, f)

    return 'Happy 🐈 i am'
