const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware setup
app.use(helmet()); 
app.disable("x-powered-by");

// Route requests to the auth service

app.use("/auth", createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

// Route requests to the order service
app.use("/orders", createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Route requests to the product service
app.use("/products", createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

// Start the server
const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log(`API Gateway listening on port ${port}`);
});