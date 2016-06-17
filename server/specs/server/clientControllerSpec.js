let supertest = require('supertest');
let should = require('should');
let server = supertest.agent('http://localhost:4444');

before(() => {
  require('../../src/config/init');
});

describe('Server RestAPI unit test', () => {
  it('should POST /client/signup', (done) => {
    server
      .post('/client/signup')
      .send({
          client_ID: 'tr',
          client_PW: 'tr',
          client_Name: '김태리',
          client_Email: 'tr@gmail.com',
          billingInfo: '000a-0001-0002-0003',
          member: 1
        })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('should POST /client/signin', (done) => {
    server
      .post('/client/signin')
      .send({
          client_ID: 'tr',
          client_PW: 'tr',
        })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('should POST /client/bid/:client_Email', (done) => {
    server
      .post('/client/bid/tr@gmail.com')
      .send({
        checkIn_Date: '2016-01-01',
        checkOut_Date: '2016-01-02',
        mainArea_Name: '서울',
        subArea_Name: '명동',
        bid_Price: 20000,
      })
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('should GET admin pendingbid', (done) => {
    server
      .get('/admin/pendingbid')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        res.status.should.equal(200);
        done();
      });
  });
});
