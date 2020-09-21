from datetime import datetime

from app_src.models import User
from app_src import db, bcrypt

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
