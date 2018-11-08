const indexRouter = require('../routes/index');
const dashboardRouter = require('../routes/dashboard');

module.exports = app => {
    app.use('/',indexRouter);
    app.use('/dashboard',dashboardRouter);
};