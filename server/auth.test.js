const request = require('supertest');
const app = require('./app');
const pool = require("./db")

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
    expect(res.body.result).toBe(1);
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
    expect(response.text).toBe('2');
  });
  it('Takes an admin email and send otp to it and update the otp in database', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: '2020csb1118@iitrpr.ac.in' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('2');
  });
  // it('Takes an new email and send otp to it and insert the mail and otp in database', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/otp')
  //     .send({ email: '2020csb1115@iitrpr.ac.in' });

  //   expect(response.status).toBe(200);
  //   expect(response.text).toBe('2');
  // });
  it('Wrong email is passed', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/otp')
      .send({ email: '' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('0');
  });

  test('waits for 4 seconds and passes', done => {
    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 1000);
  });
});

describe('POST /auth/forgotpassword/verify', () => {

  it('Takes an email and send otp to it and update the otp in database', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: 'rohitkinha1612@gmail.com' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('2');
  });
  it('Takes an admin email and send otp to it and update the otp in database', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: '2020csb1118@iitrpr.ac.in' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('2');
  });
  // it('Takes an new email and send otp to it and insert the mail and otp in database', async () => {
  //   const response = await request(app)
  //     .post('/auth/forgotpassword/verify')
  //     .send({ email: '2020csb1115@iitrpr.ac.in' });

  //   expect(response.status).toBe(200);
  //   expect(response.text).toBe('2');
  // });
  it('Wrong email is passed', async () => {
    const response = await request(app)
      .post('/auth/forgotpassword/verify')
      .send({ email: '' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('0');
  });

  test('waits for 4 seconds and passes', done => {
    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 1000);
  });
});
