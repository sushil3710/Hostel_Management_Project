const request = require('supertest');
const path = require('path');
const pool = require("../db");
const fs = require('fs');
const { format } = require("util");
const { validateHeaderValue } = require('http');
const app = require('../app');

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
    it('Takes a authtoken and give the user info of student', async () => {
        const res = await request(app)
            .get('/get-user-info')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.email_id).toBe('rohitkinha1612@gmail.com');
    });
    it('Takes a wrong user token authtoken which is a token of admin type', async () => {
        const res = await request(app)
            .get('/get-user-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong user token authtoken which is a token of admin type', async () => {
        const res = await request(app)
            .get('/get-user-info')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
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
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-profile-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-profile-info')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
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
        expect(res.body.results).toBeDefined();
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-fees-info')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-fees-info')
            .set('authorization', 0);
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
        expect(res.body.results).toBeDefined();
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/get-fees-history')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });

});


describe('GET /getmycomplaints', () => {
    let authToken;
    let authToken1;
    let authToken3;
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
        const res2 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'sushilkumarkhatana8980@gmail.com',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
        authToken3 = res2.body.token;
    });
    it('Takes a authtoken and give the complaints of a particular student which has no complaint so far.', async () => {
        const res = await request(app)
            .get('/getmycomplaints')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(500);
    });
    it('Takes a authtoken and give the complaints of a particular student which has some complaints so far.', async () => {
        const res = await request(app)
            .get('/getmycomplaints')
            .set('authorization', `${authToken3}`);
        expect(res.status).toBe(200);
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/getmycomplaints')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/getmycomplaints')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
});


describe('GET /myRoomRequest', () => {
    let authToken;
    let authToken1;
    let authToken3;
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
        const res2 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'sushilkumarkhatana8980@gmail.com',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
        authToken3 = res2.body.token;
    });
    it('Takes a authtoken and give the complaints of a particular student which has no complaint so far.', async () => {
        const res = await request(app)
            .get('/myRoomRequest')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(500);
    });
    it('Takes a authtoken and give the complaints of a particular student which has some complaints so far.', async () => {
        const res = await request(app)
            .get('/myRoomRequest')
            .set('authorization', `${authToken3}`);
        expect(res.status).toBe(200);
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/myRoomRequest')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .get('/myRoomRequest')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
});

describe('POST /complaintSection/savedata', () => {
    let authToken;
    let authToken1;
    let authToken3;
    beforeAll(async () => {
        client = await pool.connect();
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
        const res2 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'r.patidar181001@gmail.com',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
        authToken3 = res2.body.token;
    });
    afterAll(async () => {
        await client.release();
    });
    it('should return 200 and a success message when valid data is sent with a valid token', async () => {
        const data = {
            username: 'Raghav',
            emailid: 'r.patidar181001@gmail.com',
            hostel: 'Beas',
            wing: 'East Wing',
            room: '101',
            floor: '1',
            complainttype: 'Maintenance',
            complaint: 'My room needs a new light bulb.',
        };

        const response = await request(app)
            .post('/complaintSection/savedata')
            .send(data)
            .set('authorization', `${authToken3}`);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Complaint successfully registered.');
        const res = await client.query("delete from complaint_details where email_id = $1", ['r.patidar181001@gmail.com']);
    });

    it('should return 401 when an invalid token is sent', async () => {
        const data = {
            username: 'Raghav',
            emailid: 'r.patidar181001@gmail.com',
            hostel: 'Beas',
            wing: 'East Wing',
            room: '101',
            floor: '1',
            complainttype: 'Maintenance',
            complaint: 'My room needs a new light bulb.',
        };

        const response = await request(app)
            .post('/complaintSection/savedata')
            .send(data)
            .set('authorization', `${authToken1}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('1');
    });
    // it('should return 500 when query data is wrong', async () => {
    //     const data = {
    //         username: 5,
    //         emailid: 'r.patidar181001@gmail.com',
    //         hostel: 'Beas',
    //         wing: 'East Wing',
    //         room: '101',
    //         floor: '1',
    //         complainttype: 'Maintenance',
    //         complaint: 'My room needs a new light bulb.',
    //     };

    //     const response = await request(app)
    //         .post('/complaintSection/savedata')
    //         .send(data)
    //         .set('authorization', `${authToken3}`);
    //     expect(response.status).toBe(500);
    //     expect(response.text).toBe('Error registering complaint.');
    //     const res = await client.query("delete from complaint_details where email_id = $1", ['r.patidar181001@gmail.com']);
    // });

    it('should return 200 and 1 when error in verify', async () => {
        const data = {
            username: 'Raghav',
            emailid: 'r.patidar181001@gmail.com',
            hostel: 'Beas',
            wing: 'East Wing',
            room: '101',
            //floor: '1',
            complainttype: 'Maintenance',
            complaint: 'My room needs a new light bulb.',
        };

        const response = await request(app)
            .post('/complaintSection/savedata')
            .send(data)
            .set('authorization', 0);
        expect(response.status).toBe(200);
        expect(response.text).toBe('1');
    });
});



describe('POST /post-Room-Request', () => {
    let authToken;
    let authToken1;
    let authToken3;
    beforeAll(async () => {
        client = await pool.connect();
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
        const res2 = await request(app)
            .post('/auth/signin/verify')
            .send({
                email: 'r.patidar181001@gmail.com',
                password: 'root',
            });
        authToken = res.body.token;
        authToken1 = res1.body.token;
        authToken3 = res2.body.token;
    });
    afterAll(async () => {
        await client.release();
    });
    it('should return 200 and a success message when valid data is sent with a valid token', async () => {
        const requestBody = {
            full_name: 'Raghav',
            email_id: 'r.patidar181001@gmail.com',
            prev_room: 'A101',
            req_room: 'B202',
            reason: 'I want a bigger room',
            comments: 'No additional comments',
            isexchange: 'false',
            phone: '1234567890',
            exchange_id: '1234'
        };

        const response = await request(app)
            .post('/post-Room-Request')
            .send(requestBody)
            .set('authorization', `${authToken3}`);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Request successfully registered.');
        const res = await client.query("delete from room_change_request where email_id = $1", ['r.patidar181001@gmail.com']);
    });

    it('should return 401 when an invalid token is sent', async () => {
        const requestBody = {
            full_name: 'Raghav',
            email_id: 'r.patidar181001@gmail.com',
            prev_room: 'A101',
            req_room: 'B202',
            reason: 'I want a bigger room',
            comments: 'No additional comments',
            isexchange: 'false',
            phone: '1234567890',
            exchange_id: '1234'
        };

        const response = await request(app)
            .post('/post-Room-Request')
            .send(requestBody)
            .set('authorization', `${authToken1}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('1');
    });
    it('should return 500 when an error in verify', async () => {
        const requestBody = {
            full_name: 'Raghav',
            email_id: 'r.patidar181001@gmail.com',
            prev_room: 'A101',
            req_room: 'B202',
            reason: 'I want a bigger room',
            comments: 'No additional comments',
            isexchange: 'false',
            phone: '1234567890',
            exchange_id: '1234'
        };

        const response = await request(app)
            .post('/post-Room-Request')
            .send(requestBody)
            .set('authorization', 0);
        expect(response.status).toBe(200);
        expect(response.text).toBe('1');
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
    it('Takes a wrong authtoken which is of admin type', async () => {
        const res = await request(app)
            .post(`/save-communication-details`)
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
    it('Takes a wrong authtoken an verify error', async () => {
        const res = await request(app)
            .post(`/save-communication-details`)
            .set('authorization',0);
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });
});

describe('POST /save-fees-details', () => {
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
    afterAll(async () => {
       
        const filePath = path.join(__dirname, '..','public', 'HostelManagement', 'FEES_RECORD', 'FeeReceiptTest.pdf');
      
        await pool.query(
          "DELETE FROM excels WHERE name='TestStudents.xlsx';"
        );
        await fs.promises.unlink(filePath);
      });
      

    test('save fees of the  Student', async () => {
        const FilePath = path.join(__dirname, 'testData', 'FeeReceiptTest.pdf')
        const res = await request(app)
            .post(`/save-fees-details`)
            .set('authorization', `${authToken}`)
            .field({
                fees_id: "501",
                full_name:"Romhit",
                entry_number:"2020CSB1108",
                email:"rohitkinha1612@gmail.com",
                fees_type:"Mess",
                year:"2020",
                semester:"2",
                fees_amount:"1000",
                fees_remarks:"Paid",
                date_of_transaction:"01-11-2020"
            })
            .attach('fees_pdf', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Ok');
        await client.query("delete from fees_records_table where student_name = $1", ['Romhit']);
    });
    test('Wrong User', async () => {
        const FilePath = path.join(__dirname, 'testData', 'FeeReceiptTest.pdf')
        const res = await request(app)
            .post(`/save-fees-details`)
            .set('authorization', `${authToken1}`)
            .field({
                fees_id: "501",
                full_name:"Rohit Kinha",
                entry_number:"2020CSB1108",
                email:"rohitkinha1612@gmail.com",
                fees_type:"Mess",
                year:"2020",
                semester:"2",
                fees_amount:"1000",
                fees_remarks:"Paid",
                date_of_transaction:"01-11-2020"
            })
            .attach('fees_pdf', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('1');
    });

    test('Wrong Verify', async () => {
        const FilePath = path.join(__dirname, 'testData', 'FeeReceiptTest.pdf')
        const res = await request(app)
            .post(`/save-fees-details`)
            .set('authorization', 0)
            .field({
                fees_id: "501",
                full_name:"Rohit Kinha",
                entry_number:"2020CSB1108",
                email:"rohitkinha1612@gmail.com",
                fees_type:"Mess",
                year:"2020",
                semester:"2",
                fees_amount:"1000",
                fees_remarks:"Paid",
                date_of_transaction:"01-11-2020"
            })
            .attach('fees_pdf', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('1');
    });


});

describe('POST /save-personal-info', () => {
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
    afterAll(async () => {
       
        const filePath = path.join(__dirname, '..','public', 'HostelManagement', 'PERSONAL_Details', 'ProfilePicTest.jpg');
      
        await fs.promises.unlink(filePath);
      });


    test('save personal info', async () => {
        const FilePath = path.join(__dirname, 'testData', 'ProfilePicTest.jpg')
        const res = await request(app)
            .post(`/save-personal-info`)
            .set('authorization', `${authToken}`)
            .field({
                full_name:"Rohit Kinha",
                guardian:"Father",
                fathers_name:"Yaad Nahi",
                date_of_birth:"15-12-2001",
                aadhar_card_number:"123456789238",
                category:"GEN",
                is_pwd:"No",
                blood_group:"A+",
                nationality:"Korean",
                gender:"Female"
            })
            .attach('profile_image', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Ok');
    });
    test('Wrong User', async () => {
        const FilePath = path.join(__dirname, 'testData', 'ProfilePicTest.jpg')
        const res = await request(app)
            .post(`/save-personal-info`)
            .set('authorization', `${authToken1}`)
            .field({
                full_name:"Rohit Kinha",
                guardian:"Father",
                fathers_name:"Yaad Nahi",
                date_of_birth:"15-12-2001",
                aadhar_card_number:"123456789238",
                category:"GEN",
                is_pwd:"No",
                blood_group:"A+",
                nationality:"Korean",
                gender:"Female"
            })
            .attach('profile_image', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('1');
    });

    test('Wrong Verify', async () => {
        const FilePath = path.join(__dirname, 'testData', 'ProfilePicTest.jpg')
        const res = await request(app)
            .post(`/save-personal-info`)
            .set('authorization', 0)
            .field({
                full_name:"Rohit Kinha",
                guardian:"Father",
                fathers_name:"Yaad Nahi",
                date_of_birth:"15-12-2001",
                aadhar_card_number:"123456789238",
                category:"GEN",
                is_pwd:"No",
                blood_group:"A+",
                nationality:"Korean",
                gender:"Female"
            })
            .attach('profile_image', fs.createReadStream(FilePath))
            ;

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('1');
    });



});