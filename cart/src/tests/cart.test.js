const mongoose = require('mongoose');
const request = require('supertest');
const Cart = require('../models/cart'); 

const app = require('../../app');
require("dotenv").config();

jest.setTimeout(40000);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_CART_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Cart API", () => {

    describe("GET /cart", () => {
        it("should return the cart items", async () => {
          const res = await request(app)
          .get('');
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('cart');
        });
      });

    describe("GET /cart/total", () => {
        it("should return the total price of the cart items", async () => {
          const res = await request(app).get('/total');
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('total');
        });
      });
    

    describe("POST /cart", () => {
        it("should add a new product to cart", async () => {
        const res = await request(app)
            .post('')
            .send({ productId: 'validProductId', quantity: 5 });

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ success: true, message: 'Product added to cart successfully' });
        });

        it("should return an error if the product is low in inventory", async () => {
        const res = await request(app)
            .post('')
            .send({ productId: 'lowInventoryProductId', quantity: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Product is low in inventory' });
        });

        it("should return an error if productId is missing", async () => {
        const res = await request(app)
            .post('')
            .send({ quantity: 5 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Product ID is required' });
        });

        it("should return an error if quantity is missing", async () => {
        const res = await request(app)
            .post('')
            .send({ productId: 'validProductId' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Quantity is required' });
        });

        it("should return an error if productId is invalid", async () => {
        const res = await request(app)
            .post('')
            .send({ productId: 'invalidProductId', quantity: 5 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Invalid product ID' });
        });

        it("should return an error if quantity is invalid", async () => {
        const res = await request(app)
            .post('/cart')
            .send({ productId: 'validProductId', quantity: -1 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Quantity must be greater than zero' });
        });
    });

    describe("PATCH /cart/:id", () => {
        it("should update product quantity in the cart", async () => {
        const res = await request(app)
            .patch('/validCartItemId')
            .send({ quantity: 6 });

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ success: true, message: 'Cart updated successfully' });
        });

        it("should return an error if the product is low in inventory", async () => {
        const res = await request(app)
            .patch('/validCartItemId')
            .send({ quantity: 100 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Product is low in inventory' });
        });

        it("should return an error if cartItemId is invalid", async () => {
        const res = await request(app)
            .patch('/invalidCartItemId')
            .send({ quantity: 6 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Invalid cart item ID' });
        });

        it("should return an error if quantity is missing", async () => {
        const res = await request(app)
            .patch('/validCartItemId');

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Quantity is required' });
        });
    });

    describe("DELETE /cart/:id", () => {
        it("should delete product from cart", async () => {
        const res = await request(app)
            .delete('/validCartItemId');

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ success: true, message: 'Product deleted from cart successfully' });
        });

        it("should return an error if cartItemId is invalid", async () => {
        const res = await request(app)
            .delete('/invalidCartItemId');

        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual({ success: false, message: 'Invalid cart item ID' });
        });
    });

});