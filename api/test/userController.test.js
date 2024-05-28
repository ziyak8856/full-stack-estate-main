import request from 'supertest';
import { app, server } from '../app'; // Import your Express app and server
import jwt from 'jsonwebtoken';

describe('User Controller', () => {
  let userId;
  let token;

  beforeAll(async () => {
    // Assuming you have a user already in your database
    // You can get the user ID here
    userId = '6643640cf8b86193aa9dcb62';

    // Generate a token for authentication
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY);
  });

  afterAll((done) => {
    server.close(done); // Close the server after all tests are completed
  });

  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Cookie', [`token=${token}`]); // Set the token in the request header
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Array));
    });
  });

  // Add your other test cases here

});
