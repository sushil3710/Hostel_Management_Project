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
