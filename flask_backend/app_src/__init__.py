from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = "random_string"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///booking_app.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['CORS_HEADERS'] = 'Content-Type'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cors = CORS(app)


login_manager = LoginManager(app)
# This where redirect when login_required condition failed
login_manager.login_view = 'home'


from app_src import routes
