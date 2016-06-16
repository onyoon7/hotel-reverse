var request = require('supertest');
var should = require('should');
var app = require('../../src/server.js');

describe('Server RestAPI unit test', function() {
  it('should GET admin pendingbid', function(done) {
    request(app)
      .get('/admin/pendingbid')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        res.status.should.equal(200);
        done();
      });
  });
});
