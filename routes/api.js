const _Directory = require('../models/directory');
const _File = require('../models/file');
const _User = require('../models/user');
const passport = require('passport');

const isUser = (req, res, next) => {
    if ( req.isAuthenticated() ) {
        next();
    } else {
        res.redirect( '/' );
    }
}
const renderIndex = (req, res) => {
    res.render('index');
}
const renderTexteditor = async (req, res) => {
    let file = await _File.findById(req.params.id).populate('owner').populate('partners');
    let owner = file.owner.email;
    let partners = [];
    for(e of file.partners){
        partners.push(e.email);
    }
    res.render('texteditor',{
        file: file,
        owner: owner,
        partners: partners
    });
};
const renderDashboard = async (req, res) => {
    let privateDirectories = await _Directory.getPrivateDirectories(req.user, null);
    let publicDirectories = await _Directory.getPublicDirectories(req.user, null);
    let privateFiles = await _File.getPrivateFiles(req.user, null);
    let publicFiles = await _File.getPublicFiles(req.user, null);
    res.render('dashboard',{
        user: req.user,
        privateDirectories: privateDirectories,
        publicDirectories: publicDirectories,
        privateFiles: privateFiles,
        publicFiles: publicFiles
    });
};
const renderPrivateDashboard = async (req, res) => {
    let privateDirectories = await _Directory.getPrivateDirectories(req.user, null);
    let privateFiles = await _File.getPrivateFiles(req.user, null);
    res.render('dashboard', {
        user: req.user,
        privateDirectories: privateDirectories,
        privateFiles: privateFiles
    });
};
const renderPublicDashboard = async (req, res) => {
    let publicDirectories = await _Directory.getPublicDirectories(req.user, null);
    let publicFiles = await _File.getPublicFiles(req.user, null);
    res.render('dashboard', {
        user: req.user,
        publicDirectories: publicDirectories,
        publicFiles: publicFiles,
    });
};
const renderPrivateDashboardOfPath = async (req, res) => {
    let privateDirectories = await _Directory.getPrivateDirectories(req.user, req.params.path);
    let privateFiles = await _File.getPrivateFiles(req.user, req.params.path);
    res.render('dashboard', {
        user: req.user,
        privateDirectories: privateDirectories,
        privateFiles: privateFiles
    });
};
const renderPublicDashboardOfPath = async (req, res) => {
    let publicDirectories = await _Directory.getPublicDirectories(req.user, req.params.path);
    let publicFiles = await _File.getPublicFiles(req.user, req.params.path);
    res.render('dashboard', {
        user: req.user,
        publicDirectories: publicDirectories,
        publicFiles: publicFiles,
    });
};

module.exports = {
    isUser: isUser,
    renderIndex: renderIndex,
    renderTexteditor: renderTexteditor,
    renderDashboard: renderDashboard,
    renderPrivateDashboard: renderPrivateDashboard,
    renderPublicDashboard: renderPublicDashboard,
    renderPrivateDashboardOfPath: renderPrivateDashboardOfPath,
    renderPublicDashboardOfPath: renderPublicDashboardOfPath,
}