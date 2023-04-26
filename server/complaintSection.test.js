const request = require('supertest');
const app = require('./app.js');
const pool = require("./db.js");

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




  describe('POST /complaintSection/savedata', () => {
    let insertedId;
  
    // afterAll(async () => {
    //   // Delete the inserted data from the database
    //   await pool.query('DELETE FROM complaint_details WHERE complaint_id = $1', [insertedId]);
    // });
  
    it('should save a new complaint', async () => {
      const complaintData = {
        username: 'Test User',
        emailid: 'testuser@example.com',
        hostel: 'Test Hostel',
        wing: 'A',
        room: '101',
        floor: '1',
        complainttype: 'Noise',
        complaint: 'Loud music at night',
      };
  
      const response = await request(app)
        .post('/complaintSection/savedata')
        .send(complaintData);
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Complaint successfully registered.');
  
      // console.log(response);
      // // Get the ID of the inserted data
      // insertedId = response.body.complaint_id;
    });
  
    it('should handle errors', async () => {
      // Mock the pool.query method to throw an error
      const mockQuery = jest.spyOn(pool, 'query');
      mockQuery.mockImplementation(() => {
        throw new Error('Database error');
      });
  
      const complaintData = {
        username: 'Test User',
        emailid: 'testuser@example.com',
        hostel: 'Test Hostel',
        wing: 'A',
        room: '101',
        floor: '1',
        complainttype: 'Noise',
        complaint: 'Loud music at night',
      };
  
      const response = await request(app)
        .post('/complaintSection/savedata')
        .send(complaintData);
  
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error registering complaint.');
  
      // Restore the original implementation of pool.query
      mockQuery.mockRestore();
    });
  });
  


  // describe('GET /complaints/:id', () => {
  //   it('should return a complaint with the specified ID', async () => {
  //     // Insert a test complaint into the database
  //     const { rows } = await pool.query('INSERT INTO complaint_details (complaint_text, complaint_status) VALUES ($1, $2) RETURNING *', ['Test complaint', 'open']);
  //     const complaintId = rows[0].complaint_id;
  
  //     const response = await request(app)
  //       .get(`/complaints/${complaintId}`)
  //       .send();
  
  //     expect(response.status).toBe(200);
  //     expect(response.body.length).toBe(1);
  //     expect(response.body[0].complaint_text).toBe('Test complaint');
  //     expect(response.body[0].complaint_status).toBe('open');
  
  //     // Clean up the test data
  //     await pool.query('DELETE FROM complaint_details WHERE complaint_id=$1', [complaintId]);
  //   });
  
  //   it('should return 404 if complaint does not exist', async () => {
  //     const response = await request(app)
  //       .get('/complaints/999')
  //       .send();
  
  //     expect(response.status).toBe(404);
  //   });
  
  //   it('should handle errors', async () => {
  //     // Mock the pool.query method to throw an error
  //     const mockQuery = jest.spyOn(pool, 'query');
  //     mockQuery.mockImplementation(() => {
  //       throw new Error('Database error');
  //     });
  
  //     const response = await request(app)
  //       .get('/complaints/1')
  //       .send();
  
  //     expect(response.status).toBe(500);
  //     expect(response.text).toBe('Error getting the complaint.');
  
  //     // Restore the original implementation of pool.query
  //     mockQuery.mockRestore();
  //   });
  // });