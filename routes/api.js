const _Directory = require('../models/directory');
const _File = require('../models/file');
const _User = require('../models/user');
const passport = require('passport');

const isUser = (req, res) => {
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
    let file = await _File.findById(req.params.path);
    res.render('texteditor',{
        //
    });
};
const renderDashboard = async (req, res) => {
    res.render('dashboard');
};
const renderPrivateDashboard = async (req, res) => {
    let files = await _File.find();
    let directories = await _Directory.find();
    res.render('dashboard', {
        files: files,
        directories: directories,
    });
};
const renderPublicDashboard = async (req, res) => {
    let files = await _File.find();
    let directories = await _Directory.find();
    res.render('dashboard', {
        files: files,
        directories: directories,
    }); 
};
const renderPrivateDashboardOfPath = async (req, res) => {
    let files = await _File.find();
    let directories = await _Directory.find();
    res.render('dashboard', {
        files: files,
        directories: directories,
   });
};
const renderPublicDashboardOfPath = async (req, res) => {
    let files = await _File.find();
    let directories = await _Directory.find();
    res.render('dashboard', {
        files: files,
        directories: directories,
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