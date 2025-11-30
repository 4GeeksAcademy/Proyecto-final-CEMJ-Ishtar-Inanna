from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)


bcrypt = Bcrypt(app)
app.config["SECTET_KEY"]="secret-token"
jwt= JWTManager(app)

db = SQLAlchemy()

class User(db.Model):
    __tablename__="user"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30),nullable = False, unique = True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(30),nullable=False)
    address: Mapped[str] = mapped_column(String(30), nullable = True)
    name: Mapped[str] = mapped_column(String(30), nullable = False)
    last_name: Mapped[str]= mapped_column(String(30), nullable = False)
    phone: Mapped[str] = mapped_column(String(30), nullable = True)
    prof_img: Mapped[str] = mapped_column(String(30),nullable = True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable = True)
    
    #FK
    
    #Relationships
    

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "address": self.address,
            "name": self.name,
            "last_name": self.last_name,
            "phone": self.phone,
            "prof_img": self.prof_img,
            "is_active" : self.is_active
        }
        
    #HASHEO DE CONTRASEÑA(No touchy) INACABADO
    
    def set_password(self, plain_pwd):
        self.password = bcrypt.generate_password_hash(plain_pwd).decode('utf-8')
        return "contraseña hasheada guardada exitosamente"

    def check_password(self, plain_pwd):
        return bcrypt.check_password_hash(self.password, plain_pwd)
        
        
        
class PetPost(db.Model):
    __tablename__ = "pet_post"
    id: Mapped[int] = mapped_column(primary_key=True)
    found_location: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) #Donde se ha encontrado
    actual_location: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    found_time: Mapped[datetime] = mapped_column(DateTime,nullable=True, default=datetime.now(),server_default=func.now()) # PONER VALOR POR DEFECTO
    name: Mapped[str] = mapped_column(String(30), nullable = False)
    breed: Mapped[str]= mapped_column(String(30), nullable = False)
    physical_description: Mapped[str] = mapped_column(String(30),nullable = True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable = True)
    
    #FK
    
    #Relationships
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    user : Mapped["User"] = relationship()
    
    def serialize(self):
        return {
           "id": self.id,
            "found_lcation": self.found_location,
            "actual_location": self.actual_location,
            "found_time": self.found_time,
            "name": self.name,
            "breed": self.breed,
            "physical_description": self.physical_description,
            "is_active" : self.is_active
        }
    
class SocialMedia(db.Model):
    __tablename__="social_media"
    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) 
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    email: Mapped[str] = mapped_column

    #FK
    
    #Relationships
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    user : Mapped["User"] = relationship()
    
    def serialize(self):
        return{
        "id":self.id,
        "type":self.type,
        "username":self.username,
        "email":self.email
    }
        
    
class PetImages(db.Model):
    __tablename__="pet_images"
    id:Mapped[int] = mapped_column(primary_key =  True)
    url: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) 
    
    #FK
    
    #Relationships
    pet_post_id : Mapped[int] = mapped_column(ForeignKey("pet_post.id"))
    pet_post : Mapped ["PetPost"] = relationship()
    
    def serialize(self):
        return{
            "id":self.id,
            "url":self.url
        }