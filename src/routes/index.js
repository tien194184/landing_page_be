const siteRouter = require('./site');

function route(app) {
    // app.use('/data', dataRouter);
    app.use('/', siteRouter);
}

module.exports = route;
