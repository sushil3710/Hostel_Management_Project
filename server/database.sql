-- Active: 1680711743255@@127.0.0.1@5432@mtech
\c postgres
drop database hostel;
create database hostel;
\c hostel
CREATE TABLE signup_verification (
    email_id TEXT PRIMARY KEY,
    hashed_otp TEXT,
    expiration_time TIMESTAMP
);

CREATE TABLE forgot_password_verification (
    email_id TEXT PRIMARY KEY,
    hashed_otp TEXT,
    expiration_time TIMESTAMP
);

CREATE TABLE hostel_details (
    email_id TEXT PRIMARY KEY,
    hostel_name TEXT,
    hostel_wing TEXT,
    hostel_floor TEXT,
    hostel_room TEXT,
    hostel_warden TEXT
);

CREATE TABLE login_verification (
    email_id TEXT PRIMARY KEY,
    hashed_otp TEXT,
    expiration_time TIMESTAMP
);

CREATE TABLE student_info (
    -- Primary Keys
    email_id TEXT PRIMARY KEY,
    passwd TEXT,
    entry_numb TEXT,
    hostel_id INTEGER,
    hostel_name TEXT,
    room_numb TEXT,

    -- Personal Details
    full_name TEXT,
    guardian TEXT,
    fathers_name TEXT,
    profile_image_url TEXT,
    date_of_birth TEXT,
    aadhar_card_number TEXT,
    category TEXT,
    is_pwd TEXT,
    pwd_type TEXT,
    blood_group TEXT,
    nationality TEXT,
    gender TEXT,

    -- Communication Details
    communication_address TEXT,
    communication_city TEXT,
    communication_state TEXT,
    communication_pincode TEXT,

    permanent_address TEXT,
    permanent_city TEXT,
    permanent_state TEXT,
    permanent_pincode TEXT,

    mobile_number TEXT,
    alternate_mobile_number TEXT
);

--Currently Implemented for Admin only, caretaker role is not implemented yet
CREATE TABLE admins(
  name TEXT, 
  email_id TEXT PRIMARY KEY,
  passwd TEXT,
  admin_type INT NOT NULL
);

CREATE TABLE room_change_request(
    id SERIAL PRIMARY KEY,
    email_id TEXT,
    prev_room TEXT,
    req_room TEXT,
    reason TEXT,
    comments TEXT,
    isexchange TEXT,
    phone TEXT,
    exchange_id TEXT,
    request_status TEXT DEFAULT 'pending',
    admin_comment TEXT DEFAULT 'na',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  );

INSERT INTO room_change_request (email_id, prev_room, req_room, reason, comments, isexchange, phone, exchange_id) VALUES ('testuser@example.com', '101', '102', 'Need a bigger room', 'Noisy neighbors', 'yes', '9876543210', '1001');

 

CREATE TABLE excels(
  name TEXT, 
  file_url TEXT,
  status INTEGER
);

CREATE TABLE fees_records(
  fees_id SERIAL PRIMARY KEY,
  fees_type TEXT,
  year TEXT,
  semester TEXT,
  fees_amount TEXT
);

CREATE TABLE fees_records_table(
  fees_id INT,
  student_name TEXT,
  entry_number TEXT,
  email_id TEXT,
  fees_type TEXT,
  year TEXT,
  semester TEXT,
  fees_amount TEXT,
  date_of_transaction TEXT,
  fees_pdf_url TEXT,
  fees_remarks TEXT
);

CREATE TABLE complaint_details (
  complaint_id SERIAL PRIMARY KEY,
  name TEXT, 
  email_id TEXT,
  hostel_name TEXT,
  wing_side TEXT,
  room_number TEXT,
  floor_number TEXT,
  complaint_type TEXT,
  complaint_details TEXT,
  complaint_status TEXT DEFAULT 'pending',
  complaint_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION insert_into_login_verification()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
    INSERT INTO login_verification(email_id) VALUES(new.email_id);
	RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_insert_into_admins
  AFTER INSERT
  ON admins
  FOR EACH ROW
  EXECUTE PROCEDURE insert_into_login_verification();

CREATE TRIGGER trigger_insert_into_student_info
  AFTER INSERT
  ON student_info
  FOR EACH ROW
  EXECUTE PROCEDURE insert_into_login_verification();



-- Type = 'application' || 'offering' || 'admin'
CREATE TABLE templates (
  template_id INTEGER PRIMARY KEY,
  name TEXT,
  column_list TEXT[]
);

-- PERMANENT INSERT
INSERT INTO TEMPLATES(template_id,name,column_list) VALUES(1,'STUDENTS LIST', ARRAY[ 'entry_numb',
 'full_name', 'email_id',  'hostel_id',
    'hostel_name', 'guardian', 'fathers_name','profile_image_url','date_of_birth',
    'aadhar_card_number','category','is_pwd','pwd_type',
    'blood_group','nationality','gender',
    'communication_address','communication_city','communication_state','communication_pincode',
    'mobile_number','alternate_mobile_number'
    ]
);
INSERT INTO TEMPLATES(template_id,name,column_list) VALUES(2, 'FEES LIST', ARRAY[   'fees_id',
  'student_name',
  'entry_number','email_id',
  'fees_type','year',
  'semester','fees_amount','date_of_transaction',
'fees_pdf_url', 'fees_remarks'
    ]
);


-- Do always
INSERT INTO admins(name, email_id,passwd, admin_type) VALUES('Rohit',  '2020csb1118@iitrpr.ac.in','root', 0);
INSERT INTO admins(name, email_id,passwd ,admin_type) VALUES('Sushil', '2020csb1132@iitrpr.ac.in','root', 0);
INSERT INTO admins(name, email_id,passwd, admin_type) VALUES('Raghav',  '2020csb1115@iitrpr.ac.in','root', 0);
INSERT INTO admins(name, email_id,passwd ,admin_type) VALUES('Rohan', '2020csb1117@iitrpr.ac.in','root', 0);
INSERT INTO admins(name, email_id,passwd ,admin_type) VALUES('Pragat', '2020csb1109@iitrpr.ac.in','root', 0);

INSERT INTO student_info( full_name,entry_numb,email_id ,passwd,room_numb,hostel_id,hostel_name) values ('Rohit K','2020CSB1118','rohankhanna190@gmail.com','root','BE455','2','Beas');
INSERT INTO student_info( full_name,entry_numb,email_id ,passwd,room_numb,hostel_id,hostel_name) values ('Rohit Kinha','2020CSB1108','rohitkinha1612@gmail.com','root','SE455','1','Satluj');
INSERT INTO student_info( full_name,entry_numb,email_id ,passwd,room_numb,hostel_id,hostel_name) values ('Raghav P','2020CSB1119','r.patidar181001.1@gmail.com','1','SW455','1','Satluj');
INSERT INTO student_info( full_name,entry_numb,email_id ,passwd,room_numb,hostel_id,hostel_name) values ('Raghav patidar','2020CSB1109','r.patidar181001@gmail.com','1','BW435','2','Beas');

INSERT INTO complaint_details(name, email_id, hostel_name,wing_side,room_number,floor_number,complaint_type,complaint_details,complaint_status) VALUES('Raghav','2020csb1115@iitrpr.ac.in','test hostel','A','121','1','noise','fuck off','pending');
