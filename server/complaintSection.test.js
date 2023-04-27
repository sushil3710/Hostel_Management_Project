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


  describe("GET /getmycomplaints/:id", () => {
    // test("should return a list of complaints for the specified email ID", async () => {
    //   const response = await request(app).get("/getmycomplaints/r.patidar181001.1@gmail.com");
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.length).toBeGreaterThan(0);
    //   expect(response.body[0]).toHaveProperty("email_id", "r.patidar181001.1@gmail.com");
    // });
  
    test("should return an error if the email ID is invalid", async () => {
      const response = await request(app).get("/getmycomplaints/invalid");
      expect(response.statusCode).toBe(500);
      expect(response.text).toBe("Error getting the complaint.");
    });
  });

   