var supertest = require('supertest');
var should = require('should');
let server = supertest.agent('http://localhost:4444');

describe('Server RestAPI unit test', function() {
  it('should GET admin pendingbid', function(done) {
    server
      .get('/admin/pendingbid')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        res.status.should.equal(200);
        done();
      });
  });
});
