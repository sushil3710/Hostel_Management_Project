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
        email: 'rohitkinh1612@gmail.com',
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
        password: 'rot',
      });

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(0);
  });

});


describe('POST auth/forgotpassword/otp', () => {

  it('Takes an email and send otp to it and update the otp in database', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: 'rohitkinha1612@gmail.com' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(2);
  });
  // test('waits for 4 seconds and passes', done => {
  //   setTimeout(() => {
  //     expect(true).toBe(true);
  //     done();
  //   }, 1000);
  // });
  it('Takes an admin email and send otp to it and update the otp in database', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: '2020csb1118@iitrpr.ac.in' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(2);
  });
  // it('Takes an new email and send otp to it and insert the mail and otp in database', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/otp')
  //     .send({ email: '2020csb1115@iitrpr.ac.in' });

  //   expect(response.status).toBe(200);
  //   expect(response.result).toBe('2');
  // });
  it('Wrong email is passed', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: '' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });

});

describe('POST /auth/forgotpassword/verify', () => {
  beforeAll(async () => {
    // Get a client object from the pool
    client = await pool.connect();
  });

  // Tear down the database connection pool and client after all tests
  afterAll(async () => {
    await client.release();
    // await pool.end();
  });
  
  // it('Takes an email and send otp to it and update the otp in database', async () => {
  //   // const res = await client.query("select * from forgot_password_verification where email_id = $1", ['rohitkinha1612@gmail.com']);
    
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/verify')
  //     .send({ email: 'rohitkinha1612@gmail.com', otp, password: 'root', confirm_password : 'root'});

  //   expect(response.status).toBe(200);
  //   expect(response.body.result).toBe(0);
  // });
  // it('Takes an old email and send otp to it and update the otp in database', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/verify')
  //     .send({ email: '2020csb1118@iitrpr.ac.in', otp:'sad', password: 'root', confirm_password: 'root' });

  //   expect(response.status).toBe(200);
  //   expect(response.body.result).toBe(2);
  // });
  it('empty otp', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'rohitkinha1612@gmail.com', otp: '', password: 'root', confirm_password: 'root' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(0);
  });
  // it('password != cnfm pass', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/verify')
  //     .send({ email: 'rohitkinha1612@gmail.com', otp: 'asd', password: 'root', confirm_password: 'oot' });

  //   expect(response.status).toBe(200);
  //   expect(response.body.result).toBe(3);
  // });

});

describe('POST /contact-us', () => { 
  it('send a mail', async () => {
    const response = await request(app)
      .post('/contact-us')
      .send({ firstName : 'test_name' ,lastName : 'test', email: 'rohitkinha1612@gmail.com', phone : '234567', message: 'root' });

    expect(response.status).toBe(200);
  });
});
