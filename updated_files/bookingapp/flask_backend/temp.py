from datetime import datetime, timedelta

from app_src.models import User, Activity
from app_src import db, bcrypt

'''
hashed_password = bcrypt.generate_password_hash("123").decode('UTF-8')
date1 = datetime.strptime('1997-04-12', '%Y-%m-%d')
date2 = datetime.strptime('1997-01-22', '%Y-%m-%d')
date3 = datetime.strptime('1997-06-21', '%Y-%m-%d')


# noinspection PyArgumentList
s = User(user_name='user1',
         first_name='user',
         sur_name='1',
         dob=date1,
         phone_number_1='+1 414 988 4321',
         phone_number_2='+1 414 988 4344',
         profile_picture_file_path='',
         medic_certificate_file_path='',
         email='user1@gmail.com',
         password=hashed_password)
db.session.add(s)

# noinspection PyArgumentList
s = User(user_name='user2',
         first_name='user',
         sur_name='2',
         dob=date2,
         phone_number_1='+1 414 688 4321',
         phone_number_2='+1 414 688 4344',
         profile_picture_file_path='',
         medic_certificate_file_path='',
         email='user2@gmail.com',
         password=hashed_password)
db.session.add(s)

# noinspection PyArgumentList
s = User(user_name='user3',
         first_name='user',
         sur_name='3',
         dob=date3,
         phone_number_1='+1 414 388 4321',
         phone_number_2='+1 414 388 4344',
         profile_picture_file_path='',
         medic_certificate_file_path='',
         email='user3@gmail.com',
         password=hashed_password)


db.session.add(s)
db.session.commit()

'''

'''

date = '2020-10-10'
date = datetime.strptime(date, '%Y-%m-%d')

time = '16:40'
time = datetime.strptime(time, '%H:%M')


date_ = date.strftime('%Y-%m-%d')
time_ = time.strftime('%H:%M')
datetime_ = date_ + ' ' + time_
datetime_ = datetime.strptime(datetime_, '%Y-%m-%d %H:%M')
print(datetime_)


now = datetime.now()
modify_now = now + timedelta(minutes = 180)
modify_now = modify_now.strftime('%Y-%m-%d %H:%M')
modify_now = datetime.strptime(modify_now, '%Y-%m-%d %H:%M')

if modify_now <= datetime_:
    msg = 'Reservation Deleted successfully'
else:
    msg = 'Reservation Cancelation is only allowed for 3hours before the event'
print(msg)
'''

user = User.query.filter_by(id=4).first()
for gym in user.gyms:
    print(gym.activities)
