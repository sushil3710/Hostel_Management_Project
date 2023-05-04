const path = require("path");
const { format } = require("util");
const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js");
const fs = require("fs");
var express = require('express');
const { log } = require("console");
var app = express();
dotenv.config();

const upDir = path.join(__dirname, 'public');
if (!fs.existsSync(upDir)) {
  fs.mkdirSync(upDir);
}

const uploadDir = path.join(__dirname, 'public', 'HostelManagement');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);

}

const save_communication_details = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }

  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  var info = req.body;

  await pool.query(
    "UPDATE student_info SET communication_address = $1, communication_city = $2, communication_state = $3, \
                    communication_pincode = $4, permanent_address = $5, permanent_city = $6, permanent_state = $7, \
                    permanent_pincode = $8, mobile_number = $9, alternate_mobile_number = $10 WHERE email_id = $11;",
    [
      info.communication_address,
      info.communication_city,
      info.communication_state,
      info.communication_pincode,
      info.permanent_address,
      info.permanent_city,
      info.permanent_state,
      info.permanent_pincode,
      info.mobile_number,
      info.alternate_mobile_number,
      email,
    ]
  );

  return res.status(200).send("Ok");
};

const save_fees_details = async (req, res, next) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }

  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  var info = req.body;

  await pool.query(
    "INSERT INTO fees_records_table(fees_id,student_name,entry_number,email_id,fees_type,year,semester,fees_amount,date_of_transaction,fees_remarks) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)",
    [
      info.fees_id,
      info.full_name,
      info.entry_number,
      info.email,
      info.fees_type,
      info.year,
      info.semester,
      info.fees_amount,
      info.date_of_transaction,
      info.fees_remarks,
    ]
  );

  let promises = [];
  let vals = Object.values(req.files);

  const uploadDir = path.join(__dirname, 'public', 'HostelManagement', 'FEES_RECORD');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  for (let f of vals) {
    const filename = f[0].originalname;
    const filepath = path.join(uploadDir, filename);

    promises.push(
      new Promise((resolve, reject) => {
        fs.writeFile(filepath, f[0].buffer, async (err) => {
          if (err) {
return;
          }
          url = format(
            `${process.env.STORAGE_BASE_URL}/HostelManagement/FEES_RECORD/${filename}`

          );
          if (f[0].fieldname === "fees_pdf") {
            await pool.query(
              "UPDATE fees_records_table SET fees_pdf_url = $1 WHERE email_id = $2 and fees_id=$3;",
              [url, info.email,info.fees_id]
            );
          }
          resolve();

        });
      })
    );
  }
  Promise.allSettled(promises).then(
    res.status(200).send("Ok") /** Confirm, rerender */
  );
};

const save_personal_info = async (req, res, next) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }

  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  var info = req.body;

  await pool.query(
    "UPDATE student_info SET full_name = $1, guardian = $2, fathers_name = $3, \
                  date_of_birth = $4, aadhar_card_number = $5, category = $6, is_pwd = $7,blood_group=$8, \
                  nationality = $9, gender = $10 WHERE email_id = $11;",
    [
      info.full_name,
      info.guardian,
      info.fathers_name,
      info.date_of_birth,
      info.aadhar_card_number,
      info.category,
      info.is_pwd,
      info.blood_group,
      info.nationality,
      info.gender,
      email,
    ]
  );

  let promises = [];
  let vals = Object.values(req.files);

  const uploadDir = path.join(__dirname, 'public', 'HostelManagement', 'PERSONAL_Details');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  for (let f of vals) {
    const filename = f[0].originalname;
    const filepath = path.join(uploadDir, filename);

    promises.push(
      new Promise((resolve, reject) => {
        fs.writeFile(filepath, f[0].buffer, async (err) => {
          if (err) {
            return;
          }
          url = format(
            `${process.env.STORAGE_BASE_URL}/HostelManagement/PERSONAL_Details/${filename}`

          );
          if (f[0].fieldname === "profile_image") {
            await pool.query(
              "UPDATE student_info SET profile_image_url = $1 WHERE email_id = $2;",
              [url, email]
            );
          }
          resolve();

        });
      })
    );
  }
  Promise.allSettled(promises).then(
    res.status(200).send("Ok") /** Confirm, rerender */
  );
};

const get_profile_info = async (req, res) => {
  /**
   * Verify using authToken
   */
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY; 

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }

  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT full_name,guardian, fathers_name, profile_image_url, date_of_birth, aadhar_card_number, \
                              category, is_pwd, blood_group,nationality, gender,communication_address, communication_city, \
                              communication_state, communication_pincode, permanent_address, permanent_city, permanent_state, \
                              permanent_pincode, mobile_number, alternate_mobile_number, email_id\
                              FROM student_info WHERE email_id = $1;",
    [email]
  );

  return res.send(results.rows[0]);
};

const get_user_info = async (req, res) => {
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  var verified = null;

 
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  var email = jwt.decode(authToken).userEmail;
  // console.log(email);

  const results = await pool.query(
    "SELECT * FROM student_info WHERE email_id = $1;",
    [email]
  );

  // console.log(results.rows[0]);
  return res.send(results.rows[0]);
};
async function get_my_complaints(req, res) {
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  var verified = null;

  
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  var email = jwt.decode(authToken).userEmail;

  try {
    const { rows } = await pool.query("SELECT * FROM complaint_details WHERE email_id=$1", [email]);

    if (rows.length === 0) {
      res.status(500).send("Error getting the complaint.");
      return;
    }
    res.json(rows);
  } catch (err) {

    res.status(500).send("Error getting the complaint.");
  }
}

async function save_data(req, res) {
  var info = req.body;
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  var verified = null;

 
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  try {
    const { rows } = await pool.query("INSERT INTO complaint_details(name, email_id, hostel_name,wing_side,room_number,floor_number,complaint_type,complaint_details) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
      [
        info.username,
        info.emailid,
        info.hostel,
        info.wing,
        info.room,
        info.floor,
        info.complainttype,
        info.complaint,
      ]
    );

    if(rows) res.status(200).send("Complaint successfully registered.");

  } catch (err) {

    res.status(500).send("Error registering complaint.");
  }
}

const get_fees_info = async (req, res) => {
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * FROM fees_records WHERE NOT EXISTS( SELECT 1 FROM fees_records_table WHERE fees_records_table.fees_id = fees_records.fees_id AND fees_records_table.email_id = $1);",
    [email]
  );
  return res.send({ results: results.rows });
};

async function request_for_exchange(req, res) {
  var info = req.body;
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;

  
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }
  try {
    await pool.query("INSERT INTO room_change_request(full_name,email_id, prev_room, req_room,reason,comments,isexchange,phone,exchange_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);",
      [
        info.full_name,
        info.email_id,
        info.prev_room,
        info.req_room,
        info.reason,
        info.comments,
        info.isexchange,
        info.phone,
        info.exchange_id,
      ]
    );
    res.status(200).send("Request successfully registered.");

  } catch (err) {

    res.status(500).send("Error registering for room change.");
  }
}

async function get_my_requests(req, res) {
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  var email = jwt.decode(authToken).userEmail;
  try {
    const { rows } = await pool.query("SELECT * FROM room_change_request where email_id = $1 ORDER BY request_date desc", [email]);
    if (rows.length === 0) {
      res.status(500).send("Error getting your requests.");
      return;
    }
    res.json(rows);
  } catch (err) {

    res.status(500).send("Error getting your requests.");
  }
}

const get_fees_history = async (req, res) => {
  authToken = req.headers.authorization;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  var verified = null;
  try {
    verified = jwt.verify(authToken, jwtSecretKey);
  } catch (error) {
    return res.send("1"); /** Error, logout on user side */
  }
  // if (!verified) {
  //   return res.send("1"); /** Error, logout on user side */
  // }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 2) {
    return res.send("1");
  }

  var email = jwt.decode(authToken).userEmail;
  // console.log(email);

  const results = await pool.query(
    "SELECT * FROM fees_records_table where email_id=$1;",
    [email]
  );
  // console.log(results.rows[0]);
  return res.send({ results: results.rows });
};



module.exports = {
  save_personal_info,
  save_communication_details,
  get_profile_info,
  get_user_info,
  get_my_complaints,
  get_my_requests,
  save_fees_details,
  get_fees_history,
  request_for_exchange,
  save_data,
  get_fees_info,
};

