from flask_login import UserMixin
from app_src import db, login_manager


'''

User             - Gym              (one to many relationship)
User             - Reservation      (one to many relationship)
Gym              - Activity         (one to many relationship)
Activity         - ActivityTimeslot (one to many relationship)
ActivityTimeslot - Reservation      (one to many relationship)

'''


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(50), unique=True)
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

    gyms = db.relationship('Gym', backref='owner_ref', lazy=True)
    reservations = db.relationship('Reservation', backref='user_ref', lazy=True)


class Gym(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(50))
    description = db.Column(db.String(500))
    picture_1_file_path = db.Column(db.String(200))
    picture_2_file_path = db.Column(db.String(200))
    picture_3_file_path = db.Column(db.String(200))
    location = db.Column(db.String(500))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))

    activities = db.relationship('Activity', backref='gym_ref', lazy=True)


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gym_id = db.Column(db.Integer, db.ForeignKey('gym.id'))
    name = db.Column(db.String(50))
    description = db.Column(db.String(500))
    picture_1_file_path = db.Column(db.String(200))
    picture_2_file_path = db.Column(db.String(200))

    timeslots = db.relationship('ActivityTimeslot', backref='activity_ref', lazy=True)
    

class ActivityTimeslot(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    date = db.Column(db.DateTime)
    time = db.Column(db.DateTime)
    room_count = db.Column(db.Integer)
    fee = db.Column(db.Integer)
    
    reservations = db.relationship('Reservation', backref='activity_timeslot_ref', lazy=True)


class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    activity_timeslot_id = db.Column(db.Integer, db.ForeignKey('activity_timeslot.id'))


db.create_all()
db.session.commit()
