module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({
        dest: 'public/images/'
    });
    app.get('/upload', function (req, res) {
        res.render('upload');
    });
    app.post('/upload', upload.array('file', 2), function (req, res, next) {
        var Picture = global.dbHelper.getModel('picture');
        try {
            for (var i = 0; i < req.files.length; i++) {
                Picture.create({
                    uId: 'song',
                    tel: req.body.tel,
                    name: req.files[i].originalname,
                    description: req.body.desc,
                    imgSrc: req.files[i].filename,
                    num: 0,
                    pass: false
                });
            }
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    });
}
