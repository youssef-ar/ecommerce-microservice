const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const {mongoURI} = require('../config/index');

jest.setTimeout(40000);

beforeAll(async()=>{
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST / signup" ,()=>{

  it("should signup a new user", async()=>{
    const res = await request(app).post('/signup').send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({success:true, message: "User registered successfully"});
  })

  it("should return validation errors for invalid signup data", async()=>{
    const res = await request(app).post('/signup').send({email:'test',password:'123'});
    expect(res.statusCode).toBe(422);
    expect(res.body.errors.length).toBeGreaterThan(0);
  })

  it("should not signup a user with an email address that already exists in the system", async()=>{
    const res = await request(app).post('/signup').send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(409);
    expect(res.body).toStrictEqual({success:false, message: "email address already exists in the system"});
  })

})

describe("POST /login", ()=>{

  it("should login a registered user", async()=>{
    const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).not.toBeNull();

  })

  it("should return validation errors for invalid signup data", async()=>{
    const res = await request(app).post('/login').send({email:'test',password:'123'});
    expect(res.statusCode).toBe(422);
    expect(res.body.errors.length).toBeGreaterThan(0);
  })

  it("should not login with incorrect credentials", async()=>{
    const res = await request(app).post('/login').send({ email: 'worngtest@example.com', password: 'password' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toStrictEqual({success:false, message: "Invalid email or password"});
  })
})

