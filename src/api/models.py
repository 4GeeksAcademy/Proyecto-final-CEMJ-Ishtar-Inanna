from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

db = SQLAlchemy()

app = Flask(__name__)

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
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable = False)
    
    #FK
    
    #Relationships
    

    def serialize(self):
        return {
            "id": self.id,
            "usernname": self.username,
            "email": self.email,
            "address": self.address,
            "name": self.name,
            "last_name": self.last_name,
            "phone": self.phone,
            "prof_img": self.prof_img,
            "is_active" : self.is_active
        }
        
    #HASHEO DE CONTRASEÑA
    
    def set_password(self, password):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.password_hash=hashed_password
        return "contraseña hasheada guardada exitosamente"
        
    def check_password(self, password):
        is_valid = bcrypt.check_password_hash(self.password_hash, password)
        return is_valid
        
        
        
class PetPost(db.Model):
    __tablename__ = "pet_post"
    id: Mapped[int] = mapped_column(primary_key=True)
    found_location: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) #Donde se ha encontrado
    actual_location: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    found_time: Mapped[datetime] = mapped_column(DateTime,nullable=False, default=datetime.now(),server_default=func.now()) # PONER VALOR POR DEFECTO
    name: Mapped[str] = mapped_column(String(30), nullable = False)
    breed: Mapped[str]= mapped_column(String(30), nullable = False)
    physical_description: Mapped[str] = mapped_column(String(30),nullable = True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable = False)
    
    #FK
    
    #Relationships
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    user : Mapped["User"] = relationship()
    
class SocialMedia(db.Model):
    __tablename__="social_media"
    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) 
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    #FK
    
    #Relationships
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    user : Mapped["User"] = relationship()
    
class PetImages(db.Model):
    __tablename__="pet_images"
    id:Mapped[int] = mapped_column(primary_key =  True)
    type: Mapped[str] = mapped_column(String(30),nullable = False, unique = True) 
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False) 
    
    #FK
    
    #Relationships
    pet_post_id : Mapped[int] = mapped_column(ForeignKey("pet_post.id"))
    pet_post : Mapped ["PetPost"] = relationship()