const request = require('supertest');
const express = require('express');
const app = require('./server'); // Adjust the path as necessary to import your Express app

describe('API endpoint tests', () => {
  describe('GET /test', () => {
    it('should return Hello World!', async () => {
      const response = await request(app).get('/test');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello World!');
    });
  });

  describe('POST /signup', () => {
    it('should handle new user registration', async () => {
      const response = await request(app)
        .post('/signup')
        .send({
          name: 'John Doe',
          email: 'john@gmu.edu',
          password: '123456',
          phone: '1234567890'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should reject duplicate email', async () => {
      const response = await request(app)
        .post('/signup')
        .send({
          name: 'John Doe',
          email: 'john@gmu.edu', 
          password: 'abcdef',
          phone: '0987654321'
        });
      expect(response.statusCode).toBe(409);
    });
  });

  describe('POST /verify-password', () => {
    it('should verify user password correctly', async () => {
      const response = await request(app)
        .post('/verify-password')
        .send({
          username: 'john',
          password: '123456'
        });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /verify-password', () => {
    it('should not verify user password', async () => {
      const response = await request(app)
        .post('/verify-password')
        .send({
          username: 'john',
          password: 'asdasdasd'
        });
      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /user/:username', () => {
    it('should return user details', async () => {
      const response = await request(app).get('/user/john');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
  
  describe('POST /post-listing', () => {
    it('should post a new listing successfully', async () => {
      const newListing = {
        category: 'Electronics',
        name: 'Smartphone',
        description: 'Latest model and brand new',
        price: 299.99, // Assuming price should be a number based on the corrected curl command
        payment_methods: ['Cash'], // Updated to be an array as per the correct structure
        image: 'url-to-image',
        contact_display: true, // Updated to be a boolean
        owner_id: 'owner123',
        listing_id: 'listing123'
      };
  
      const response = await request(app)
        .post('/post-listing')
        .send(newListing);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Listing posted successfully'
      });
    });
  });  

  describe('POST /verify-ownership', () => {
    it('should verify listing ownership correctly', async () => {      
      const response = await request(app)
        .post('/verify-ownership')
        .send({
          username: 'owner123',
          listing_id: 'listing123'
        });

      expect(response.statusCode).toBe(401);
    });
  });
})