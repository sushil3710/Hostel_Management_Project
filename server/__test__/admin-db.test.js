const request = require('supertest');
const app = require('../app');
const pool = require("../db");

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

describe("GET /admin/getcomplaints", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return all complaints with status 200", async () => {
        const mockQuery = jest.spyOn(pool, "query").mockImplementation(() => {
            return { rows: [{ id: 1, complaint: "Test complaint" }] };
        });

        const response = await request(app).get("/admin/getcomplaints");

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].complaint).toBe("Test complaint");
    });

    it("should return an error with status 500 if there is a server error", async () => {
        const mockError = new Error("Database connection error");
        const mockQuery = jest.spyOn(pool, "query").mockRejectedValueOnce(mockError);

        const response = await request(app).get("/admin/getcomplaints");

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error getting all complaints.");
    });
});



describe('GET /admin/solvedcomplaints', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return all solved complaints with status 200', async () => {
        const mockQuery = jest.spyOn(pool, 'query').mockImplementation(() => {
            return { rows: [{ id: 1, complaint: 'Test complaint', complaint_status: 'done' }] };
        });

        const response = await request(app).get('/admin/solvedcomplaints');

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].complaint).toBe('Test complaint');
        expect(response.body[0].complaint_status).toBe('done');
    });

    it('should return an error with status 500 if there is a server error', async () => {
        const mockError = new Error('Database connection error');
        const mockQuery = jest.spyOn(pool, 'query').mockRejectedValueOnce(mockError);

        const response = await request(app).get('/admin/solvedcomplaints');

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error getting all complaints.');
    });
});



describe('POST /complaints/solve/:id', () => {
    it('should mark the complaint as solved', async () => {
        const response = await request(app)
            .post('/complaints/solve/1')
            .send();

        expect(response.status).toBe(200);
        expect(response.text).toBe('Complaint with id 1 has been marked as solved');
    });

    it('should return 404 if complaint does not exist', async () => {
        const response = await request(app)
            .post('/complaints/solve/999')
            .send();

        expect(response.status).toBe(404);
        expect(response.text).toBe('Complaint with id 999 not found');
    });

    it('should handle errors', async () => {
        // Mock the pool.query method to throw an error
        const mockQuery = jest.spyOn(pool, 'query');
        mockQuery.mockImplementation(() => {
            throw new Error('Database error');
        });

        const response = await request(app)
            .post('/complaints/solve/1')
            .send();

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error updating complaint status.');

        // Restore the original implementation of pool.query
        mockQuery.mockRestore();
    });
});

describe("GET /complaints/:id", () => {
    // test("should return a complaint with the specified ID", async () => {
    //   const response = await request(app).get("/complaints/19");
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.length).toBeGreaterThan(0);
    //   expect(response.body[0]).toHaveProperty("complaint_id", 19);
    // });

    test("should return an error if the ID is invalid", async () => {
        const response = await request(app).get("/complaints/1000");
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe("Error getting the complaint.");
    });
});


