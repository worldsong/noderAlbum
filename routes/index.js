module.exports = function (app) {
    require('./login')(app);
    require('./logout')(app);
    require('./register')(app);
    require('./upload')(app);
    require('./home')(app);
    require('./upload_compress')(app);
};
