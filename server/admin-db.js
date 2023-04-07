const pool = require("./db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 0) {
    return res.send("1");
  }

  let info = req.body;

  /** Edit admin_info */
  await bcrypt.hash(info.password, saltRounds, async function (err, hash) {
    const edit = await pool.query(
      "UPDATE admins SET name = $1, passwd=$2,admin_type = $3 WHERE email_id = $4;",
      [info.name, hash,info.admin_type, info.email_id]
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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
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

  if (!verified) {
    return res.send("1"); /** Error, logout on user side */
  }

  /** Get role */
  var userRole = jwt.decode(authToken).userRole;
  if (userRole !== 0 && userRole !== 1 && userRole !== 3) {
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


module.exports = {
  add_admin,
  edit_admin,
  get_admins,
  delete_admin,
  get_admin_profile,
  edit_admin_profile,
};
