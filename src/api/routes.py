"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@app.route('/users', methods=['POST'])
def get_all_users():
    body = request.get_json()#se manda un body con username y password del front
    username = body.get("username", None)
    password = body.get("password")
    if not username:
        return jsonify({"message": "username is a required field"}),400
    
    user = db.session.execute(select(User).where(User.username==username)).scalars().first()

    if not user:
        return jsonify({"message":"user not found"}),404

    if not user.check_password(password):
        return jsonify({"message":"Bad credentials"}),400