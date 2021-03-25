from flask import Flask, request
import os
import json
import time

app = Flask(__name__)
JSON_DESTINATION = os.environ.get('JSON_DESTINATION', 'received_stuff')


@app.route('/api/save', methods=['POST'])
def save():
    req_type = request.args.get('type')
    request_dict = request.json
    if req_type == 'survey':
        uuid = request_dict["uuid"]
    elif req_type == 'experiment':
        uuid = request_dict[0]["uuid"]
    elif req_type == 'information':
        uuid = request_dict["uuid"]
    else:
        return 'Type ' + req_type + 'not defined', 400

    path = os.path.join(JSON_DESTINATION, req_type, str(time.time()) + '_' + uuid + '.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(request_dict, f, ensure_ascii=False)

    return 'Happy 🐈 i am'

# useful for local testing, but not good in production
# @app.after_request
# def after_request(response):
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     header['Access-Control-Allow-Headers'] = '*'
#     return response
