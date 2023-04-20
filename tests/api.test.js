process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

describe('GraphQL API integration tests', () => {
  it('should return a valid response for a GraphQL query', async () => {
    const response = await request(app)
      .post('/hospital/graphql')
      .send({
        query: `
        mutation CreateEmergencyAlert {
            createEmergencyAlert(alert: "m ded", patient: "pop smoke") {
              _id
              alert
              patient
            }
          }
        `
      })
      .set('Accept', 'application/json');
      
    expect(response.status).toEqual(200);
    expect(response.body.data.createEmergencyAlert).toLenght>1;
  });
});
