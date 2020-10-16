from datetime import datetime, timedelta
from flask import render_template, request, redirect, flash, url_for, jsonify
from flask_login import login_user, current_user, login_required, logout_user
from sqlalchemy import desc

from app_src import app, db, bcrypt
from app_src.models import User, Gym, Activity, ActivityTimeslot, Reservation


@app.errorhandler(404)
def not_found(e):
    return redirect(url_for('home'))


# working
@app.route('/index')
@app.route('/')
def home():
    try:

        # if current_user.is_authenticated and not current_user.is_admin:
        if current_user.is_authenticated :
            return render_template('index.html')
        else:
            next_page = request.args.get('next')
            return render_template('login.html', next_page=next_page)

    except Exception as msg:
        flash(msg)
        return render_template('login.html')


# working
@app.route('/logging_in', methods=["POST"])
def logging_in():
    try:

        email = request.form.get("email")
        pwd = request.form.get("password")
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

    except Exception as msg:
        flash(msg)
        return redirect(url_for('home'))


# working
@app.route('/logout')
@login_required
def logout():
    try:

        logout_user()
        return redirect(url_for('home'))

    except Exception as msg:
        flash(msg)
        return redirect(url_for('home'))










# working
@app.route('/api/get_current_user', methods=["GET"])
@login_required
def get_currenr_user():
    try:
        
        return_data = {
            'success': True,
            'message': '',
            'data': {
                'user_id': current_user.id, 
                'user_name': current_user.user_name,
                'first_name': current_user.first_name,
                'sur_name': current_user.sur_name,
                'email': current_user.email,
                'dob': current_user.dob.strftime('%Y-%m-%d'),
                'phone_number_1': current_user.phone_number_1,
                'phone_number_2': current_user.phone_number_2,
                'profile_picture_file_path': current_user.profile_picture_file_path,
                'medic_certificate_file_path': current_user.medic_certificate_file_path,
            }    
        }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = {'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
@app.route('/api/update_user', methods=["POST"])
@login_required
def update_user():
    try:
        user_name = request.json.get("user_name", current_user.user_name)
        first_name = request.json.get("first_name", current_user.first_name)
        sur_name = request.json.get("sur_name", current_user.sur_name)
        dob = request.json.get("dob", False)
        phone_number_1 = request.json.get("phone1", current_user.phone_number_1)
        phone_number_2 = request.json.get("phone2", current_user.phone_number_2)
        profile_picture_file_path = request.json.get("profile_pic", current_user.profile_picture_file_path)
        medic_certificate_file_path = request.json.get("medic_certificate", current_user.medic_certificate_file_path)
        email = request.json.get("email", current_user.email)

        # profile and medic store on certain location and save that path with filename on db
        if dob:
            dob = datetime.strptime(dob, '%Y-%m-%d')
        else:
            dob = current_user.dob

        exist = User.query.filter_by(email=email).first()
        if exist and email != current_user.email:
            msg = 'Email already Taken'
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

            msg = 'User Details updated successfully'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
@app.route('/api/get_gym_details', methods=["GET"])
@login_required
def get_gym_details():
    try:

        gym = Gym.query.filter_by(owner_id=current_user.id).first()
        if gym:
            return_data = {
                'success': True, 
                'message': '',
                'data': {
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
            }
        else:
            return_data = { 'success': True, 'message': 'No Gym for Current User', 'data': {} }
        
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
@app.route('/api/add_gym', methods=["POST"])
@login_required
def add_gym():
    try:

        name = request.json.get("name", '')
        description = request.json.get("description", '')
        picture_1_file_path = request.json.get("picture_1_file_path", '')
        picture_2_file_path = request.json.get("picture_2_file_path", '')
        picture_3_file_path = request.json.get("picture_3_file_path", '')
        location = request.json.get("location", '')
        email = request.json.get("email", '')
        phone_number = request.json.get("phone_number", '')
        
        gym = Gym(owner_ref = current_user,
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

        msg = 'Gym Added successfully'
        
        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
@app.route('/api/update_gym', methods=["POST"])
@login_required
def update_gym():
    try:

        gym = Gym.query.filter_by(owner_id=current_user.id).first()
        if gym:
            name = request.json.get("name", gym.name)
            description = request.json.get("description", gym.description)
            picture_1_file_path = request.json.get("picture_1_file_path", gym.picture_1_file_path)
            picture_2_file_path = request.json.get("picture_2_file_path", gym.picture_2_file_path)
            picture_3_file_path = request.json.get("picture_3_file_path", gym.picture_3_file_path)
            location = request.json.get("location", gym.location)
            email = request.json.get("email", gym.email)
            phone_number = request.json.get("phone_number", gym.phone_number)

            gym.name = name
            gym.description = description
            gym.picture_1_file_path = picture_1_file_path
            gym.picture_2_file_path = picture_2_file_path
            gym.picture_3_file_path = picture_3_file_path
            gym.location = location
            gym.email = email
            gym.phone_number = phone_number

            db.session.commit()
            msg = 'Gym Details Updated successfully'
        
        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
# list activty based on slot desc(id) and also whose have room count avail > 1 
# show activites
@app.route('/api/list_activities', methods=["GET"])
@login_required
def list_activities():
    try:
        activities_table = db.session.query(Activity, ActivityTimeslot).join(ActivityTimeslot, Activity.id == ActivityTimeslot.activity_id).order_by(desc(ActivityTimeslot.id)).all()
        activites = []

        for row in activities_table:
            activity = {
                'id': row.Activity.id,
                'name': row.Activity.name,
                'description': row.Activity.description,
                'picture_1_file_path': row.Activity.picture_1_file_path,
            }
            if activity not in activites:
                activites.append(activity)
            
        return_data = { 'success': True, 'message': '', 'data': activites }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
# return only valid  schedules ie dont return past/yesterday schedules
@app.route('/api/get_activity_details', methods=["GET"])
@login_required
def get_activity_details():
    try:
        activity_id = request.values.get("activity_id", False) 
        if activity_id:
            activity = Activity.query.filter_by(id=activity_id).first()
            if activity:
                schedules = []
                for timeslot in activity.timeslots:
                    schedule = {
                        'id': timeslot.id,
                        'date': timeslot.date.strftime('%Y-%m-%d'),
                        'time': timeslot.time.strftime('%H:%M'),
                        'room_count': timeslot.room_count, 
                        # 'room_avail': timeslot.room_avail,
                        'fee': timeslot.fee,
                        # 'discount': timeslot.discount,
                    }
                    schedules.append(schedule)

                return_data = {
                    'success': True, 
                    'message': '',
                    'data': {
                        'id': activity.id,
                        'name': activity.name,
                        'description': activity.description,
                        'picture_1_file_path': activity.picture_1_file_path,
                        'schedules': schedules,
                    }
                }
            else:
                return_data = { 'success': True, 'message': 'Activity Not Found', 'data': {} }
            return jsonify(return_data), 200
        else:
            return_data = { 'success': True, 'message': 'Activity Not Found', 'data': {} }
            return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
# list only which all are upcoming dont want old history display from today date and current time
# show my reservations
@app.route('/api/get_my_reservations', methods=["GET"])
@login_required
def get_my_reservations():
    try:

        reservation_details = []
        reservations = current_user.reservations
    
        for reservation in reservations:
            activity_timeslot = ActivityTimeslot.query.filter_by(id=reservation.activity_timeslot_id).first()
            activity = Activity.query.filter_by(id=activity_timeslot.activity_id).first()

            reserved_activity = {
                'reservation_id': reservation.id,
                'name': activity.name,
                'date': activity_timeslot.date.strftime('%Y-%m-%d'),
                'time': activity_timeslot.time.strftime('%H:%M'),
                'fee': activity_timeslot.fee,
            }
            reservation_details.append(reserved_activity)

        return_data = { 'success': True, 'message': '', 'data': reservation_details }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
# check for is valid activy and timeslot (not an old activyslot (past slot))
# before reservation we need to check he already reserved for that slot or not 
# if he did early we dont reserve again 
# check room count avail or not
# and also we need to reduce room count avail for that slot
# add reservation
@app.route('/api/add_reservation', methods=["POST"])
@login_required
def add_reservation():
    try:

        activity_timeslot_id = request.json.get('activity_timeslot_id', False)
        if activity_timeslot_id:
            activity_timeslot = ActivityTimeslot.query.filter_by(id=activity_timeslot_id).first()
            if activity_timeslot:
                reservation = Reservation(user_ref=current_user,
                                        activity_timeslot_ref=activity_timeslot)
                if reservation:                   
                    db.session.add(reservation)
                    db.session.commit()
                    msg = 'Reservation Added successfully'
                else:
                    msg = 'No such Reservation'
            else:
                msg = 'No such Activity Timeslot'
        else:
            msg = 'activity_timeslot_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# after delete reservation add the rrom count to coresponding timeslot
# delete reservation (Deadline : before 3hrs)
@app.route('/api/delete_reservation', methods=["POST"])
@login_required
def delete_reservation():
    try:

        reservation_id = request.json.get('reservation_id', False)
        if reservation_id:
            reservation = Reservation.query.filter_by(id=reservation_id).first()
            if reservation:
                date_ = reservation.activity_timeslot_ref.date.strftime('%Y-%m-%d')
                time_ = reservation.activity_timeslot_ref.time.strftime('%H:%M')
                datetime_ = date_ + ' ' + time_
                datetime_ = datetime.strptime(datetime_, '%Y-%m-%d %H:%M')

                now = datetime.now()
                modify_now = now + timedelta(minutes = 180)
                modify_now = modify_now.strftime('%Y-%m-%d %H:%M')
                modify_now = datetime.strptime(modify_now, '%Y-%m-%d %H:%M')

                if modify_now <= datetime_:
                    db.session.delete(reservation)
                    db.session.commit()
                    msg = 'Reservation Deleted successfully'
                else:
                    msg = 'Reservation Cancelation is only allowed for 3hours before the event'
            else:
                msg = 'No such Reservation'
        else:
            msg = 'reservation_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
# sort by activityy time slot
# show my activities
@app.route('/api/get_my_activities',methods=["GET"])
@login_required
def show_my_activities():
    try:
    
        my_activities = []

        for gym in current_user.gyms:
            for activity in gym.activities:
                my_activity = {
                    'id': activity.id,
                    'name': activity.name,
                    # 'rating': activity.rating,
                }
                my_activities.append(my_activity)
            
        return_data = { 'success': True, 'message': '', 'data': my_activities }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500
    

# working
@app.route('/api/add_activity', methods=["POST"])
@login_required
def add_activity():
    try:

        name = request.json.get("name", '')
        description = request.json.get("description", '')
        picture_1_file_path = request.json.get("picture_1_file_path", '')
        timeslots = request.json.get("timeslots", [])
            
        # currently we have only one gym so we can directly query from gym table based on user id
        # while update to multi gym under one user we need to ask from user this is for which gym ie. 
        # gym = Gym.query.filter_by(id=gym_id).first()   
        gym = Gym.query.filter_by(owner_id=current_user.id).first()

        activity = Activity(gym_ref=gym,
                            name=name,
                            description=description,
                            picture_1_file_path=picture_1_file_path,
                            picture_2_file_path='')
        
        db.session.add(activity)
        db.session.commit()

        for timeslot in timeslots:
            date = timeslot.get("date", '')
            time = timeslot.get("time", '')
            fee = timeslot.get("fee", '')
            room_count = timeslot.get("room_count", '')
            # discount = timeslot.get("discount", '')
            
            if date:
                date = datetime.strptime(date, '%Y-%m-%d')
            if time:
                time = datetime.strptime(time, '%H:%M')
            
            activity_timeslot = ActivityTimeslot(activity_ref=activity,
                                                date=date,
                                                time=time,
                                                fee=fee,
                                                room_count=room_count)
            
            db.session.add(activity_timeslot)
        
        db.session.commit()
        msg = 'Activity Added successfully'
        
        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


@app.route('/api/add_activity_timeslot', methods=["POST"])
@login_required
def add_activity_timeslot():
    try:

        activity_id = request.json.get('activity_id', False)
        if activity_id:
            activity = Activity.query.filter_by(id=activity_id).first()
            if activity:
                
                date = request.json.get("date", '')
                time = request.json.get("time", '')
                fee = request.json.get("fee", '')
                room_count = request.json.get("room_count", '')
                # discount = request.json.get("discount", '')
                
                if date:
                    date = datetime.strptime(date, '%Y-%m-%d')
                if time:
                    time = datetime.strptime(time, '%H:%M')
                
                activity_timeslot = ActivityTimeslot(activity_ref=activity,
                                                    date=date,
                                                    time=time,
                                                    fee=fee,
                                                    room_count=room_count)
                
                db.session.add(activity_timeslot)
                db.session.commit()
                msg = 'Activity TimeSlot Added successfully'
            else:
                msg = 'No such Activity'
        else:
            msg = 'activity_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500
   

# working
@app.route('/api/update_activity_timeslot', methods=["POST"])
@login_required
def update_activity_timeslot():
    try:

        activity_timeslot_id = request.json.get('id', False)
        if activity_timeslot_id:
            activity_timeslot = ActivityTimeslot.query.filter_by(id=activity_timeslot_id).first()
            if activity_timeslot:
                date = request.json.get("date", False)
                time = request.json.get("time", False)
                room_count = request.json.get("room_count", activity_timeslot.room_count)
                fee = request.json.get("fee", activity_timeslot.fee)
                # discount = request.json.get("discount", activity_timeslot.discount)

                if date:
                    date = datetime.strptime(date, '%Y-%m-%d')
                else:
                    date = activity_timeslot.date
                
                if time:
                    time = datetime.strptime(time, '%H:%M')
                else:
                    time = activity_timeslot.time
                
                activity_timeslot.date = date
                activity_timeslot.time = time
                activity_timeslot.room_count = room_count
                activity_timeslot.fee = fee
                # activity_timeslot.discount = discount

                db.session.commit()
                msg = 'Activity TimeSlot Updated successfully'
            else:
                msg = 'No such Activity Timeslot'
        else:
            msg = 'activity_timeslot_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# working
@app.route('/api/update_activity', methods=["POST"])
@login_required
def update_activity():
    try:

        activity_id = request.json.get('activity_id', False)
        if activity_id:
            activity = Activity.query.filter_by(id=activity_id).first()
            if activity:
                name = request.json.get("name", activity.name)
                description = request.json.get("description", activity.description)
                picture_1_file_path = request.json.get("picture_1_file_path", activity.picture_1_file_path)
               
                activity.name = name
                activity.description = description
                activity.picture_1_file_path = picture_1_file_path
                
                db.session.commit()
                msg = 'Activity Details Updated successfully'
            else:
                msg = 'No such Activity'
        else:
            msg = 'activity_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500
        























'''
# this is not in current version
# need to delete its corresponding timeslots too
@app.route('/delete_activity', methods=["POST"])
@login_required
def delete_activity():
    try:

        # this is need to send in form of previous page 
        activity_id = request.form.get('activity_id', False)
        if activity_id:
            activity = Activity.query.filter_by(id=activity_id).first()
            if activity:
                db.session.delete(activity)
                db.session.commit()
                msg = 'Activity Deleted successfully'
            else:
                msg = 'No such Activity'
        else:
            msg = 'activity_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500


# this is not in current version
# before delete we need to check for reservations for this activty slot
@app.route('/delete_activity_timeslot', methods=["POST"])
@login_required
def delete_activity_timeslot():
    try:

        # this is need to send in form of previous page 
        activity_timeslot_id = request.form.get('activity_timeslot_id', False)
        if activity_timeslot_id:
            activity_timeslot = ActivityTimeslot.query.filter_by(id=activity_timeslot_id).first()
            if activity_timeslot:
                db.session.delete(activity_timeslot)
                db.session.commit()
                msg = 'Activity TimeSlot Deleted successfully'
            else:
                msg = 'No such Activity Timeslot'
        else:
            msg = 'activity_timeslot_id not found in request data'

        return_data = { 'success': True, 'message': msg, 'data': {} }
        return jsonify(return_data), 200

    except Exception as msg:
        return_data = { 'success': False, 'message': str(msg), 'data': {} }
        return jsonify(return_data), 500

'''



# show my activity time slots
# this is only for one activty in current version
'''
@app.route('/my_activity_timeslots', methods=["POST"])
@login_required
def my_activity_timeslots():

    # this activity id is need to send in hidden in form of previous page ie. html page    
    activity_id = request.form['activity_id']
    activity_timeslots = ActivityTimeslot.query.filter_by(activity_id=activity_id).order_by(ActivityTimeslot.date).order_by(ActivityTimeslot.time).all()
    return activity_timeslots
'''

# show reservation for my activity
# this is not in current version
