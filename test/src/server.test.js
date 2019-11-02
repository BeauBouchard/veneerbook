const server = require('../../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const pkjson = require('../../package.json');

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
          res.body.data.uptime.should.exist;
          res.body.data.uptime.should.be.a('string');
          res.body.data.version.should.equal(pkjson.version)
          done();
      });
    });
  });

  describe('GET /address', () => {
    it('it should have successful GET with status of 200', (done) => {
      chai.request(server)
        .get('/address')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.exist;
          res.body.data.should.be.a('array');
          done();
      });
    });

    it('it should have a failure PUT with status of 405', (done) => {
      chai.request(server)
        .put('/address')
        .end((err, res) => {
          res.should.have.status(405);
          res.body.data.should.exist;
          res.body.data.should.be.a('array');
          done();
      });
    });
  });
});
