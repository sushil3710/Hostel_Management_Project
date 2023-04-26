const request = require('supertest');
const app = require('./app');
const pool = require("./db.js");

describe('POST /auth/signin/verify', () => {
    it('It takes a student email and password and then verify the email in the database.', async () => {
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password : 'root',
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
    it('It takes a admin email and password and then verify the email in the database.', async () => {
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
    
});   
 


describe('POST /auth/forgotpassword/otp', () => {
    it('should save a new complaint', async () => {
      
      const response = await request(app)
        .post('/auth/forgotpassword/otp')
        .send({email : 'r.patidar181001.1@gmail.com'});
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('2');
    });
  
    // it('should handle errors', async () => {
    //     // Replace the pool's getPool property with a mock implementation
    //     const mockPool = {
    //       query: jest.fn(() => {
    //         throw new Error('Database error');
    //       })
    //     };
    //     jest.replaceProperty(pool, 'getPool', jest.fn(() => mockPool));
      
    //     const response = await request(app)
    //       .post('/auth/forgotpassword/otp')
    //       .send();
      
    //     expect(response.status).toBe(500);
    //     expect(response.text).toBe('Error');
      
    //     // Restore the original implementation of pool.getPool
    //     jest.restoreAllMocks();
    //   });
      
      
  });
  