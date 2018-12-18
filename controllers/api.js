const _Directory = require('../models/directory');
const _User = require('../models/user');
const _File = require('../models/file');

const isUser = (req, res, next) => {
    if ( req.isAuthenticated() ) {
        next();
    } else {
        res.send({error:'Access is denied'});
    }
}
const createDirectory = async (req, res) => {
    try{
        let directory = new _Directory(req.body.directory);
        directory.owner = req.user;
        await directory.save();
        res.send(directory);
    } catch(e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const updateDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        let data = req.body.directory;
        for(let e in req.body.directory){
            directory[e] = data[e];
        }
        await directory.save();
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const deleteDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        directory.deleted = true;
        await directory.save();
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const createPartnerOfDirectory = async (req,res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        let partners = req.body.partners;
        let stack = [];
        stack.push(directory);
        while(stack.length){
            let cur = stack.pop();
            cur.partners = cur.partners.concat(partners);
            if(cur.partners.length == 0) cur.opened = false;
            else cur.opened = true;
            cur.save();
            let subDirectories = await _Directory.find({path:cur.id});
            for(e of subDirectories) stack.push(e);
            let subFiles = await _File.find({path:cur.id}); 
            for(e of subFiles){
                e.partners = partners;
                e.save();
            }
        }
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readPartnerOfDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id).populate('partners');
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}
const updatePartnerOfDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        let partners = req.body.partners;
        let stack = [];
        stack.push(directory);
        while(stack.length){
            let cur = stack.pop();
            cur.partners = partners;
            if(cur.partners.length == 0) cur.opened = false;
            else cur.opened = true;
            cur.save();
            let subDirectories = await _Directory.find({path:cur.id});
            for(e of subDirectories) stack.push(e);
            let subFiles = await _File.find({path:cur.id}); 
            for(e of subFiles){
                e.partners = partners;
                e.save();
            }
        }
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const deletePartnerOfDirectory = async (req,res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        let partners = req.body.partners;
        let stack = [];
        stack.push(directory);
        while(stack.length){
            let cur = stack.pop();
            for(e in partners) cur.remove(e);
            if(cur.partners.length == 0) cur.opened = false;
            else cur.opened = true;
            cur.save();
            let sub = await _Directory.find({path:cur.id});
            for(e of sub) stack.push(e);
            let subFile = await _File.find({path:cur.id}); 
            for(e of subFile){
                e.partners = partners;
                e.save();
            }
        }
        res.send(directory);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const createFile = async(req, res) => {
    try{
        let file = new _File(req.body.file);
        file.owner = req.user;
        await file.save();
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readFile  = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const updateFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let data = req.body.file;
        for(let e in req.body.file){
            file[e] = data[e];
        }
        await file.save();
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const deleteFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        file.deleted = true;
        await file.save();
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const createPartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        file.partners = file.partners.concat(partners);
        if(file.partners.length == 0) file.opened = false;
        else file.opened = true;
        let pathId = file.path;
        while(pathId != null){
            let f = await _Directory.findById(pathId);
            f.partners = f.partners.concat(partners);
            if(f.partners.length == 0) f.opened = false;
            else f.opened = true;
            f.save();
            pathId = f.path;
        }
        await file.save();
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readPartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id).populate('partners');
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const updatePartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        file.partners = partners;
        if(file.partners.length == 0) file.opened = false;
        else file.opened = true;
        let pathId = file.path;
        while(pathId != null){
            let f = await _Directory.findById(pathId);
            f.partners = f.partners.concat(partners);
            if(f.partners.length == 0) f.opened = false;
            else f.opened = true;
            f.save();
            pathId = f.path;
        }
        await file.save();
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const deletePartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        for(e of partners) file.partners.remove(e);
        if(file.partners.length == 0) file.opened = false;
        else file.opened = true;
        res.send(file);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const createUser = async (req, res) => {
    try{
        let user = new _User(req.body.user);
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const updateUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
        let data = req.body.user;
        for(let e in req.body.user){
            user[e] = data[e];
        }
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const deleteUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
        user.deleted = true;
        await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
};
const readUserByEmail = async (req, res) => {
    try{
        let user = await _User.findOne({email: req.params.email, deleted: false});
        res.send(user.id);
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
}

module.exports = {
    isUser: isUser,
    createDirectory: createDirectory,
    createFile: createFile,
    createUser: createUser,
    readUserByEmail: readUserByEmail,
    createPartnerOfDirectory: createPartnerOfDirectory,
    createPartnerOfFile: createPartnerOfFile,
    readDirectory: readDirectory,
    readFile: readFile,
    readUser: readUser,
    readPartnerOfDirectory: readPartnerOfDirectory,
    readPartnerOfFile: readPartnerOfFile,
    updateDirectory: updateDirectory,
    updateFile: updateFile,
    updateUser: updateUser,
    updatePartnerOfDirectory: updatePartnerOfDirectory,
    updatePartnerOfFile: updatePartnerOfFile,
    deleteDirectory: deleteDirectory,
    deleteFile: deleteFile,
    deleteUser: deleteUser,
    deletePartnerOfDirectory: deletePartnerOfDirectory,
    deletePartnerOfFile: deletePartnerOfFile,
};