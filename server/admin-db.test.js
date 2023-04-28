const request = require('supertest');
const app = require('./app');
const pool = require("./db");

describe('POST /add-admin', () => {
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
                email: '2020csb1132@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
    
    });
    it('Takes a wrong authtoken and does not add an admin', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({  name: 'John Doe',
            email_id: 'johndoe@example.com',
            password: 'password123'})
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a authtoken and adds an admin', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({  name: 'Johnny D',
            email_id: 'johndoe@exxxample.com',
            password: 'password1a23'})
            .set('authorization', `${authToken1}`);
            
        expect(res.status).toBe(200);
        // await pool.query(
        //     "DELETE FROM admins WHERE email_id = $1;",
        //     ['johndoe@exxxample.com']
        //   );
        // expect(res.send).toBe("ok");
    });
    it('Takes a authtoken and give the user info', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'Sushi',
                email_id: '2020csb1132@iitrpr.ac.in',
                password: '234'})
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });
    // it('should return an error message if email_id already exists', async () => {
    //     const res = await request(app)
    //         .post('/add-admin')
    //         .set('authorization', `Bearer ${authToken}`)
    //         .send({
    //             name: 'John Doe',
    //             email_id: 'rohitkinha1612@gmail.com', // an email_id that already exists
    //             password: 'mypassword'
    //         });
    //     expect(res.status).toBe(400);
    //     expect(res.body.message).toBe('Email ID already exists');
    // });
});


describe('POST /edit-admin', () => {
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
                email: '2020csb1132@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
    
    });
    it('Takes a wrong authtoken and does not edit an admin', async () => {
        const res = await request(app)
            .post('/edit-admin')
            .send({  name: 'John Doe',
            email_id: 'johndoe@example.com',
            password: 'password123'})
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a wrong authtoken and does not edit an admin', async () => {
        const res = await request(app)
            .post('/edit-admin')
            .send({  name: 'John Doe',
            email_id: 'johndoe@example.com',
            password: 'password123'})
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    
    it('Takes a authtoken and adds an admin', async () => {
        const res = await request(app)
            .post('/edit-admin')
            .send({  name: 'John Doe',
            email_id: 'johndoe@example.com',
            password: 'password123'})
            .set('authorization', `${authToken1}`);
            
        expect(res.status).toBe(200);
        // expect(res.send).toBe("ok");
    });

});




describe('GET /get-admins', () => {
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
                email: '2020csb1132@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
    
    });
    it('Wrong User Role ', async () => {
        const res = await request(app)
            .get('/get-admins')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get admins', async () => {
        const res = await request(app)
            .get('/get-admins')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/get-admins')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});

describe('GET /get-admin-fees-record', () => {
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
                email: '2020csb1132@iitrpr.ac.in',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
    
    });
    it('Wrong User Role ', async () => {
        const res = await request(app)
            .get('/get-admin-fees-record')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get afees', async () => {
        const res = await request(app)
            .get('/get-admin-fees-record')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/get-admin-fees-record')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});