const httpMocks = require('node-mocks-http');
const should = require('should');
const mongoose = require('mongoose');
const eventEmitter = require('events').EventEmitter;
const controllerAPI = require('../controllers/api');
const routerAPI = require('../routes/api');

const dummyData = require('./dummyData.json');
let user = dummyData.user;
let file = dummyData.file;
let directory = dummyData.directory;
let users = dummyData.users;
let files = dummyData.files;
let directories = dummyData.directories;


describe('Controller', () =>{
    before( (done) => {
        mongoose.connect('mongodb://localhost/testDatabase',  { useCreateIndex :  true, useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            done();
        });
    });
    after( () => {
        mongoose.connection.db.dropDatabase( () => {
            mongoose.connection.close(done);
        });
    });
    beforeEach( () => {

    });
    afterEach( () => {

    });
    describe('User', () => {
        describe('POST', () => {
            it('this is a create user test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/user',
                    body: {
                        user: {
                            name: user.name,
                            email: user.email,
                            password: user.password,
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createUser(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    user.id = data.id;
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','email','password','salt','deleted']);
                    data.name.should.be.equal(user.name);
                    data.email.should.be.equal(user.email);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('GET', () => {
            it('this is a read user test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/user',
                    params: {
                        id: user.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.readUser(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    loginUser = data;
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','email','password','salt','deleted']);
                    data.name.should.be.equal(user.name);
                    data.email.should.be.equal(user.email);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('DELETE', () => {
            it('this is a update user test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'DELETE',
                    url: '/user',
                    params: {
                        id: user.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.deleteUser(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','email','password','salt','deleted']);
                    data.name.should.be.equal(user.name);
                    data.email.should.be.equal(user.email);
                    data.deleted.should.be.equal(true);
                    done();
                });
            })
        });
        describe('PUT', () => {
            it('this is a update user test', (done) => {
                user.name = 'second user';
                user.email = 'mail2@mail.com';
                user.password = 'pass2';
                let request = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/user',
                    params: {
                        id: user.id
                    },
                    body: {
                        user : {
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            deleted: true
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.updateUser(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','email','password','salt','deleted']);
                    data.name.should.be.equal(user.name);
                    data.email.should.be.equal(user.email);
                    data.deleted.should.be.equal(true);
                    done();
                });
            })
        });
    });
    describe('Directory', () => {
        directory.owner = user.id;
        describe('POST', () => {
            it('this is a create directory test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/directory',
                    body: {
                        directory: {
                            name: directory.name,
                            owner: directory.owner,
                            partners: directory.partners,
                            path: directory.path,
                            opened: directory.opened
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createDirectory(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    directory.id = data.id;
                    file.path = directory.id;
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(directory.name);
                    data.opened.should.be.equal(directory.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('GET', () => {
            it('this is a read directory test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/directory',
                    params: {
                        id: directory.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.readDirectory(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(directory.name);
                    data.opened.should.be.equal(directory.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('DELETE', () => {
            it('this is a update directory test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'DELETE',
                    url: '/directory',
                    params: {
                        id: directory.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.deleteDirectory(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(directory.name);
                    data.opened.should.be.equal(directory.opened);
                    data.deleted.should.be.equal(true);
                    done();
                });
            })
        });
        describe('PUT', () => {
            it('this is a update directory test', (done) => {
                directory.name = 'test2';
                directory.opened = true;
                let request = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/directory',
                    params: {
                        id: directory.id
                    },
                    body: {
                        directory: {
                            name: directory.name,
                            owner: directory.owner,
                            partners: directory.partners,
                            path: directory.path,
                            opened: true,
                            deleted: false
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.updateDirectory(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(directory.name);
                    data.opened.should.be.equal(directory.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            })
        });
    });
    describe('File', () => {
        file.owner = user.id;
        describe('POST', () => {
            it('this is a create file test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/file',
                    body: {
                        file: {
                            name: file.name,
                            type: file.type,
                            owner: file.owner,
                            partners: file.partners,
                            path: file.path,
                            opened: file.opened
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createFile(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    file.id = data.id;
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.opened.should.be.equal(file.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('GET', () => {
            it('this is a read file test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/file',
                    params: {
                        id: file.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.readFile(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.opened.should.be.equal(file.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('DELETE', () => {
            it('this is a update file test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'DELETE',
                    url: '/file',
                    params: {
                        id: file.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.deleteFile(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.opened.should.be.equal(file.opened);
                    data.deleted.should.be.equal(true);
                    done();
                });
            })
        });
        describe('PUT', () => {
            it('this is a update file test', (done) => {
                file.name = 'test2';
                file.type = 'Document2';
                file.opened = true;
                let request = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/file',
                    params: {
                        id: file.id
                    },
                    body: {
                        file: {
                            name: file.name,
                            type: file.type,
                            owner: file.owner,
                            partners: file.partners,
                            path: file.path,
                            opened: true,
                            deleted: false,
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.updateFile(request,response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.opened.should.be.equal(file.opened);
                    data.deleted.should.be.equal(false);
                    done();
                });
            })
        });
    });
    describe('Partner', () => {
        let partners = []
        before( (done) => {
            let count = 0;
            for(e of users){
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/user',
                    body: {
                        user: {
                            name: e.name,
                            email: e.email,
                            password: e.password,
                        }
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createUser(request, response);
                response.on('end', () => {
                    count++;
                    let data = response._getData();
                    for(e of users){ if(e.name == data.name) e.id = data.id; partners.push(data.id);}
                    if(count == users.length){
                        done();
                    }
                });
            }

        });
        describe('File - POST', () => {
            it('this is a file partner create test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/file/partner',
                    params: {
                        id: file.id
                    },
                    body: {
                        partners: partners
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createPartnerOfFile(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.partners.should.have.length(partners.length);
                    data.opened.should.be.equal(true);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('File - GET', () => {
            it('this is a file partner read test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/file/partner',
                    params: {
                        id: file.id
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.readPartnerOfFile(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.partners.should.have.length(partners.length);
                    data.opened.should.be.equal(true);
                    data.deleted.should.be.equal(false);
                    for(e of data.partners){
                        e.should.have.property('name');
                        e.should.have.property('email');
                    }
                    done();
                });
            });
        });
        describe('File - DELETE', () => {
            it('this is a file partner delete test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'DELETE',
                    url: '/file/partner',
                    params: {
                        id: file.id
                    },
                    body: {
                        partners: partners
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.deletePartnerOfFile(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.partners.should.have.length(0);
                    data.opened.should.be.equal(false);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('File - PUT', () => {
            it('this is a file partner update test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/file/partner',
                    params: {
                        id: file.id
                    },
                    body: {
                        partners: partners
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.updatePartnerOfFile(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','type','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(file.name);
                    data.type.should.be.equal(file.type);
                    data.partners.should.have.length(partners.length);
                    data.opened.should.be.equal(true);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
        describe('Directory - POST', () => {
            it('this is a directory partner create test', (done) => {
                let request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/directory/partner',
                    params: {
                        id: directory.id
                    },
                    body: {
                        partners: partners
                    }
                });
                let response = httpMocks.createResponse({ eventEmitter: eventEmitter });
                controllerAPI.createPartnerOfDirectory(request, response);
                response.on('end', () => {
                    let data = response._getData();
                    response.statusCode.should.be.equal(200);
                    data.should.be.instanceOf(Object)
                        .and.have.properties(['id','name','owner','partners','path','opened','deleted']);
                    data.name.should.be.equal(directory.name);
                    data.partners.should.have.length(partners.length);
                    data.opened.should.be.equal(true);
                    data.deleted.should.be.equal(false);
                    done();
                });
            });
        });
    });
});