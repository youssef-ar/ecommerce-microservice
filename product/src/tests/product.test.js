const mongoose = require('mongoose');
const request = require('supertest');
const product = require('../models/product');

const app = require('../../app');
require("dotenv").config();

jest.setTimeout(40000);

let authToken;
beforeAll(async()=>{
  await mongoose.connect(process.env.MONGODB_AUTH_URI);
  const authRes = await request('http://localhost:8000/auth')
  .post('/login')
  .send({ email: 'test@example.com', password: 'A1b2@c3D' });
  authToken = authRes.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST / products",()=>{
  it("should add a new product", async()=>{
    const res = await request(app)
    .post('')
    .set('Authorization', `Bearer ${authToken}`)
    .send({name: 'nametest', category:'categorytest', description:'descriptiontest', price: 5});

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({success:true, message:'Product added successfully'});
  })
  
})

describe("PATCH / products", ()=>{
  it("should modify details of existing products", async ()=>{
    const prod = await product.findOne({name:"nametest"});
    const productid = prod._id;
    const res = await request(app)
    .patch(`/${productid}?name=nameChangetest&category=categoryChangeTest&price=10&description=descriptionChangeTest`)
    .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toStrictEqual(true);
    expect(res.body.data.prodcut).not.toBeNull;
  })
})

describe("DELETE / products",()=>{
  it("should delete existing product", async()=>{
    const prod = await product.findOne({name:"nameChangetest"});
    const productid = prod._id;
    const res = await request(app)
    .delete(`/${productid}`)
    .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({success:true, message:"Product deleted successfully"});
  })
  
} )

describe("GET / products" ,()=>{
  let productid;
  beforeAll(async()=>{
    const prod = new product({name: 'nametest', category:'categorytest', description:'descriptiontest', price: 5});
    await prod.save();
    productid = prod._id;
  })
  afterAll(async()=>{
    await product.findByIdAndDelete(productid);
  })
  //add pagination
  it("should return all products", async()=>{
    const res = await request(app).get('');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toStrictEqual(true);
    expect(res.body.data.products).not.toBeNull();
  })

  it("should return a single product", async()=>{
    const res = await request(app).get(`/${productid}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toStrictEqual(true);
    expect(res.body.data.products).not.toBeNull();
  })

 /*  it("should filter products by category and price range and sort by price in ascending or descending order ", async()=>{
  }) */

})

