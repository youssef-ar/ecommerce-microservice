const mongoose = require('mongoose');
const request = require('supertest');
const product = require('../models/product');

const app = require('../../app');
require("dotenv").config();

jest.setTimeout(40000);

beforeAll(async()=>{
  await mongoose.connect(process.env.MONGODB_AUTH_URI);
  /* const authRes = await request('http://localhost:8000/auth')
  .post('/login')
  .send({ email: 'test@example.com', password: 'A1b2@c3D' });
  const authToken = authRes.body.token; */
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET / products" ,()=>{
  //add pagination
  it("should return all products", async()=>{
    const res = await request(app).get('');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toStrictEqual(true);
    expect(res.body.data.products).not.toBeNull();
  })

  it("should return a single product", async()=>{
    const prod = await product.findOne({name:"testProduct"});
    const productid = prod._id;
    const res = await request(app).get(`/${productid}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toStrictEqual(true);
    expect(res.body.data.products).not.toBeNull();
  })

 /*  it("should filter products by category and price range and sort by price in ascending or descending order ", async()=>{
  }) */

})

