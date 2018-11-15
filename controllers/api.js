const _Directory = require('../models/directory');
const _User = require('../models/user');
const _File = require('../models/file');

const createDirectory = async (req, res) => {
    try{
        let directory = new _Directory(req.body.directory);
        await directory.save();
    } catch(e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const readDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const updateDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        for(e of req.body){
            console.debug(e);
        }
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const deleteDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        directory.deleted = true;
        await directory.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const createPartnerOfDirectory = async (req,res) => {
    try{
        let directory = await _Directory.findById(req.params.id);
        let partners = req.body.partners;
        let stack = [];
        stack.push(directory);
        while(stack.length){
            let cur = stack.pop();
            cur.partners.concat(partners);
            cur.save();
            let sub = await _Directory.find({path:cur.id});
            for(e of sub) stack.push(e);
            let subFile = await _File.find({path:cur.id}); 
            for(e of subFile){
                e.partners = partners;
                e.save();
            }
        }
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const readPartnerOfDirectory = async (req, res) => {
    try{
        let directory = await _Directory.findById(req.params.id).populate('partners');
        console.debug(directory);
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
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
            cur.save();
            let sub = await _Directory.find({path:cur.id});
            for(e of sub) stack.push(e);
            let subFile = await _File.find({path:cur.id}); 
            for(e of subFile){
                e.partners = partners;
                e.save();
            }
        }
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
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
            cur.save();
            let sub = await _Directory.find({path:cur.id});
            for(e of sub) stack.push(e);
            let subFile = await _File.find({path:cur.id}); 
            for(e of subFile){
                e.partners = partners;
                e.save();
            }
        }
    } catch (e) {
        console.log(e);
    }
    console.debug(directory);
    res.json(directory);
};
const createFile = async(req, res) => {
    try{
        let file = new _File(req.body.file);
        await file.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const readFile  = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const updateFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const deleteFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        file.deleted = true;
        await file.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const createPartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        file.partners.concat(partners);
        await file.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const readPartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id).populate('partners');
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const updatePartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        file.partners = partners;
        await file.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const deletePartnerOfFile = async (req, res) => {
    try{
        let file = await _File.findById(req.params.id);
        let partners = req.body.partners;
        for(e in partners) file.partners.remove(e);
    } catch (e) {
        console.log(e);
    }
    console.debug(file);
    res.json(file);
};
const createUser = async (req, res) => {
    try{
        let user = new _User(req.body.user);
        await user.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(user);
    res.json(user);
};
const readUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
    } catch (e) {
        console.log(e);
    }
    console.debug(user);
    res.json(user);
};
const updateUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
    } catch (e) {
        console.log(e);
    }
    console.debug(user);
    res.json(user);
};
const deleteUser = async (req, res) => {
    try{
        let user = await _User.findById(req.params.id);
        user.deleted = true;
        await user.save();
    } catch (e) {
        console.log(e);
    }
    console.debug(user);
    res.json(user);
};

module.exports = {
    createDirectory: createDirectory,
    createFile: createFile,
    createUser: createUser,
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