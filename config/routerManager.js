const indexRouter = require('../routes/index');
const dashboardRouter = require('../routes/dashboard');
const texteditorRouter = require('../routes/texteditor');
const signinRouter = require('../routes/signin');
const signoutRouter = require('../routes/signout');

module.exports = app => {
    app.use('/',indexRouter);
    app.use('/dashboard',dashboardRouter);
    app.use('/texteditor',texteditorRouter);
    app.use('/signin',signinRouter);
    app.use('/signout',signoutRouter);
};