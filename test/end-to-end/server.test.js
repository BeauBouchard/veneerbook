const server = require('../../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const pkjson = require('../../package.json');

chai.use(chaiHttp);

describe('Main', () => {
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

    it('it should have a failure PUT with status of 405', (done) => {
      chai.request(server)
        .put('/health')
        .end((err, res) => {
          res.should.have.status(405);
          res.body.data.should.exist;
          res.body.data.should.be.a('array');
          done();
      });
    });
  });

  describe('GET /fakeroute', () => {
    it('it should have failure GET with status of 404', (done) => {
      chai.request(server)
        .get('/fakeroute')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.data.should.exist;
          done();
      });
    });
  });

  describe('GET /address', () => {
    it('it should have successful GET with status of 200', (done) => {
      chai.request(server)
        .get('/address')
        .query({
          city: 'new york',
          state: 'ny',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.exist;
          res.body.data.should.be.a('array');
          done();
      });
    });

    it('it should have a failure PATCH with status of 405', (done) => {
      chai.request(server)
        .patch('/address')
        .query({
          city: 'new york',
          state: 'ny',
        })
        .end((err, res) => {
          res.should.have.status(405);
          res.body.data.should.exist;
          res.body.data.should.be.a('array');
          done();
      });
    });
  });
});
