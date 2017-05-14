/**
 * Created by Song on 2017/5/6.
 */
module.exports = function (app) {
    app.get('/home', function (req, res) {
        var Picture = global.dbHelper.getModel('picture');
        Picture.find({"uId": 'song'}, function (error, docs) {
            res.render('home', {Pictures: docs});
        }).sort({"num": -1});
    });
}