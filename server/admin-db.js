const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { format } = require("util");
const { exec } = require("child_process");
const saltRounds = 10;
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
var Promise = require('promise');

const upDir = path.join(__dirname, 'public');
if (!fs.existsSync(upDir)) {
  fs.mkdirSync(upDir);
  
}
const uploadDir = path.join(__dirname, 'public', 'HostelManagement');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
 
}
dotenv.config();

/** Add admin */
const add_admin = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Add admin (before that check that no other admin has already this id)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Check if this email is already an admin */
  const check = await pool.query(
    "SELECT * FROM login_verification WHERE email_id = $1;",
    [info.email_id]
  );

  if (check.rows.length !== 0) {
    return res.send("2"); /** Email ID already exists */
  }

  /** Add email_id */

  await bcrypt.hash(info.password, saltRounds, async function (err, hash) {
    const add = await pool.query(
      "INSERT INTO admins(name, email_id,passwd ,admin_type) VALUES($1, $2, $3, 0 );",
      [info.name, info.email_id, hash]
    );
  });


  return res.send("Ok");
};

/** Edit admin */
const edit_admin = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Edit admin info
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  await bcrypt.hash(info.password, saltRounds, async function (err, hash) {
    const edit = await pool.query(
      "UPDATE admins SET name = $1, passwd=$2,admin_type = 0 WHERE email_id = $3;",
      [info.name, hash, info.email_id]
    );
  });

  return res.send("Ok");
};

/** Get admins */
const get_admins = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Return all the admins (except this one, so that he cannot delete himself)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from admins WHERE email_id <> $1;",
    [email]
  );

  return res.send(results.rows);
};
const get_fees_record = async (req, res) => {
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
 
  if (userRole !== 0) {
    return res.send("1");
  }

  const results = await pool.query("SELECT * from fees_records;");

  return res.send({ results: results.rows });

};

const add_fees_record = async (req, res) => {
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
  if (userRole !== 0 ) {
    return res.send("1");
  }
  let info = req.body;
  const results = await pool.query(
    "INSERT INTO" +
    " fees_records(fees_type,year,semester,fees_amount) VALUES($1,$2,$3,$4);",
    [
      info.fees_type,
      info.year,
      info.semester,
      info.amount,
    ]
  );
  return res.send("Ok");
};
/** Delete admins */
const delete_admin = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Delete the given admin
   * 3. Delete the correpsonding entry from the login_verification table
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  const delete_from_admins_table = await pool.query(
    "DELETE FROM admins WHERE email_id = $1;",
    [info.email_id]
  );
  const delete_from_login_verification_table = await pool.query(
    "DELETE FROM login_verification WHERE email_id = $1;",
    [info.email_id]
  );

  return res.send("Ok");
};

const get_admin_profile = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Return admn profile data
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from admins WHERE email_id = $1;",
    [email]
  );

  return res.send(results.rows[0]);
};

/** Edit admin */
const edit_admin_profile = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Edit admin info
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  const edit = await pool.query(
    "UPDATE admins SET name = $1 WHERE email_id = $2;",
    [info.name, info.email_id]
  );

  return res.send("Ok");
};

const add_excel = async (req, res) => {
  
  const uploadDir = path.join(__dirname,'public','HostelManagement', 'ExcelFiles');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;
  let promises = [];
  let vals=Object.values(req.files);

  for (let f of vals) {
    const filename = info.excelname;
    const filepath = path.join(uploadDir, filename);


    promises.push(
      new Promise((resolve, reject) => {
        fs.writeFile(filepath, f[0].buffer, async (err) => {
          if (err) {
            f[0].localStorageError = err;next(err);reject(err);
          }
          
          url = format(
            `${process.env.STORAGE_BASE_URL}/public/HostelManagement/ExcelFiles/${filename}`);

             await pool.query(
              "Insert into excels(name, file_url,status) values($1,$2,0);",
                [info.excelname,url]);
          
          //resolve();
      
        });
      })
    
    );
    Promise.allSettled(promises).then(
      res.status(200).send("Ok") /** Confirm, rerender */
    );
    }
};

const get_excel = async (req, res) => {
  
  /**
   * 1. Perform jwt auth
   * 2. Return all the admins (except this one, so that he cannot delete himself)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from excels;"
  );
  
  return res.send(results.rows);
};


const delete_excel = async(req, res) => {
  let info = req.body;
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
  if (userRole !== 0) {
    return res.send("1");
  }



const fileUrl = info.excel_url;
const startIndex = fileUrl.indexOf("ExcelFiles/") + "ExcelFiles/".length;
const newString = fileUrl.substring(startIndex);
const filePath = path.join(__dirname,'public','HostelManagement','ExcelFiles',newString);

  fs.unlink(filePath, (err) => {

    // delete record from database
    pool.query(
      "DELETE FROM excels WHERE file_url=$1;",
      [fileUrl],
      (err, result) => {
        if (err) {
          return res.send("1");
        }
        return res.send("OK");
      }
    );
  });
};

const add_students = async (req, res) => {
  const url = req.body.fileurl;
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
  if (userRole !== 0) {
    return res.send("1");
  }

 // console.log(url)
  if (url === "" || url==undefined) return res.send("0");
  const startIndex = url.indexOf("//") + 2;
  const endIndex = url.indexOf("//", startIndex) + 2;
  const result = url.substring(endIndex);
  const excelpath = path.join(__dirname,result);

  const workbook = await XLSX.readFile(excelpath);

  const sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheet_name];
  const emailColumn = "Email_ID";

  const rows = XLSX.utils.sheet_to_json(worksheet)
    .filter(row => row[emailColumn]); // Filter out rows without an email address
  
  for (const row of rows) {
    const { Email_ID, Name, Entry_Number, Hostel_ID,Room_Number} = row;
    if (Email_ID) {

      const { rows: existingRows } = await pool.query(
        "SELECT email_id FROM student_info WHERE email_id = $1 UNION SELECT email_id FROM admins WHERE email_id = $1",
        [Email_ID]
      );
      
      if (existingRows.length === 0) {
        
      // If the row has an email address, insert it and the other data into the database
      if(Hostel_ID===1){
        await pool.query(
          "INSERT INTO student_info(email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Satluj',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      else if(Hostel_ID===2){
        await pool.query(
          "INSERT INTO student_info (email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Beas',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      else if(Hostel_ID===3){
        await pool.query(
          "INSERT INTO student_info (email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Chenab',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      else if(Hostel_ID===4){
        await pool.query(
          "INSERT INTO student_info (email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Raavi',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      else if(Hostel_ID===5){
        await pool.query(
          "INSERT INTO student_info (email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Brahmaputra',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      else if(Hostel_ID===6){
        await pool.query(
          "INSERT INTO student_info (email_id,full_name,entry_numb,hostel_id,passwd,hostel_name,room_numb) VALUES ($1, $2, $3, $4,'root','Jhelum',$5)",
          [Email_ID, Name, Entry_Number,Hostel_ID,Room_Number]
        );

      }
      }

    }
  }

  
  const new_url = format(
    `${process.env.STORAGE_BASE_URL}/HostelManagement/${url}`);


 await pool.query(
    "Update excels set status=1 where file_url=$1;",
    [new_url]    
  );
 
  return res.send("2");
};

const add_student = async (req, res) => {
  /**
   * 1. Perform jwt authentication
   * 2. Add admin (before that check that no other admin has already this id)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Check if this email is already an admin */
  const check = await pool.query(
    "SELECT email_id FROM student_info WHERE email_id = $1 UNION SELECT email_id FROM admins WHERE email_id = $1",
    [info.email_id]
  );

  if (check.rows.length !== 0) {
    return res.send("2"); /** Email ID already exists */
  }

  /** Add student */
  await bcrypt.hash(info.password, saltRounds, async function (err, hash) {
    if (err) throw err; // Handle error
  
    let hostelName;
  

    switch (parseInt(info.hostel_id)) {
      case 1:
        hostelName = "Satluj";
        break;
      case 2:
        hostelName = "Beas";
        break;
      case 3:
        hostelName = "Chenab";
        break;
      case 4:
        hostelName = "Raavi";
        break;
      case 5:
        hostelName = "Brahmaputra";
        break;
      case 6:
        hostelName = "Jhelum";
        break;
      default:
        throw new Error("Invalid hostel ID");
    }
    await pool.query(
      
      "INSERT INTO student_info(email_id,passwd,entry_numb,hostel_id,hostel_name,full_name,room_numb) VALUES($1, $2, $3, $4,$5,$6,$7 );",
      [info.email_id, hash, info.entry_numb, info.hostel_id, hostelName,info.name,info.room_numb]
    );
  });



  return res.send("Ok");
};

const get_students = async (req, res) => {
  /**
   * 1. Perform jwt auth
   * 2. Return all the admins (except this one, so that he cannot delete himself)
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  /** Get email */
  var email = jwt.decode(authToken).userEmail;

  const results = await pool.query(
    "SELECT * from student_info;"
  );

  return res.send(results.rows);
};


const delete_student = async (req, res) => {

  /**
   * 1. Perform jwt auth
   * 2. Delete the given admin
   * 3. Delete the correpsonding entry from the login_verification table
   */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;


 await pool.query(
    "DELETE FROM student_info WHERE email_id = $1;",
    [info.email_id]
  );
await pool.query(
    "DELETE FROM login_verification WHERE email_id = $1;",
    [info.email_id]
  );

  return res.send("Ok");
};

async function get_all_complaints(req, res) {
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */
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
  if (userRole !== 0) {
    return res.send("1");
  }
  try {
    const { rows } = await pool.query("SELECT * FROM complaint_details");
    res.json(rows);
  } catch (err) {

    res.status(500).send("Error getting all complaints.");
  }
}


async function get_complaints(req, res) {
  const { id } = req.params;
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
  if (userRole !== 0) {
    return res.send("1");
  }
  // try {

    const { rows } = await pool.query("SELECT * FROM complaint_details WHERE complaint_id=$1", [id]);
    if (rows.length === 0) {
      res.status(500).send("Error getting the complaint.");
    }
    else{
      res.json(rows); }

  // } catch (err) {

  //   res.status(500).send("Error getting the complaint.");
  // }
}


async function get_all_solved_complaints(req, res) {
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */

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
  if (userRole !== 0) {
    return res.send("1");
  }
  try {
    const { rows } = await pool.query("SELECT * FROM complaint_details WHERE complaint_status='done'");
    res.json(rows);
  } catch (err) {

    res.status(500).send("Error getting all complaints.");
  }
}
async function solveIt(req, res) {

  const { id } = req.params;
  
  var info = req.body;
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */

  /**
   * Verify using authToken
   */
//   authToken = req.headers.authorization;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   var verified = null;

//   try {
//     verified = jwt.verify(authToken, jwtSecretKey);
//   } catch (error) {
//     return res.send("1"); /** Error, logout on user side */
//   }

//   // if (!verified) {
//   //   return res.send("1"); /** Error, logout on user side */
//   // }

//   /** Get role */
//   var userRole = jwt.decode(authToken).userRole;
//   if (userRole !== 0) {
//     return res.send("1");
//   }
  
  // try {
    const { rowCount } = await pool.query("UPDATE complaint_details SET complaint_status='done' WHERE complaint_id=$1", [id]);

    if (rowCount === 1) {
      res.status(200).send(`Complaint with id ${id} has been marked as solved`);
    } else {
      res.status(404).send(`Complaint with id ${id} not found`);
    }
  // } catch (err) {
  //   res.status(500).send("Error updating complaint status.");
  // }
}
async function get_all_requests(req, res) {
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */

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
  if (userRole !== 0) {
    return res.send("1");
  }
  const results = await pool.query("SELECT * FROM room_change_request");

  return res.send(results.rows);
}

async function get_all_info(req, res) {
  const { id } = req.params;
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */

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
  if (userRole !== 0) {
    return res.send("1");
  }
  const results = await pool.query(
    "SELECT * FROM student_info WHERE email_id = $1;",
    [id]
  );

  return res.send(results.rows[0]);
 
}

async function statusUpdater(req, res) {
  const { id } = req.params;
  var info = req.body;
  /**
  * 1. Perform jwt auth
  * 2. Delete the given admin
  * 3. Delete the correpsonding entry from the login_verification table
  */

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
  if (userRole !== 0) {
    return res.send("1");
  }

  // try {
    const { rowCount } = await pool.query("UPDATE room_change_request SET request_status=$1 , admin_comment = $2 WHERE id = $3", [info.option, info.adminComment, id]);

    if (rowCount === 1) {
      res.status(200).send(`Complaint with id ${id} has been marked as solved`);
    } else {
      res.status(404).send(`Complaint with id ${id} not found`);
    }
  // } catch (err) {

  //   res.status(500).send("Error updating complaint status.");
  // }
}

const view_excel = async (req, res) => {
  const url = req.body.fileurl;

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
  if (userRole !== 0) {
    return res.send("1");
  }


  if (url === "" || url === undefined) return res.send("0");

  const startIndex = url.indexOf("//") + 2;
  const endIndex = url.indexOf("//", startIndex) + 2;
  const result = url.substring(endIndex);
  const excelpath = path.join(__dirname,result);

  exec(`start excel "${excelpath}"`, (error, stdout, stderr) => {
    // if (error) {
    //   return res.send("0");
    // }    

  });

  return res.send("2");
};

module.exports = {
  add_admin,
  edit_admin,
  get_admins,
  delete_admin,
  get_admin_profile,
  edit_admin_profile,
  get_fees_record,
  add_fees_record,
  add_excel,
  get_excel,
  add_students,
  delete_excel,
  add_student,
  get_students,
  delete_student,
  get_all_complaints,
  get_complaints,
  get_all_solved_complaints,
  solveIt,
  get_all_info,
  statusUpdater,
  get_all_requests,
  view_excel,
};
