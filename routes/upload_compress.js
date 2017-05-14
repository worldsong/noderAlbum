/**
 * Created by Song on 2017/5/14.
 */
module.exports = function (app) {
    var fs = require('fs');
    var path = require('path');
    var multer = require('multer');
    var upload = multer({
        dest: 'public/images/'
    });
    app.get('/upload_compress', function (req, res) {
        res.render('upload_compress');
    });
    app.post('/upload_compress', upload.array('file', 2), function (req, res, next) {
        var responseData = [];
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
                var file_path = path.join(__dirname, '../public/images/' + req.files[i].filename);
                //每张图片给予一分钟保存时间
                setTimeout(function () {
                    if (!fs.existsSync(file_path)) return;

                    console.log("\x1B[33m删除文件" + file_path + "\x1B[0m");
                    fs.unlinkSync(file_path);
                }, 60 * 1000);

                responseData.push({
                    type: req.files[i].type,
                    name: req.files[i].filename,
                    path: '/images/' + req.files[i].filename,
                    size: req.files[i].size / 1024 > 1024 ? (~~(10 * req.files[i].size / 1024 / 1024)) / 10 + "MB" : ~~(req.files[i].size / 1024) + "KB"
                });
            }
            res.writeHead(200);
            res.end(JSON.stringify(responseData));
        } catch (e) {
            res.sendStatus(404);
        }
    });
}
