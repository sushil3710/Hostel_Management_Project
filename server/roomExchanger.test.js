const request = require('supertest');
const app = require('./app');
const pool = require("./db.js");

describe('GET /myRoomRequest/:id', () => {
    test('should return a list of room change requests for the given email ID', async () => {
        const response = await request(app).get('/myRoomRequest/testuser@example.com');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    test('should return an error message for an invalid email ID', async () => {
        const response = await request(app).get('/myRoomRequest/invalidemail');
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Error getting your requests.');
    });
});

describe('GET /updateStatus/:id', () => {

    it('updates status and comment in database', async () => {
        const response = await request(app)
            .post('/updateStatus/3')
            .send({ option: 'accept', adminComment: 'updated comment' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Complaint with id 3 has been marked as solved');
    });

    it('returns 404 if complaint is not found', async () => {
        const response = await request(app)
            .post('/updateStatus/0')
            .send({ option: 'approved', adminComment: 'updated comment' });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Complaint with id 0 not found');
    });

    it('returns 500 if an error occurs', async () => {

        const mockQuery = jest.spyOn(pool, 'query');
        mockQuery.mockImplementation(() => {
            throw new Error('Error updating complaint status.');
        });

        const response = await request(app)
            .post('/updateStatus/1')
            .send({ option: 'accept', adminComment: 'updated comment' });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error updating complaint status.');
        // Restore the original implementation of pool.query
        mockQuery.mockRestore();
    });

});


describe('GET /getAllRequest', () => {
    it('responds with JSON containing all room change requests', async () => {
        //   // Insert some test data into the room_change_request table using your pool object
        await pool.query("INSERT INTO room_change_request (email_id, prev_room, req_room, reason, comments, isexchange, phone, exchange_id) VALUES ('testuser1@example.com', '101', '102', 'Need a bigger room', 'Noisy neighbors', 'yes', '9876543210', '1001')");


        // Make a request to the endpoint using Supertest
        const response = await request(app).get('/getAllRequest');

        // Check that the response has a 200 status code and contains the correct data
        expect(response.statusCode).toBe(200);

    });

    it('responds with an error message if there are no requests in the database', async () => {
        // Delete all rows from the room_change_request table
        await pool.query("DELETE FROM room_change_request WHERE email_id = 'testuser1@example.com'");

        // Make a request to the endpoint using Supertest
        const response = await request(app).get('/getAllRequest');

        // Check that the response has a 500 status code and contains the correct error message
        expect(response.statusCode).toBe(200);
        //   expect(response.text).toBe('Error getting your requests.');
    });
});

describe('POST /postRoomRequest', () => {
    let insertedId;

    // afterAll(async () => {
    //   // Delete the inserted data from the database
    //   await pool.query('DELETE FROM complaint_details WHERE complaint_id = $1', [insertedId]);
    // });

    it('should insert new room request and return 200', async () => {
        const info = {
            email_id: 'test@example.com',
            prev_room: 'A101',
            req_room: 'B102',
            reason: 'Need a quieter room for studying',
            comments: 'Please let me know if this is possible.',
            isexchange: true,
            phone: '1234567890',
            exchange_id: 1234,
        };

        const res = await request(app)
            .post('/postRoomRequest')
            .send(info);

        expect(res.status).toBe(200);
        expect(res.text).toBe('Request successfully registered.');

        // console.log(response);
        // // Get the ID of the inserted data
        // insertedId = response.body.complaint_id;
    });

    it('should handle errors', async () => {
        // Mock the pool.query method to throw an error
        const mockQuery = jest.spyOn(pool, 'query');
        mockQuery.mockImplementation(() => {
            throw new Error('Error registering for room change.');
        });

        const info = {
            email_id: 'test@example.com',
            prev_room: 'A101',
            req_room: 'B102',
            reason: 'Need a quieter room for studying',
            comments: 'Please let me know if this is possible.',
            isexchange: true,
            phone: '1234567890',
            exchange_id: 1234,
        };

        const response = await request(app)
            .post('/postRoomRequest')
            .send(info);

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error registering for room change.');

        // Restore the original implementation of pool.query
        mockQuery.mockRestore();
    });
});
