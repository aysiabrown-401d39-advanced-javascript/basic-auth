'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const User = require('../src/auth/models/user-model');
require('@code-fellows/supergoose');

describe('basic auth', () => {
    it('should be able to POST to /signup to create a new user', () => {
        const newSignUp = {'username': 'test', 'password':'12345'};
        const data = mockRequest.post('/signup').query(newSignUp);
        expect(data).toBeTruthy();
    })

    it('should be able to POST to /signin to login as a user', () => {
        const newSignUp = {'username': 'test', 'password':'12345'};
        mockRequest.post('/signup').query(newSignUp);
        let user = mockRequest.post('/signin').auth('test','12345');
        expect(user.username).toBe('test');
    })
})



// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)
// This is going to require more “end to end” testing that you’ve done in the past
// To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in
// Ensure that you use supergoose to test your routes and your database