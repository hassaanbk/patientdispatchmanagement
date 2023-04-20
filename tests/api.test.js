process.env.NODE_ENV = 'development';

const request = require('supertest');
const app = require('../server');
const { testTimeout } = require('./jest.config');
const { mongo } = require('mongoose');


describe('GraphQL API integration tests', () => {
  it('should return a valid response for a GraphQL query', (done) => {
    
      request(app)
        .post('/hospital/graphql')
        .send({
          query: `
          mutation CreateEmergencyAlert {
              createEmergencyAlert(alert: "m ded") {
                _id
                alert
              }
            }
          `
        })
        .set('Accept', 'application/json')
        .expect(200, done);      
      // expect(res.body.data.createEmergencyAlert._id).toBeDefined();
      // expect(res.body.data.createEmergencyAlert).lenght>1;
      
  });
});