const server = require('../../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Main', () => {
  /**
   * Test for root route, with GET request
  **/
  describe('GET /health', () => {
    it('it should have successful GET with status of 200', (done) => {
      chai.request(server)
        .get('/health')
        .end((err, res) => {
          res.should.have.status(200);
          done();
      });
    });
  });

});
