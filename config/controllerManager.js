const directoryController = require('../controllers/directory');
const fileController = require('../controllers/file');
const userController = require('../controllers/user');

module.exports = app => {
    app.use('/directory',directoryController);
    app.use('/file',fileController);
    app.use('/user',userController);
};