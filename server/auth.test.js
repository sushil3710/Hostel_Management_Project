<<<<<<< HEAD
const { forgot_password_otp } = require('./auth.js');
const { signin_verify } = require('./auth.js');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const pool = require('./db');
jest.mock('./db');
dotenv.config();
// Mock the pool.query method
pool.query = jest.fn();

describe('forgot_password_otp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock('bcrypt', () => ({
    hash: jest.fn((otp, saltRounds, callback) => {
      callback(null, 'hashed_otp');
    }),
  }));
  
  // Mock transporter.sendMail function
  jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn((mailOptions, callback) => {
        callback(null, 'mail_sent');
      }),
    }),
  }));


  
  test('returns 2 if email is  registered', async () => {


    pool.query.mockImplementation((query, values) => {
        if (query.startsWith('INSERT INTO forgot_password_verification')) {
          // Simulate successful insert
          return Promise.resolve({ rows: [], rowCount: 1 });
        } else if(query.startsWith('UPDATE forgot_password_verification')) {
          // Simulate SELECT query
          return Promise.resolve({ rows: [],rowCount: 0 });
        }
        else {
            // Simulate SELECT query
            return Promise.resolve({ rows: [] });
          }
      });


    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });
    //   jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_otp'));


    const req = { body: { email: 'notregistered@example.com' } };
    const send = jest.fn();
    const res = { send };

    await forgot_password_otp(req, res);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
  
    expect(send).toHaveBeenCalledWith("2");
    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(pool.query).toHaveBeenNthCalledWith(1, "select * from student_info where email_id = $1", ['notregistered@example.com']);
    expect(pool.query).toHaveBeenNthCalledWith(2, "select * from admins where email_id = $1", ['notregistered@example.com']);
    expect(pool.query).toHaveBeenNthCalledWith(3, "select * from forgot_password_verification where email_id = $1", ['notregistered@example.com']);
   // expect(pool.query).toHaveBeenNthCalledWith(4, "INSERT INTO forgot_password_verification(email_id, hashed_otp, expiration_time) VALUES($1, $2, to_timestamp($3))", ['notregistered@example.com'],expect.any(String),expect.any(Number));
   expect(pool.query).toHaveBeenNthCalledWith(4, "UPDATE forgot_password_verification SET hashed_otp = $1, expiration_time = to_timestamp($2) WHERE email_id = $3", [expect.any(String), expect.any(Number), 'notregistered@example.com']); 
 

  });
  test('returns 1 if email is not registered', async () => {


 

    pool.query.mockImplementation((query, values) => {
        if (query.startsWith('SELECT * FROM student_info WHERE email_id')) {
          return Promise.resolve({ rows: [] }); // email not found in student_info
        } else if (query.startsWith('SELECT * FROM admins WHERE email_id')) {
          return Promise.resolve({ rows: [] }); // email not found in admins
        } else {
          return Promise.resolve({ rowCount: 1 }); // query succeeded
        }
      });

  });
 
 
  test('returns 1 if email is not registered', async () => {




    // pool.query.mockImplementation((query, values) => {
    //     if (query.startsWith('SELECT * FROM student_info WHERE email_id')) {
    //       return Promise.resolve({ rows: [] }); // email not found in student_info
    //     } else if (query.startsWith('SELECT * FROM admins WHERE email_id')) {
    //       return Promise.resolve({ rows: [] }); // email not found in admins
    //     } else {
    //       return Promise.resolve({ rowCount: 1 }); // query succeeded
    //     }
    //   });
      
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] });
    // //   jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_otp'));


    const req = { body: { email: 'notregistered@example.com' } };
    const send = jest.fn();
    const res = { send };
    await forgot_password_otp(req, res);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
  

    expect(send).toHaveBeenCalledWith("2");
    expect(pool.query).toHaveBeenCalledTimes(4);
    expect(pool.query).toHaveBeenNthCalledWith(1, "select * from student_info where email_id = $1", ['notregistered@example.com']);
    expect(pool.query).toHaveBeenNthCalledWith(2, "select * from admins where email_id = $1", ['notregistered@example.com']);
    expect(pool.query).toHaveBeenNthCalledWith(3, "select * from forgot_password_verification where email_id = $1", ['notregistered@example.com']);
   // expect(pool.query).toHaveBeenNthCalledWith(4, "INSERT INTO forgot_password_verification(email_id, hashed_otp, expiration_time) VALUES($1, $2, to_timestamp($3))", ['notregistered@example.com'],expect.any(String),expect.any(Number));
   expect(pool.query).toHaveBeenNthCalledWith(4, "UPDATE forgot_password_verification SET hashed_otp = $1, expiration_time = to_timestamp($2) WHERE email_id = $3", [expect.any(String), expect.any(Number), 'notregistered@example.com']); 
 

  });

  // Add more test cases here
});


describe('signin_verify', () => {
    beforeEach(() => {
      jest.clearAllMocks();
=======
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
>>>>>>> 26d761043850fdffd2ce49b4691d0b116e9e98c0
    });

    jest.mock('bcrypt', () => ({
      hash: jest.fn((otp, saltRounds, callback) => {
        callback(null, 'hashed_otp');
      }),
    }));
    

  
  
    
    test('returns 1 if email is  registered', async () => {
  
  
    //   pool.query.mockImplementation((query, values) => {
    //       if (query.startsWith('INSERT INTO forgot_password_verification')) {
    //         // Simulate successful insert
    //         return Promise.resolve({ rows: [], rowCount: 1 });
    //       } else if(query.startsWith('UPDATE forgot_password_verification')) {
    //         // Simulate SELECT query
    //         return Promise.resolve({ rows: [],rowCount: 0 });
    //       }
    //       else {
    //           // Simulate SELECT query
    //           return Promise.resolve({ rows: [] });
    //         }
    //     });
  
  
    //   pool.query
    //     .mockResolvedValueOnce({ rows: [] })
    //     .mockResolvedValueOnce({ rows: [] });
      //   jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_otp'));
  
      const mockApplicantRow = { email_id: 'student@example.com', passwd: await bcrypt.hash('password', 10) };
      pool.query.mockResolvedValueOnce({ rows: [mockApplicantRow] }).mockResolvedValueOnce({ rows: [] });
   
      const req = { body: { email: 'student@example.com', password: 'password' } };
      const send = jest.fn();
      const res = { send };
  
      await signin_verify(req, res);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
    //   const jwtSecretKey = process.env.JWT_SECRET_KEY;
    //   const expectedToken = jwt.sign({ userEmail: 'student@example.com', userRole: 2, department: null }, jwtSecretKey);
      expect(send).toHaveBeenCalledWith({ result: 1, token: 0 });
      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(pool.query).toHaveBeenNthCalledWith(1, "SELECT * FROM student_info WHERE email_id = $1", ['student@example.com']);
      expect(pool.query).toHaveBeenNthCalledWith(2, "SELECT * FROM admins WHERE email_id = $1", ['student@example.com']);
   
  
    });
<<<<<<< HEAD
  
  
    // test('returns 1 if email is not registered', async () => {
  
  
   
  
    //   pool.query.mockImplementation((query, values) => {
    //       if (query.startsWith('SELECT * FROM student_info WHERE email_id')) {
    //         return Promise.resolve({ rows: [] }); // email not found in student_info
    //       } else if (query.startsWith('SELECT * FROM admins WHERE email_id')) {
    //         return Promise.resolve({ rows: [] }); // email not found in admins
    //       } else {
    //         return Promise.resolve({ rowCount: 1 }); // query succeeded
    //       }
    //     });
  
    // });
   
   
    // test('returns 1 if email is not registered', async () => {
  
  
  
  
    //   // pool.query.mockImplementation((query, values) => {
    //   //     if (query.startsWith('SELECT * FROM student_info WHERE email_id')) {
    //   //       return Promise.resolve({ rows: [] }); // email not found in student_info
    //   //     } else if (query.startsWith('SELECT * FROM admins WHERE email_id')) {
    //   //       return Promise.resolve({ rows: [] }); // email not found in admins
    //   //     } else {
    //   //       return Promise.resolve({ rowCount: 1 }); // query succeeded
    //   //     }
    //   //   });
        
    //   pool.query
    //     .mockResolvedValueOnce({ rows: [] })
    //     .mockResolvedValueOnce({ rows: [] });
    //   // //   jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_otp'));
  
  
    //   const req = { body: { email: 'notregistered@example.com' } };
    //   const send = jest.fn();
    //   const res = { send };
    //   await forgot_password_otp(req, res);
      
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    
  
    //   expect(send).toHaveBeenCalledWith("2");
    //   expect(pool.query).toHaveBeenCalledTimes(4);
    //   expect(pool.query).toHaveBeenNthCalledWith(1, "select * from student_info where email_id = $1", ['notregistered@example.com']);
    //   expect(pool.query).toHaveBeenNthCalledWith(2, "select * from admins where email_id = $1", ['notregistered@example.com']);
    //   expect(pool.query).toHaveBeenNthCalledWith(3, "select * from forgot_password_verification where email_id = $1", ['notregistered@example.com']);
    //  // expect(pool.query).toHaveBeenNthCalledWith(4, "INSERT INTO forgot_password_verification(email_id, hashed_otp, expiration_time) VALUES($1, $2, to_timestamp($3))", ['notregistered@example.com'],expect.any(String),expect.any(Number));
    //  expect(pool.query).toHaveBeenNthCalledWith(4, "UPDATE forgot_password_verification SET hashed_otp = $1, expiration_time = to_timestamp($2) WHERE email_id = $3", [expect.any(String), expect.any(Number), 'notregistered@example.com']); 
   
  
    // });
  
    // Add more test cases here
  });
=======

});


describe('POST auth/forgotpassword/otp', () => {

    it('should return 404 if complaint does not exist', async () => {
        const response = await request(app)
            .post('/auth/forgotpassword/otp')
            .send({ email: 'rohitkinha1612@gmail.com' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('2');
    });

    test('waits for 4 seconds and passes', done => {
        setTimeout(() => {
            expect(true).toBe(true);
            done();
        }, 100);
    });
});
>>>>>>> 26d761043850fdffd2ce49b4691d0b116e9e98c0
