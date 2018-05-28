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


describe('Admin', () => {
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

    describe('/POST admin register login token check', () => {
        it('register new admin, login and token check should be successful', (done) => {
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
                                .get('/PeraRide/v1/users')
                                .set('Authorization', token)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('res').to.be.true
                                    done()
                                })
                        });
                });
        });

        it('login using unregistered admin shoul be failed', (done) => {
            chai.request(server)
                .post('/PeraRide/v1/login/admin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(admin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response').eql('Admin does not exist')
                    res.body.should.have.property('res').to.be.false

                    done();
                });
        });
    });

    let user = {
        rider_regNo: 'user',
        rider_password: 'password',
        rider_email: 'emailaddress',
        rider_firstName: 'firstName',
        rider_lastName: 'lastName',
        rider_phone: '0123456789'
    }

    describe('/POST user register /GET users', () => {
        it('register users and get users', (done) => {
            chai.request(server)
                .post('/PeraRide/v1/register/admin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(admin)
                .end((err, res) => {

                    chai.request(server)
                        .post('/PeraRide/v1/login/admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send(admin)
                        .end((err, res) => {

                            let token = res.body.token;

                            chai.request(server)
                                .post('/PeraRide/v1/user/register')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .set('Authorization', token)
                                .send(user)
                                .end((err, res) => {

                                    res.should.have.status(200)
                                    res.body.should.have.property('res').to.be.true
                                    res.body.should.have.property('response').eql('Successfully Registered');

                                    chai.request(server)
                                        .post('/PeraRide/v1/user/register')
                                        .set('content-type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token)
                                        .send(user)
                                        .end((err, res) => {

                                            res.should.have.status(200)
                                            res.body.should.have.property('res').to.be.false
                                            res.body.should.have.property('response').eql('User already Registered');

                                            chai.request(server)
                                                .get('/PeraRide/v1/users')
                                                .set('content-type', 'application/x-www-form-urlencoded')
                                                .set('Authorization', token)
                                                .end((err, res) => {

                                                    res.should.have.status(200)
                                                    res.body.should.have.property('res').to.be.true
                                                    res.body.should.have.property('riders').eql([{
                                                        rider_email: 'emailaddress',
                                                        rider_phone: '0123456789',
                                                        rider_firstName: 'firstName',
                                                        rider_lastName: 'lastName',
                                                        logged: false,
                                                        rider_regNo: 'user'
                                                    }])
                                                    done()
                                                })
                                        })
                                })
                        });
                });
        });
    });

    let station = {
        station_id: 100,
        lock_id: 222,
        name: 'station1',
        lat: 0.1234,
        lon: 0.4321
    }

    let lock = {
        station_id: 100,
        lock_id: 333
    }


    describe('/POST add station and lock', () => {
        it('add a station and a lock and when adding same lock it should be fail', (done) => {
            chai.request(server)
                .post('/PeraRide/v1/register/admin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(admin)
                .end((err, res) => {

                    chai.request(server)
                        .post('/PeraRide/v1/login/admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send(admin)
                        .end((err, res) => {

                            let token = res.body.token;

                            chai.request(server)
                                .post('/PeraRide/v1/admin/addstation')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .set('Authorization', token)
                                .send(station)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('res').to.be.true
                                    res.body.should.have.property('response').eql('Successful')

                                    chai.request(server)
                                        .post('/PeraRide/v1/admin/addlock')
                                        .set('content-type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token)
                                        .send(lock)
                                        .end((err, res) => {
                                            res.should.have.status(200)
                                            res.body.should.have.property('res').to.be.true
                                            res.body.should.have.property('response').eql('Successful')

                                            chai.request(server)
                                                .post('/PeraRide/v1/admin/addlock')
                                                .set('content-type', 'application/x-www-form-urlencoded')
                                                .set('Authorization', token)
                                                .send(lock)
                                                .end((err, res) => {
                                                    res.should.have.status(200)
                                                    res.body.should.have.property('res').to.be.false
                                                    res.body.should.have.property('response').eql('lock already exits')
                                                    done()
                                                })
                                        })
                                })
                        })
                })
        })

        it('add a lock to a non existing station should be failed', (done) => {
            chai.request(server)
                .post('/PeraRide/v1/register/admin')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(admin)
                .end((err, res) => {

                    chai.request(server)
                        .post('/PeraRide/v1/login/admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .send(admin)
                        .end((err, res) => {

                            let token = res.body.token;

                            chai.request(server)
                                .post('/PeraRide/v1/admin/addlock')
                                .set('content-type', 'application/x-www-form-urlencoded')
                                .set('Authorization', token)
                                .send(lock)
                                .end((err, res) => {
                                    res.should.have.status(200)
                                    res.body.should.have.property('res').to.be.false
                                    res.body.should.have.property('response').eql('station not exits')
                                    done()
                                })
                        })
                })
            })
        })
    });