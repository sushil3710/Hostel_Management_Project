const request = require('supertest');
const app = require('../app');
const pool = require("../db");

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

describe('POST /save-communication-details', () => {
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

    test('updates student info with valid auth token and form data', async () => {
        const res = await request(app)
            .post(`/save-communication-details`)
            .set('authorization', `${authToken}`)
            .send({
                communication_address: '123 Main St',
                communication_city: 'Anytown',
                communication_state: 'CA',
                communication_pincode: '12345',
                permanent_address: '321 Elm St',
                permanent_city: 'Anytown',
                permanent_state: 'CA',
                permanent_pincode: '54321',
                mobile_number: '555-1234',
                alternate_mobile_number: '555-5678'
            });

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Ok');

        // retrieve the updated student info from the database
        const result = await pool.query(`SELECT * FROM student_info WHERE email_id = $1`, ['rohitkinha1612@gmail.com']);
        const studentInfo = result.rows[0];

        expect(studentInfo.communication_address).toBe('123 Main St');
        expect(studentInfo.communication_city).toBe('Anytown');
        expect(studentInfo.communication_state).toBe('CA');
        expect(studentInfo.communication_pincode).toBe('12345');
        expect(studentInfo.permanent_address).toBe('321 Elm St');
        expect(studentInfo.permanent_city).toBe('Anytown');
        expect(studentInfo.permanent_state).toBe('CA');
        expect(studentInfo.permanent_pincode).toBe('54321');
        expect(studentInfo.mobile_number).toBe('555-1234');
        expect(studentInfo.alternate_mobile_number).toBe('555-5678');
    });

});
// describe('POST /save-personal-info', () => {
//     let authToken;
//     let authToken1;
//     beforeAll(async () => {
//         // get an auth token for testing purposes
//         const res = await request(app)
//             .post('/auth/signin/verify')
//             .send({
//                 email: 'rohitkinha1612@gmail.com',
//                 password: 'root',
//             });
//         const res1 = await request(app)
//             .post('/auth/signin/verify')
//             .send({
//                 email: '2020csb1118@iitrpr.ac.in',
//                 password: 'root',
//             });
//         authToken = res.body.token;
//         authToken1 = res1.body.token;

//     });

//     test('saves personal info to database with valid auth token and file', async () => {
//         const formData = {
//             full_name: 'John Doe',
//             guardian: 'Jane Doe',
//             fathers_name: 'Joe Doe',
//             date_of_birth: '1990-01-01',
//             aadhar_card_number: '123456789012',
//             category: 'General',
//             is_pwd: 'No',
//             blood_group: 'O+',
//             nationality: 'Indian',
//             gender: 'Male'
//         };

//         const res = await request(app)
//             .post('/save-personal-info')
//             .set('Content-Type', 'multipart/form-data')
//             .set('authorization', `${authToken}`)
//             .field('full_name', formData.full_name)
//             .field('guardian', formData.guardian)
//             .field('fathers_name', formData.fathers_name)
//             .field('date_of_birth', formData.date_of_birth)
//             .field('aadhar_card_number', formData.aadhar_card_number)
//             .field('category', formData.category)
//             .field('is_pwd', formData.is_pwd)
//             .field('blood_group', formData.blood_group)
//             .field('nationality', formData.nationality)
//             .field('gender', formData.gender)
//             .attach('profile_image', './testData/profile_photo.jpg'); // replace with path to your test file

//         expect(res.statusCode).toBe(200);
//         expect(res.text).toBe('Ok');

//         // check if data was saved to database
//         const result = await pool.query(`SELECT * FROM student_info WHERE email_id = $1`, ['rohitkinha1612@gmail.com']);
//         expect(result.rows[0].full_name).toBe(formData.full_name);
//         expect(result.rows[0].guardian).toBe(formData.guardian);
//         expect(result.rows[0].fathers_name).toBe(formData.fathers_name);
//         expect(result.rows[0].date_of_birth).toBe(formData.date_of_birth);
//         expect(result.rows[0].aadhar_card_number).toBe(formData.aadhar_card_number);
//         expect(result.rows[0].category).toBe(formData.category);
//         expect(result.rows[0].is_pwd).toBe(formData.is_pwd);
//         expect(result.rows[0].blood_group).toBe(formData.blood_group);
//         expect(result.rows[0].nationality).toBe(formData.nationality);
//         expect(result.rows[0].gender).toBe(formData.gender);

       
//     });
// });
