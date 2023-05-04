const request = require('supertest');
const { validateHeaderValue } = require('http');
const app = require('../app');

describe('POST /get-fee-in-excel',()=>  {
    let authToken;
    let authToken1;
    beforeAll(async()=>{

        const req1=await request(app)
        .post('/auth/signin/verify')
        .send({
            email:"rohitkinha1612@gmail.com",
            password:"root"
        });
        const req2=await request(app)
        .post('/auth/signin/verify')
        .send({
            email:"2020csb1132@iitrpr.ac.in",
            password:"root"
        });
        authToken=req1.body.token;
        authToken1=req2.body.token
});

it('List Download of students with right auth',async()=>{
    const res=await request(app)
    .post('/get-fee-in-excel')
    .set('authorization',`${authToken1}`)
    .send({fee_id:"1"});

    expect(res.status).toBe(200);
    expect(res.get('content-type')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

});

it('Wrong User auth',async()=>{
    const res=await request(app)
    .post('/get-fee-in-excel')
    .set('authorization',`${authToken}`)
    .send({fee_id:"1"});

    expect(res.status).toBe(200);

});
it('Wrong User auth',async()=>{
    const res=await request(app)
    .post('/get-fee-in-excel')
    .set('authorization',0)
    .send({fee_id:"1"});

    expect(res.status).toBe(200);

});



});