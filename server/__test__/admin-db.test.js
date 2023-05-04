const request = require('supertest');
const app = require('../app');
const path = require('path');
const pool = require("../db");
const fs = require('fs');
const { format } = require("util");
const { validateHeaderValue } = require('http');
var Promise = require('promise');


const upDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(upDir)) {
    fs.mkdirSync(upDir);

}
const uploadDir = path.join(__dirname, '..', 'public', 'HostelManagement');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);

}


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
    it('Wrong authtoken and does not add an admin', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'John Doe',
                email_id: 'johndoe@example.com',
                password: 'password123'
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a authtoken and adds an admin', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'Johnny D',
                email_id: 'johndoe@admin.com',
                password: 'password1a23'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);

    });
    it('Takes a authtoken and adds an admin', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'Johnny D',
                email_id: 'johnd222oe@admin.com',
                password: 'password1a23'
            })
            .set('authorization', '-11');

        expect(res.status).toBe(200);

    });
    it('Already added', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'Sushil',
                email_id: '2020csb1132@iitrpr.ac.in',
                password: '234'
            })
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });
    it('Wrong verify', async () => {
        const res = await request(app)
            .post('/add-admin')
            .send({
                name: 'Sushil',
                email_id: '2020csb1132@iitrpr.ac.in',
                password: '234'
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });

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
            .send({
                name: 'John Doe',
                email_id: 'johndoe@example.com',
                password: 'password123'
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a wrong authtoken and does not edit an admin', async () => {
        const res = await request(app)
            .post('/edit-admin')
            .send({
                name: 'John Doe',
                email_id: 'johndoe@example.com',
                password: 'password123'
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });

    it('Takes a authtoken and adds an admin', async () => {
        const res = await request(app)
            .post('/edit-admin')
            .send({
                name: 'John Doe',
                email_id: 'johndoe@example.com',
                password: 'password123'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        // expect(res.send).toBe("ok");
    });

});

describe('POST /edit-admin-profile', () => {
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
    it('Wrong user and does not edit an admin', async () => {
        const res = await request(app)
            .post('/edit-admin-profile')
            .send({
                name: 'John Doe',
                email_id: 'johndoe@admin.com'
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a wrong authtoken and does not edit an admin profile', async () => {
        const res = await request(app)
            .post('/edit-admin-profile')
            .send({
                name: 'John Doe',
                email_id: 'johndoe@example.com'
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });

    it('Takes a authtoken Edit Admin Profile', async () => {
        const res = await request(app)
            .post('/edit-admin-profile')
            .send({
                name: 'Sushil Kumar',
                email_id: '2020csb1132@iitrpr.ac.in'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        // expect(res.send).toBe("Ok");
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
            .set('authorization', `${authToken1}`);
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

describe('GET /getAllRequest', () => {
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
            .get('/getAllRequest')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get afees', async () => {
        const res = await request(app)
            .get('/getAllRequest')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/getAllRequest')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});



describe('GET /admin/getcomplaints', () => {
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
            .get('/admin/getcomplaints')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get afees', async () => {
        const res = await request(app)
            .get('/admin/getcomplaints')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/admin/getcomplaints')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});

describe('GET /admin/solvedcomplaints', () => {
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
            .get('/admin/solvedcomplaints')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get afees', async () => {
        const res = await request(app)
            .get('/admin/solvedcomplaints')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/admin/solvedcomplaints')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});

describe('GET /getAllInfo/:id', () => {
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

    it('Not user ', async () => {
        const id = 1;
        const res = await request(app)
            .get(`/getAllInfo/${id}`)
            .set('authorization', `${authToken}`)


        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Getinfo', async () => {
        const id = 1;
        const res = await request(app)
            .get(`/getAllInfo/${id}`)
            .set('authorization', `${authToken1}`)


        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('wrong verification', async () => {
        const id = 1;
        const res = await request(app)
            .get(`/getAllInfo/${id}`)
            .set('authorization', 0)


        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });

});



describe("GET /complaints/:id", () => {
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
    test("complaints not found", async () => {
        const response = await request(app)
        .get("/complaints/1000")
        .set('authorization', `${authToken1}`)

        expect(response.statusCode).toBe(500);
    });
    test("complaints Done ", async () => {
        const response = await request(app)
        .get("/complaints/1")
        .set('authorization', `${authToken1}`)

        expect(response.statusCode).toBe(200);
    });
    test("Invalid user", async () => {
        const response = await request(app)
        .get("/complaints/1")
        .set('authorization', `${authToken}`)

        expect(response.statusCode).toBe(200);
    });
    // test("should return an error if the ID is invalid", async () => {
    //     const response = await request(app).get("/complaints/1000");
    //     expect(response.statusCode).toBe(500);
    //     // expect(response.text).toBe("Error getting the complaint.");
    // });
    // test("should return an error if the ID is invalid", async () => {
    //     const response = await request(app).get("/complaints/1");
    //     expect(response.statusCode).toBe(200);
    //     // expect(response.status).toBe("Got the complaint.");
    // });

});

describe('POST /add-excel', () => {

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
    afterAll(async () => {
       
        const filePath = path.join(__dirname, '..','public', 'HostelManagement', 'ExcelFiles', 'TestStudents.xlsx');
      
        await pool.query(
          "DELETE FROM excels WHERE name='TestStudents.xlsx';"
        );
        await fs.promises.unlink(filePath);
      });
      



    it('Upload file and success', async () => {
        const FilePath = path.join(__dirname, 'testData', 'TestStudents.xlsx')
        const res = await request(app)
            .post('/add-excel')
            .set('authorization', `${authToken1}`)
            .attach('excelfile', fs.createReadStream(FilePath))
            .field('excelname', 'TestStudents.xlsx')

    
        expect(res.status).toBe(200);
        expect(res.text).toBe('Ok');
    
 

    });

    it('Wrong User', async () => {
        const FilePath = path.join(__dirname, 'testData', 'TestStudents.xlsx')
        const res = await request(app)
            .post('/add-excel')
            .set('authorization', `${authToken}`)
            .attach('excelfile', fs.createReadStream(FilePath))
            .field('excelname', 'TestStudents.xlsx')

        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
        // await pool.query(
        //     "DELETE FROM excels WHERE name='TestStudents.xlsx';"
        //   );
    });
    it('Wrong token', async () => {
        const FilePath = path.join(__dirname, 'testData', 'TestStudents.xlsx')
        const res = await request(app)
            .post('/add-excel')
            .set('authorization', 0)
            .attach('excelfile', fs.createReadStream(FilePath))
            .field('excelname', 'TestStudents.xlsx')

        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
        // await pool.query(
        //     "DELETE FROM excels WHERE name='TestStudents.xlsx';"
        //   );
    });


    // afterAll(async () => {
    //     const filePath = path.join(__dirname, 'public', 'HostelManagement', 'ExcelFiles', 'TestStudents.xlsx');
      
    //     fs.unlink(filePath);
    //           await pool.query(
    //         "DELETE FROM excels WHERE name='TestStudents.xlsx';"
    //       );
      
    //   });

});


describe('GET /get-admin-profile', () => {
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
    it('Wrong User  ', async () => {
        const res = await request(app)
            .get('/get-admin-profile')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get admins profile', async () => {
        const res = await request(app)
            .get('/get-admin-profile')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Auth and get admins profile', async () => {
        const res = await request(app)
            .get('/get-admin-profile')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });



});

describe('POST /delete-excel', () => {
    const uploadDir = path.join(__dirname, '..', 'public', 'HostelManagement', 'ExcelFiles');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);

    }

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

        const filePath = path.join(__dirname, 'testData', 'TestStudents.xlsx'); // Replace with the path to your excel file
        const fileName = 'TestStudentsDel.xlsx'; // Replace with the desired file name

        // Read the excel file
        const fileData = fs.readFileSync(filePath);

        // Write the excel file to the desired directory location
        const outputFilePath = path.join(__dirname, '..', 'public', 'HostelManagement', 'ExcelFiles', fileName);
        fs.writeFileSync(outputFilePath, fileData);

        const fileUrl = format(
            `${process.env.STORAGE_BASE_URL}//public/HostelManagement/ExcelFiles/${fileName}`);

        const query = 'INSERT INTO excels (name, file_url,status) VALUES ($1, $2,0)';
        await pool.query(query, [fileName, fileUrl]);

    });


    it('Delete file and success', async () => {
        const result = await pool.query("Select * from excels where name='TestStudentsDel.xlsx';");
        const dbres = result.rows[0].file_url;
     
        const res = await request(app)
            .post('/delete-excel')
            .set('authorization', `${authToken1}`)
            .send({ excel_url: dbres })
        expect(res.status).toBe(200);
        expect(res.text).toBe('OK');

    });
    it('Wrong User', async () => {

        const res = await request(app)
            .post('/delete-excel')
            .set('authorization', `${authToken}`)
            .send({ excel_url: "http://localhost:8080//HostelManagement/ExcelFiles/TestStudentsDel.xlsx" })
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');

    });
    it('Wrong token', async () => {


        const res = await request(app)
            .post('/delete-excel')
            .set('authorization', 0)
            .send({ excel_url: "http://localhost:8080//HostelManagement/ExcelFiles/TestStudents.xlsx" })
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');

    });


});

describe('POST /add-students', () => {


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
        const query2 = await pool.query("DELETE \
        FROM login_verification\
        WHERE email_id IN (\
            SELECT email_id\
            FROM student_info\
            WHERE entry_numb = '2020TEST0000'\
        );")
        const query = await pool.query("Delete from student_info where entry_numb='2020TEST0000';");

    });
    afterAll(async () => {

        const query2 = await pool.query("DELETE \
        FROM login_verification\
        WHERE email_id IN (\
            SELECT email_id\
            FROM student_info\
            WHERE entry_numb = '2020TEST0000'\
        );")
        const query = await pool.query("Delete from student_info where entry_numb='2020TEST0000';");

    });


    it('Add students and success', async () => {


        const dbres = " http://localhost:8080//__test__/testData/TestStudents.xlsx";
        const res = await request(app)
            .post('/add-students')
            .set('authorization', `${authToken1}`)
            .send({ fileurl: dbres })

        expect(res.status).toBe(200);
        expect(res.text).toBe('2');

    });

    it('Wrong User', async () => {
        const dbres = " http://localhost:8080//__test__/testData/TestStudents.xlsx";
        const res = await request(app)
            .post('/add-students')
            .set('authorization', `${authToken}`)
            .send({ fileurl: dbres })

        expect(res.status).toBe(200);

    });
    it('Wrong token', async () => {

        const dbres = " http://localhost:8080//__test__/testData/TestStudents.xlsx";

        const res = await request(app)
            .post('/add-students')
            .set('authorization', 0)
            .send({ fileurl: dbres })

        expect(res.status).toBe(200);

    });


});

describe('GET /get-excel', () => {
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
            .get('/get-excel')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get admins', async () => {
        const res = await request(app)
            .get('/get-excel')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/get-excel')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});


describe('GET /get-students', () => {
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
            .get('/get-students')
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });
    it('Auth and get admins', async () => {
        const res = await request(app)
            .get('/get-students')
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("ok");
    });
    it('Wrong Token', async () => {
        const res = await request(app)
            .get('/get-students')
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.text).toBe("1");
    });

});

describe('POST /add-student', () => {
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
       
        const query = await pool.query("Delete from student_info where email_id='johndoe1@example.com'\
         OR email_id='johndoe2@example.com'\
         OR email_id='johndoe3@example.com'\
         OR email_id='johndoe4@example.com' \
         OR email_id='johndoe5@example.com' \
         OR email_id='johndoe6@example.com' \
         ;");
        const query2 = await pool.query("Delete from login_verification where email_id='johndoe1@example.com'\
         OR email_id='johndoe2@example.com'\
         OR email_id='johndoe3@example.com'\
         OR email_id='johndoe4@example.com' \
         OR email_id='johndoe5@example.com' \
         OR email_id='johndoe6@example.com' \
         ;");


    });
    // afterAll(async () => {
    //     // get an auth token for testing purposes

    //     await pool.query("Delete from student_info where email_id='johndoe1@example.com'\
    //      OR email_id='johndoe2@example.com'\
    //      OR email_id='johndoe3@example.com'\
    //      OR email_id='johndoe4@example.com' \
    //      OR email_id='johndoe5@example.com' \
    //      OR email_id='johndoe6@example.com' \
    //      ;");
    //     await pool.query("Delete from login_verification where email_id='johndoe1@example.com'\
    //      OR email_id='johndoe2@example.com'\
    //      OR email_id='johndoe3@example.com'\
    //      OR email_id='johndoe4@example.com' \
    //      OR email_id='johndoe5@example.com' \
    //      OR email_id='johndoe6@example.com' \
    //      ;");


    // });

    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe1@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '1'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe1@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe1@example.com';")


    });

    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe2@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '2'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe2@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe2@example.com';")


    });

    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe3@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '3'
            })
            .set('authorization', `${authToken1}`);


        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe3@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe3@example.com';")

    });

    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe4@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '4'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe4@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe4@example.com';")


    });

    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe5@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '5'
            })
            .set('authorization', `${authToken1}`);


        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe5@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe5@example.com';")


    });


    it('Adds a Student', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: 'johndoe6@example.com',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '6'
            })
            .set('authorization', `${authToken1}`);


        expect(res.status).toBe(200);
        expect(res.text).toBe("Ok");
        await pool.query("Delete from student_info where email_id='johndoe6@example.com';")
        await pool.query("Delete from login_verification where email_id='johndoe6@example.com';")


    });

    it('Already exists', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'John Doe',
                email_id: '2020csb1132@iitrpr.ac.in',
                entry_numb: '2222EEB1201',
                password: 'password123',
                room_numb: 'BS321',
                hostel_id: '6'
            })
            .set('authorization', `${authToken1}`);


        expect(res.status).toBe(200);
        expect(res.text).toBe("2");


    });
    it('Wrong User', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'Johnny D',
                email_id: 'johndoe@exxxample.com',
                password: 'password1a23'
            })
            .set('authorization', `${authToken}`);

        expect(res.status).toBe(200);
        expect(res.text).toBe("1");

    });
    it('verified error', async () => {
        const res = await request(app)
            .post('/add-student')
            .send({
                name: 'Sushil',
                email_id: '2020csb1100032@iitrpr.ac.in',
                password: '234'
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);

    });

});

describe('POST /delete-admin', () => {
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
        await pool.query("Insert into admins(name,email_id,admin_type) values('TestName','testid@test',0)");
      

    });
    it('Wrong user', async () => {
        const res = await request(app)
            .post('/delete-admin')
            .send({
                email_id: 'johndoe@exampleee.com',
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a authtoken and deletes an admin', async () => {
        const res = await request(app)
            .post('/delete-admin')
            .send({
                email_id: 'testid@test',
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);

    });
    it('Already delete', async () => {
        const res = await request(app)
            .post('/delete-admin')
            .send({
                name: 'Sushil',
                email_id: 'johndoe@admin.comn',
                password: '234'
            })
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });
    it('Wrong verify', async () => {
        const res = await request(app)
            .post('/delete-admin')
            .send({

                email_id: '2020csb1132@iitrpr.ac.in',
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });

});

describe('POST /delete-student', () => {
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
        await pool.query("Insert into student_info(email_id) values('abc@gmail.com');")

    });
    it('Wrong user', async () => {
        const res = await request(app)
            .post('/delete-student')
            .send({
                email_id: 'johndoe@exampleee.com',
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a authtoken and deletes an admin', async () => {
        const res = await request(app)
            .post('/delete-student')
            .send({
                email_id: 'abc@gmail.com',
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);

    });
    it('Not Present', async () => {
        const res = await request(app)
            .post('/delete-student')
            .send({
                name: 'Sushil',
                email_id: 'johndoe@admin.comn',
                password: '234'
            })
            .set('authorization', `${authToken1}`);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });
    it('Wrong verify', async () => {
        const res = await request(app)
            .post('/delete-student')
            .send({

                email_id: '2020csb1132@iitrpr.ac.in',
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });

});


describe('POST /add-fees-record', () => {
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
    it('Wrong authtoken and does not add an admin', async () => {
        const res = await request(app)
            .post('/add-fees-record')
            .send({
                fees_type: 'Mess',
                year: '2020',
                semester: '2',
                amount: '1000'
            })
            .set('authorization', `${authToken}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Takes a authtoken and adds fee record', async () => {
        const res = await request(app)
            .post('/add-fees-record')
            .send({
                fees_type: 'Hostel',
                year: '2020',
                semester: '2',
                amount: '19090'
            })
            .set('authorization', `${authToken1}`);

        expect(res.status).toBe(200);
        await pool.query("delete from fees_records where fees_amount=$1",['19090'])
    });

    it('Wrong verify', async () => {
        const res = await request(app)
            .post('/add-fees-record')
            .send({
                fees_type: 'Mess',
                year: '2020',
                semester: '2',
                amount: '1000'
            })
            .set('authorization', 0);
        expect(res.status).toBe(200);
        // expect(res.send).toBe("2");
    });

});

describe('POST /view-excel', () => {
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
            .post('/view-excel')
            .set('authorization', `${authToken}`)
            .send({ fileurl: 'http://localhost:8080//__test__/testData/TestStudents.xlsx' });
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    it('Auth and View Excel', async () => {
        const res = await request(app)
            .post('/view-excel')
            .set('authorization', `${authToken1}`)
            .send({ fileurl: 'http://localhost:8080//__test__/testData/TestStudents.xlsx' });
        expect(res.status).toBe(200);
        expect(res.text).toBe("2");
    });

    it('Unidentified url', async () => {
        const res = await request(app)
            .post('/view-excel')
            .set('authorization', 0)
            .send({ fghhurl: "jjn" });
        expect(res.status).toBe(200);
        expect(res.text).toBe("1");
    });
    
    // it('Unidentified url', async () => {
    //     const res = await request(app)
    //         .post('/view-excel')
    //         .set('authorization', `${authToken1}`)
    //         .send({ fileurl: "No file error 0 can't open" });
    //     expect(res.status).toBe(200);
    //     expect(res.text).toBe("0");
    // });

});


describe("POST /updateStatus/:id", () => {

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
    test("Update status  complaint not found", async () => {
        const response = await request(app)
        .post("/updateStatus/100")
        .set('authorization', `${authToken1}`)

        expect(response.statusCode).toBe(404);
    });
    test("Update staus Done ", async () => {
        const response = await request(app)
        .post("/updateStatus/1")
        .set('authorization', `${authToken1}`)

        expect(response.statusCode).toBe(200);
    });
    test("Invalid user", async () => {
        const response = await request(app)
        .post("/updateStatus/100")
        .set('authorization', `${authToken}`)

        expect(response.statusCode).toBe(200);
    });
    test("Verify error", async () => {
        const response = await request(app)
        .post("/updateStatus/100")
        .set('authorization', 0)

        expect(response.statusCode).toBe(200);
    });
});

describe("POST /complaints/solve/:id", () => {

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
    test("complaint not found", async () => {
        const response = await request(app)
        .post("/complaints/solve/1000")
        .set('authorization', `${authToken1}`)
        expect(response.statusCode).toBe(404);
    });
    test("Solve complaint Done ", async () => {
        const response = await request(app)
        .post("/complaints/solve/1")
        .set('authorization', `${authToken1}`)

        expect(response.statusCode).toBe(200);
        await pool.query("UPDATE complaint_details SET complaint_status='pending' WHERE complaint_id=1",);
    });
    test("Invalid user", async () => {
        const response = await request(app)
        .post("/complaints/solve/1")
        .set('authorization', `${authToken}`)

        expect(response.statusCode).toBe(200);
    });
    test("Verify error", async () => {
        const response = await request(app)
        .post("/complaints/solve/1")
        .set('authorization', 0)

        expect(response.statusCode).toBe(200);
    });
});





