let mongoose = require("mongoose");
let Admin = require('../models/Admin');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const server = "http://localhost:8080/PeraRide/v1"
chai.use(chaiHttp);
describe('Admin', () => {
    beforeEach((done) => { //Before each test we empty the database
        Admin.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/POST admin register', () => {
      it('register admin "person" "password" ', (done) => {
        let admin = {
            admin_username: "person",
            admin_password: "password"
        }
        chai.request(server)
            .post('/user/register/admin')
            .send(admin)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

});
