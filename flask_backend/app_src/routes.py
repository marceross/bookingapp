from datetime import datetime, timedelta
from flask import render_template, request, redirect, flash, url_for, jsonify
from flask_login import login_user, current_user, login_required, logout_user
from sqlalchemy import desc

from app_src import app, bcrypt, db
from app_src.models import User, GYM, Activity, ActivityTimeSlot, Reservation


@app.errorhandler(404)
def not_found(e):
    print(e)
    flash('404')
    return redirect(url_for('home'))


@app.route('/index')
@app.route('/')
def home():
    # if current_user.is_authenticated and not current_user.is_admin:
    if current_user.is_authenticated :
        return render_template('index.html')
    else:
        next_page = request.args.get('next')
        return render_template('login.html', next_page=next_page)


@app.route('/logging_in', methods=["POST"])
def logging_in():

    email = request.form["email"]
    pwd = request.form["password"]
    usr = User.query.filter_by(email=email).first()

    if usr is None:
        flash('Invalid Login')
        return redirect(url_for('home'))
    elif bcrypt.check_password_hash(usr.password, pwd):
        login_user(user=usr, remember=True)
        next_page = request.form.get('next')

        if next_page:
            return redirect(next_page)
        else:
           return redirect(url_for('home'))
    else:
        flash('Incorrect Login Credentials')
        return redirect(url_for('home'))
    

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))




@app.route('/api/get_current_user')
def get_currenr_user():
    return_data = {
        'user_id': current_user.id, 
        'user_name': current_user.user_name,
        'first_name': current_user.first_name,
        'sur_name': current_user.sur_name,
        'email': current_user.email,
        'dob': current_user.dob.strftime('%Y-%m-%d'),
        'phone_number_1': current_user.phone_number_1,
        'phone_number_2': current_user.phone_number_2,
        'is_verified ': current_user.is_verified,
    }
    return jsonify(return_data)


@app.route('/api/get_gym_details')
def get_gym_details():
    gym = GYM.query.filter_by(owner_id=current_user.id).first()
    if gym:
        return_data = {
            'gym_id': gym.id,
            'name': gym.name,
            'description': gym.description,
            'picture_1_file_path': gym.picture_1_file_path,
            'picture_2_file_path': gym.picture_2_file_path,
            'picture_3_file_path': gym.picture_3_file_path,
            'location ': gym.location,
            'email': gym.email,
            'phone_number': gym.phone_number,
        }
    else:
        # No gym for current user
        return_data = {}
    return jsonify(return_data)



@app.route('/api/update_user', methods=["POST"])
@login_required
def update_user():

    user_name = request.form["user_name"]
    first_name = request.form["first_name"]
    sur_name = request.form["sur_name"]
    dob = request.form["dob"]
    phone_number_1 = request.form["phone1"]
    phone_number_2 = request.form["phone2"]
    profile_picture_file_path = request.form["profile_pic"]
    medic_certificate_file_path = request.form["medic_certificate"]
    email = request.form["email"]

    # profile and medic store on certain location and save that path with filename on db
    dob = datetime.strptime(dob, '%Y-%m-%d')

    exist = User.query.filter_by(email=email).first()
    if exist:
        flash('Email already Taken')
        return redirect(url_for('home'))
        # return redirect(url_for('update_user_html'))
    else:
        current_user.user_name = user_name
        current_user.first_name = first_name
        current_user.sur_name = sur_name
        current_user.dob = dob
        current_user.phone_number_1 = phone_number_1
        current_user.phone_number_2 = phone_number_2
        current_user.profile_picture_file_path = profile_picture_file_path
        current_user.medic_certificate_file_path = medic_certificate_file_path
        current_user.email = email

        db.session.commit()

        flash('User Details updated successfully')
        return redirect(url_for('home'))


@app.route('/add_gym', methods=["POST"])
@login_required
def add_gym():

    name = request.form["name"]
    description = request.form["description"]
    picture_1_file_path = request.form["picture_1_file_path"]
    picture_2_file_path = request.form["picture_2_file_path"]
    picture_3_file_path = request.form["picture_3_file_path"]
    location = request.form["location"]
    email = request.form["email"]
    phone_number = request.form["phone_number"]
    
    gym = GYM(owner_id=current_user.id,
              name=name,
              description=description,
              picture_1_file_path=picture_1_file_path,
              picture_2_file_path=picture_2_file_path,
              picture_3_file_path=picture_3_file_path,
              location=location,
              email=email,
              phone_number=phone_number)
    
    db.session.add(gym)
    db.session.commit()
    flash('Gym Added successfully')
    return redirect(url_for('home'))


@app.route('/update_gym', methods=["POST"])
@login_required
def update_gym():

    name = request.form["name"]
    description = request.form["description"]
    picture_1_file_path = request.form["picture_1_file_path"]
    picture_2_file_path = request.form["picture_2_file_path"]
    picture_3_file_path = request.form["picture_3_file_path"]
    location = request.form["location"]
    email = request.form["email"]
    phone_number = request.form["phone_number"]

    gym = GYM.query.filter_by(owner_id=current_user.id).first()
        
    gym.name=name
    gym.description=description
    gym.picture_1_file_path=picture_1_file_path
    gym.picture_2_file_path=picture_2_file_path
    gym.picture_3_file_path=picture_3_file_path
    gym.location=location
    gym.email=email
    gym.phone_number=phone_number

    db.session.commit()
    flash('Gym Details Updated successfully')
    return redirect(url_for('home'))


@app.route('/add_activity', methods=["POST"])
@login_required
def add_activity():

    name = request.form["name"]
    description = request.form["description"]
    picture_1_file_path = request.form["picture_1_file_path"]
    picture_2_file_path = request.form["picture_2_file_path"]
    
    # currently we have only one gym so we can directly query from gym table based on user id
    # while update to multi gym under one user we need to ask from user this is for which gym 
    gym = GYM.query.filter_by(owner_id=current_user.id).first()

    activity = Activity(gym_id=gym.id,
                        name=name,
                        description=description,
                        picture_1_file_path=picture_1_file_path,
                        picture_2_file_path=picture_2_file_path)
    
    db.session.add(activity)
    db.session.commit()
    flash('Activity Added successfully')
    return redirect(url_for('home'))


# update activity 
# this is not in current version
@app.route('/update_activity', methods=["POST"])
@login_required
def update_activity():

    # this is need to send in hidden in form of previous page ie. update_activty_html
    id = request.form['activity_id']
    name = request.form["name"]
    description = request.form["description"]
    picture_1_file_path = request.form["picture_1_file_path"]
    picture_2_file_path = request.form["picture_2_file_path"]

    # currently we have only one gym so we dont want to update
    # while update to multi gym under one user we need to ask from user this is for which gym  

    activity = Activity.query.filter_by(id=id).first()
 
    activity.name=name
    activity.description=description
    activity.picture_1_file_path=picture_1_file_path
    activity.picture_2_file_path=picture_2_file_path
   
    db.session.commit()
    flash('Activity Details Updated successfully')
    return redirect(url_for('home'))


# delete activity
# this is not in current version
@app.route('/delete_activity', methods=["POST"])
@login_required
def delete_activity():

    # this is need to send in hidden in form of previous page ie. delete_activty_html
    id = request.form['activity_id']
    
    activity = Activity.query.filter_by(id=id).first()
    
    db.session.delete(activity)
    db.session.commit()
    flash('Activity Deleted successfully')
    return redirect(url_for('home'))


@app.route('/add_activity_timeslot', methods=["POST"])
@login_required
def add_activity_timeslot():

    # this is need to send in hidden in form of previous page ie. add_activity_timeslot_html
    activity_id = request.form['activity_id']
    date = request.form["date"]
    time = request.form["time"]
    room_count = request.form["room_count"]
    
    date = datetime.strptime(date, '%Y-%m-%d')
    time = datetime.strptime(date, '%H:%M')
    
    activity_timeslot = ActivityTimeSlot(activity_id=activity_id,
                                         date=date,
                                         time=time,
                                         room_count=room_count)
    
    db.session.add(activity_timeslot)
    db.session.commit()
    flash('Activity TimeSlot Added successfully')
    return redirect(url_for('home'))


@app.route('/update_activity_timeslot', methods=["POST"])
@login_required
def update_activity_timeslot():

    # this is need to send in hidden in form of previous page ie. update_activity_timeslot_html
    id = request.form['activity_timeslot_id']
    # this is need to send in hidden in form of previous page ie. update_activity_timeslot_html 
    # or we can take that from quering activitytimeslot table by using id 
    activity_id = request.form['activity_id']
    date = request.form["date"]
    time = request.form["time"]
    room_count = request.form["room_count"]

    date = datetime.strptime(date, '%Y-%m-%d')
    time = datetime.strptime(date, '%H:%M')   

    activity_timeslot = ActivityTimeSlot.query.filter_by(id=id).first()
    
    activity_timeslot.date = date
    activity_timeslot.time = time
    activity_timeslot.room_count = room_count

    db.session.commit()
    flash('Activity TimeSlot Updated successfully')
    return redirect(url_for('home'))


@app.route('/delete_activity_timeslot', methods=["POST"])
@login_required
def delete_activity_timeslot():

    # this is need to send in hidden in form of previous page ie. delete_activity_timeslot_html
    id = request.form['activity_timeslot_id']

    activity_timeslot = ActivityTimeSlot.query.filter_by(id=id).first()
    
    db.session.delete(activity_timeslot)
    db.session.commit()
    flash('Activity TimeSlot Deleted successfully')
    return redirect(url_for('home'))


# add reservation
@app.route('/add_reservation', methods=["POST"])
@login_required
def add_reservation():

    # this is need to send in hidden in form of previous page ie. add_reservation_html
    activity_timeslot_id = request.form['activity_timeslot_id']

    reservation = Reservation(user_id=current_user.id,
                              activity_timeslot_id=activity_timeslot_id)
    
    db.session.add(reservation)
    db.session.commit()
    flash('Reservation Added successfully')
    return redirect(url_for('home'))


# delete reservation (Deadline : before 3hrs)
@app.route('/delete_reservation', methods=["POST"])
@login_required
def delete_reservation():

    # this is need to send in hidden in form of previous page ie. delete_reservation_html
    id = request.form['reservation_id']

    reservation = Reservation.query.filter_by(id=id).first()
    
    activity_timeslot = ActivityTimeSlot.query.filter_by(id=reservation.activity_timeslot_id).first()
    
    date_ = activity_timeslot.time
    time_ = activity_timeslot.time
    datetime_ = date_ + ' ' + time_
    datetime_ = datetime.strptime(datetime_, '%Y-%m-%d %H:%M')

    now = datetime.now()
    modify_now = now + timedelta(minutes = 180)
    modify_now = modify_now.strftime('%Y-%m-%d %H:%M')
    modify_now = datetime.strptime(modify_now, '%Y-%m-%d %H:%M')

    if modify_now <= datetime_:
        db.session.delete(reservation)
        db.session.commit()
        flash('Reservation Deleted successfully')
        return redirect(url_for('home'))
    else:
        flash('Reservation Cancelation is only allowed for 3hours before the event')
        return redirect(url_for('home'))


# show activites
@app.route('/list_activities', methods=["POST"])
@login_required
def list_activities():
    
    # this can also done by more accurate recent update first by take activytimeslot from desc 
    # and use activtyid from that and query or join with it
    activity = Activity.query.order_by(desc(Activity.id)).all()
    return activity


# show my reservations
@app.route('/my_reservations', methods=["POST"])
@login_required
def my_reservations():

    reserved_activites_details = []
    reservations = Reservation.query.filter_by(user_id=current_user.id).all()
    for reservation in reservations:
        activity_timeslot = ActivityTimeSlot.query.filter_by(id=reservation.activity_timeslot_id).first()
        activity = Activity.query.filter_by(id=activity_timeslot.activity_id).first()

        reserved_activity = {
            'activity_timeslot': activity_timeslot,
            'activity': activity,
        }
        reserved_activites_details.append(reserved_activity)

    # reserved_activites_details[0]['activity'].name
    # reserved_activites_details[0]['activity'].description
    # reserved_activites_details[0]['activity'].gym_id # .pic1 # .pic2
    # reserved_activites_details[0]['activity_timeslot'].date
    # reserved_activites_details[0]['activity_timeslot'].time
    return reserved_activites_details


# show my activity time slots
# this is only for one activty in current version
@app.route('/my_activity_timeslots', methods=["POST"])
@login_required
def my_activity_timeslots():

    # this activity id is need to send in hidden in form of previous page ie. html page
    activity_id = request.form['activity_id']
    activity_timeslots = ActivityTimeSlot.query.filter_by(activity_id=activity_id).order_by(ActivityTimeSlot.date).order_by(ActivityTimeSlot.time).all()
    return activity_timeslots


# show my activities
# show reservation for my activity
# this is not in current version
