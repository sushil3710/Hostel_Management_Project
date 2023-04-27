const request = require('supertest');
const app = require('./app');
const pool = require("./db");

describe('GET /get-user-info', () => {
    let authToken;
    let authToken1;
    beforeAll(async () => {
        // get an auth token for testing purposes
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password: 'root',
            });
        const res1 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: '2020csb1118@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
    
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-user-info')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.email_id).toBe('rohitkinha1612@gmail.com');
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-user-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
    });

});
describe('GET /get-profile-info', () => {
    let authToken;
    let authToken1;
    beforeAll(async () => {
        // get an auth token for testing purposes
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password: 'root',
            });
        const res1 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: '2020csb1118@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;

    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-profile-info')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.email_id).toBe('rohitkinha1612@gmail.com');
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-profile-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
    });

});
describe('GET /get-fees-info', () => {
    let authToken;
    let authToken1;
    beforeAll(async () => {
        // get an auth token for testing purposes
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password: 'root',
            });
        const res1 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: '2020csb1118@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;

    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-info')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });

});
describe('GET /get-fees-history', () => {
    let authToken;
    let authToken1;
    beforeAll(async () => {
        // get an auth token for testing purposes
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password: 'root',
            });
        const res1 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: '2020csb1118@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;

    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });

});
describe('GET /get-fees-history', () => {
    let authToken;
    let authToken1;
    beforeAll(async () => {
        // get an auth token for testing purposes
        const res = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'rohitkinha1612@gmail.com',
                password: 'root',
            });
        const res1 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: '2020csb1118@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;

    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });

});