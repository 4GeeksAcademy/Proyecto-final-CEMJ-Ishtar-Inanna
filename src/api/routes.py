"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, PetImages, PetPost, SocialMedia
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# GET ALL USERS ROUTE (NOT GONNA BE USED)


@api.route('/users', methods=['GET'])
def get_all_users():
    data = db.session.execute(select(User)).scalars()
    result = list(map(lambda item: item.serialize(), data))
    response_body = {"All user list": result}
    return jsonify(response_body), 200

# CREATE NEW USER ROUTE


@api.route('/users/register', methods=["POST"])
def create_user():
    data = request.get_json()
    user = User(
        email=data.get('email'),
        username=data.get('username'),
        password=data.get('password'),
        address=data.get('address'),
        name=data.get('name'),
        last_name=data.get('last_name'),
        phone=data.get('phone'),
        prof_img=data.get('prof_img')
    )
    user.set_password(data.get('password'))

    db.session.add(user)
    db.session.commit()

    return user.serialize(), 200

# LOGIN USER SERVICES


@api.route('/users/login', methods=['POST'])
def login_users():
    body = request.get_json()
    username = body.get("username", None)
    password = body.get("password", None)
    if not username:
        return jsonify({"message": "username is a required field"}), 400

    user = db.session.execute(select(User).where(
        User.username == username)).scalars().first()

    if not user:
        return jsonify({"message": "user not found"}), 404

    if not user.check_password(password):
        return jsonify({"message": "Bad credentials"}), 400

    print('LOGIN secret:', current_app.config['JWT_SECRET_KEY'])
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id})

# PROTECTED ROUTE


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"done": False}), 404

    return jsonify({"done": True}), 200

# DELETE USER


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({"Message": "User_id not found in database"})

    db.session.delete(user)
    db.session.commit()
    return jsonify("deleted user", user_id)


### PETPOST ENDPOINTS###

# GET PET POST
@api.route('/pets', methods=['GET'])
def get_all_pet_posts():
    data = db.session.execute(select(PetPost)).scalars()
    result = list(map(lambda item: item.serialize(), data))
    response_body = {"All pets list": result}
    print("hello")
    return jsonify(response_body), 200

# DELETE PET POST


@api.route('/pets/<int:pet_post_id>', methods=['DELETE'])
def delete_pet_post(pet_post_id):
    petpost = db.session.get(PetPost, pet_post_id)

    if not petpost:
        return jsonify({"Message": "UPet_post not found in database"})

    db.session.delete(petpost)
    db.session.commit()
    return jsonify("deleted petpost", petpost)

# GET SINGLE PET POST


@api.route('/pets/<int:pet_post_id>', methods=['GET'])
def get_pet_post(pet_post_id):
    petpost = db.session.get(PetPost, pet_post_id)
    if not petpost:
        return jsonify({"Message": "pet_post not found in database"})
    return jsonify(petpost.serialize()), 200

# PUPLOAD A PET POST


@api.route('/pets', methods=["POST"])
def create_pet_post():
    data = request.get_json()
    pet_post = PetPost(
        found_location=data.get('found_location'),
        actual_location=data.get('actual_location'),
        found_time=data.get('found_time'),
        name=data.get('name'),
        breed=data.get('breed'),
        physical_description=data.get('physical_description')
    )
    db.session.add(pet_post)
    db.session.commit()
    return pet_post.serialize(), 200

# GET USER INFORMATION


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "name": user.name,
        "last_name": user.last_name,
        "address": user.address,
        "phone": user.phone,
        "prof_img": user.prof_img,
        "is_active": user.is_active
    }

    return jsonify(user_data), 200


# AUTHENTICATION TESTING
# Protect a route with jwt_required, which will kick out requests without a valid JWT
