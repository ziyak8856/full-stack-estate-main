import request from 'supertest';
import { app, server } from '../app'; // Import your Express app
import prisma from '../lib/prisma.js'; // Import Prisma for database operations

//let server; // Declare server variable outside of the test suite

describe('User Registration', () => {
  // Define a user object to be used for testing
  const testUser = {
    username: 'oooo',
    email: 'oop@example.com',
    password: 'password123',
  };

 

  afterAll(async () => {
    if (server) {
      server.close(); // Close the server after running all tests
    }
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'User created successfully' });

    // Cleanup: Delete the user created during the test
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });

  it('should return 500 if registration fails', async () => {
    // Omitting required fields to force a registration failure
    const invalidUser = { username: 'invaliduser' };
    const res = await request(app)
      .post('/api/auth/register')
      .send(invalidUser);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to create user!' });
  });
});
