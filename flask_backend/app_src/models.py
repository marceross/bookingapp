from flask_login import UserMixin
from app_src import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    sur_name = db.Column(db.String(50))
    dob = db.Column(db.DateTime)
    phone_number_1 = db.Column(db.String(20))
    phone_number_2 = db.Column(db.String(20))
    profile_picture_file_path = db.Column(db.String(200))
    medic_certificate_file_path = db.Column(db.String(200))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    is_verified = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)


# foreign key to user table
class GYM(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer)
    name = db.Column(db.String(50))
    description = db.Column(db.String(500))
    picture_1_file_path = db.Column(db.String(200))
    picture_2_file_path = db.Column(db.String(200))
    picture_3_file_path = db.Column(db.String(200))
    location = db.Column(db.String(500))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))


# foreign key to user table
# if cost of activity fixed mean add it here
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gym_id = db.Column(db.Integer)
    name = db.Column(db.String(50))
    description = db.Column(db.String(500))
    picture_1_file_path = db.Column(db.String(200))
    picture_2_file_path = db.Column(db.String(200))


# foreign key to activity table
# if cost of activity not fixed and ot vary based on time mean add it here
class ActivityTimeSlot(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_id = db.Column(db.Integer)
    date = db.Column(db.DateTime)
    time = db.Column(db.DateTime)
    room_count = db.Column(db.Integer)
    cost = db.Column(db.Integer)


# foreign key to user table
# foreign key to activity table
# foreign key to activity time solt table
class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    activity_timeslot_id = db.Column(db.Integer)
    

db.create_all()
db.session.commit()
