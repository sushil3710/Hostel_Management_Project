const request = require('supertest');
const app = require('../app');
const pool = require("../db");

describe('POST /auth/signin/verify', () => {

  it('It takes a student email and password and then verify the email in the database.', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: 'rohitkinha1612@gmail.com',
        password: 'root',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(1);
    expect(res.body.token).toBeDefined();
  });

  it('It takes a wrong email and password', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: 'notpresent@gmail.com',
        password: 'root',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(2);
  });
  it('It takes a email and wrong password', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: 'rohitkinha1612@gmail.com',
        password: 'rot',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });
  it('It takes a admin email and password', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: '2020csb1118@iitrpr.ac.in',
        password: 'root',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(3);
    expect(res.body.token).toBeDefined();
  });
  it('It takes a admin email and password', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: '2020csb1118@iitrpr.ac.in',
        password: 'rttot',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);

  });
  it('Wron admin type', async () => {
    const res = await request(app)
      .post('/auth/signin/verify')
      .send({
        email: 'wrong@iitrpr.ac.in',
        password: 'root',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);

  });

});


describe('POST auth/forgotpassword/otp', () => {

  

  it('Student first otp', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: 'rohitkinha1612@gmail.com' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(2);
    await pool.query(
      "DELETE FROM forgot_password_verification where email_id='rohitkinha1612@gmail.com';"
    );
  });


  it('Empty email is passed', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: '' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });

  it('Not Registered email is passed', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: 'anythingnotreg@iitrpr.ac.in' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(1);
    await pool.query(
      "DELETE FROM forgot_password_verification where email_id='anythingnotreg@iitrpr.ac.in';"
    );
  });

  // it('resend case', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/otp')
  //     .send({ email: 'datecheck@mail.com' });

  //   expect(response.status).toBe(200);
  //   expect(response.body.result).toBe(2);
  // });

});



describe('POST /auth/forgotpassword/verify', () => {

  afterAll(async () => {
    await pool.query(
      "Update student_info set passwd='root' where email_id='sushilkumarkhatana8980@gmail.com';"
    );
    await pool.query(
      "Update admins set passwd='root' where email_id='2020csb1132@iitrpr.ac.in';"
    );
  });
  
  it('empty otp', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'rohitkinha1612@gmail.com', otp: '', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });


  it('default case of admin', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'datecheck@mail.com', otp: 'verify_otp', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });
  it('datecheck fails', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'datecheck2@mail.com', otp: 'verify_otp', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(2);
  });


  it('password != cnfm pass', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'sushilkumarkhatana8980@gmail.com', otp: 'hashed', password: 'root', confirm_password: 'oott' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
  });

  it('student forgot pass case', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'sushilkumarkhatana8980@gmail.com', otp: 'hashed', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(1);
    await pool.query( "Update student_info set passwd='root' where email_id='sushilkumarkhatana8980@gmail.com';");
    await pool.query("Update admins set passwd='root' where email_id='2020csb1132@iitrpr.ac.in';");
  });

  it('Admin forgot Pass case', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: '2020csb1132@iitrpr.ac.in', otp: 'hashed', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(4);
     pool.query( "Update student_info set passwd='root' where email_id='sushilkumarkhatana8980@gmail.com';");
     pool.query("Update admins set passwd='root' where email_id='2020csb1132@iitrpr.ac.in';");
  });


});

describe('POST /contact-us', () => { 
  it('send a mail', async () => {
    const response = await request(app)
      .post('/contact-us')
      .send({ firstName : 'test_name' ,lastName : 'test', email: 'rohitkinha1612@gmail.com', phone : '234567', message: 'root' });

    expect(response.status).toBe(200);
  });
});
