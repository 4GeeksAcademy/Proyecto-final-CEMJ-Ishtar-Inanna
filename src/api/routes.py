"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, PetImages, PetPost, SocialMedia
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#USER ROUTES (Las rutas no son seguras aún, hay que mirar)

@api.route('/users', methods=["POST"])
def crear_usuario():
    data = request.get_json()
    user = User(
        email = data.get('email'),
        username = data.get('username')
    )
    db.session.add(user)
    db.session.commit()
    
    user.set_password()
    return user.serialize(), 200


@api.route('/users', methods=['POST'])
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
    
    #Generar acces token y retornarlo con username
    #Guardar el token en el localstorage o sessionstorage
    #
    #return 



#PETPOST ENDPOINTS
    
@api.route('/pets', methods=['GET'])
def get_all_pets():
    data = db.session.execute(select(PetPost)).scalars()
    result = list(map(lambda item: item.serialize(), data))
    response_body = {"All pets list": result}
    print("hello")
    return jsonify(response_body), 200

@api.route('/pets/<int:pet_post_id>', methods=['GET']) #ESTA ID SE TRAERÁ DESDE EL
#FRONTEND. 
def get_single_pet(pet_post_id):
    data = db.session.execute(select(PetPost)).scalars()
    result = list(map(lambda item: item.serialize(), data))
    response_body = {"All pets list": result}
    print("hello")
    return jsonify(response_body), 200

@api.route('/pets', methods=["POST"])
def create_pet_post():
    data = request.get_json()
    pet_post = PetPost(
        found_location = data.get('found_location'),
        actual_location = data.get('actual_location'),
        found_time = data.get('found_time'),
        name = data.get('name'),
        breed = data.get('breed'),
        physical_description = data.get('physical_description')
    )
    db.session.add(pet_post)
    db.session.commit()
    return pet_post.serialize(), 200