process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Admin = require('../models/admin');
let Rider = require('../models/Rider');
let Station = require('../models/stations');
let Bike_issued = require('../models/bike_issued');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const server = require('../server')
chai.use(chaiHttp);


describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        Admin.remove({}, (err) => {
            done();
        });
    });

    beforeEach((done) => { //Before each test we empty the database
        Rider.remove({}, (err) => {
            done();
        });
    });

    beforeEach((done) => { //Before each test we empty the database
        Bike_issued.remove({}, (err) => {
            done();
        });
    });

    beforeEach((done) => { //Before each test we empty the database
        Station.remove({}, (err) => {
            done();
        });
    });

    let admin = {
        admin_username: 'admin',
        admin_password: 'password'
    }

    let user = {
        rider_regNo: 'user',
        rider_password: 'password',
        rider_email: 'emailaddress',
        rider_firstName: 'firstName',
        rider_lastName: 'lastName',
        rider_phone: '0123456789'
    }

    describe('/POST user login', () => {
        it('registered user login', (done) => {
            chai.request(server)
                .post('/PeraRide/v1/register/admin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(admin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response').eql('Sucessfully Registered');

                    chai.request(server)
                        .post('/PeraRide/v1/login/admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send(admin)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('response').eql('Login Success')
                            res.body.should.have.property('token')
                            res.body.should.have.property('res').to.be.true

                            let token = res.body.token;

                            chai.request(server)
                                .post('/PeraRide/v1/user/register')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .set('Authorization', token)
                                .send(user)
                                .end((err, res) => {
                                    chai.request(server)
                                        .post('/PeraRide/v1/user/login')
                                        .set('content-type', 'application/x-www-form-urlencoded')
                                        .send(user)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.should.be.a('object');
                                            res.body.should.have.property('response').eql('Login Success')
                                            res.body.should.have.property('token')
                                            res.body.should.have.property('res').to.be.true

                                            done()
                                        })
                                })
                        });
                });
        });

        // it('login using unregistered admin shoul be failed', (done) => {
        //     chai.request(server)
        //         .post('/PeraRide/v1/login/admin')
        //         .set('content-type', 'application/x-www-form-urlencoded')
        //         .send(admin)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('response').eql('Admin does not exist')
        //             res.body.should.have.property('res').to.be.false

        //             done();
        //         });
        // });
    });
});