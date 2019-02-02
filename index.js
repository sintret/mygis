const axios = require("axios")
const koa = require("koa")
var Router = require('koa-router')
var bodyParser = require('koa-bodyparser')
const urlsConfig = require('./config.js')
const static = require('koa-static')
const fs = require("fs")
const render = require('koa-ejs');
const path = require('path');
const moment = require('moment')

const apis = require('./apis')

const Store = require('data-store');
const store = new Store('app', {path: 'data.json'});

const request = require('request')
const app = new koa();
var router = new Router();

var adminToken = null;
var adminTokenExpiredDate = new Date(2018, 6, 1, 0, 0, 0, 0);//2018-7-1
const multer = require('koa-multer');
var cors = require('koa2-cors');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './wwwroot/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=> {
        if (/image/.test(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(null, false);
            var err = new Error('File type only accept image');
            err.code = 403;
            cb(err);
        }
    },
    limits: {fileSize: 10485760}//10mb 10485760
})
app.use(static('wwwroot'));
app.use(bodyParser());
app.use(cors());


function checkToken() {
    return new Promise(function (resolve, reject) {
        var now = new Date();
        var long = now - adminTokenExpiredDate;
        if (long > urlsConfig.expiteTime || adminToken == null) {
            axios.post(urlsConfig.tokenUrl, urlsConfig.adminAcount).then(function (res) {
                adminToken = res.data;
                adminTokenExpiredDate = now;
                resolve();
            }).catch(function (err) {
                console.log('http-token', err);
                reject(err.message);
            });
        }
        else {
            resolve();
        }
    });
}


function getUserPermision(username) {
    return new Promise(function (resolve, reject) {
        checkToken().then(function () {
            var userUrl = `${urlsConfig.userInfoUrl}/${username}.json?token=${adminToken}`;
            axios.get(userUrl).then(function (res) {
                var info = res.data;
                if (info.userGroups && info.userGroups.indexOf(urlsConfig.ynadmin) > -1) {
                    resolve({flag: 1, username: info.name, info: info.description});
                }
                else {
                    resolve({flag: 0, username: info.name, info: info.description});
                }
            }).catch(function (err) {
                console.log('http-user', err);
                resolve({flag: -1, username: '', info: ''});
            });
        }).catch(function (err) {
            resolve({flag: -1, username: '', info: ''})
        });
    });
}
function getSysUsers() {
    return new Promise(function (resolve, reject) {
        checkToken().then(function () {
            var userUrl = `${urlsConfig.userInfoUrl}.json?token=${adminToken}`;
            axios.get(userUrl).then(function (res) {
                var info = res.data;
                if (info && info instanceof Array) {
                    var users = [];
                    for (var index = 0; index < info.length; index++) {
                        var element = info[index];
                        if (element[0] == "admin") {
                            continue;
                        }
                        else {
                            users.push(element[0])
                        }
                    }
                    resolve({flag: 1, users: users});
                }
                else {
                    resolve({flag: 0, users: ''});
                }
            }).catch(function (err) {
                console.log('http-user', err);
                resolve({flag: -1, users: ''});
            });
        }).catch(function (err) {
            resolve({flag: -1, users: ''})
        });
    });
}


function proxyEdit(originMethod, originData, originUrlType, searchStr) {
    let _url = originUrlType == 'point' ? urlsConfig.dataEditUrl_point : urlsConfig.dataEditUrl_polygon;
    _url += searchStr;
    return new Promise(function (resolve, reject) {
        axios({
            url: _url,
            method: originMethod,
            data: originData
        }).then(function (res) {
            resolve(res.data)
        }).catch(err=> {
            console.log('http-edit', err);
            reject(err.message);
        });
    });
}
function proxyLogin(originData) {
    return new Promise(function (resolve, reject) {
        axios({
            url: urlsConfig.loginUrl,
            method: 'POST',
            data: originData
        }).then(res=> {
            resolve(res.data)
        }).catch(err=> {
            console.log('http-login', err);
            reject(err.message);
        });
    });
}

function proxyLogin(originData) {
    return new Promise(function (resolve, reject) {
        axios({
            url: urlsConfig.loginUrl,
            method: 'POST',
            data: originData
        }).then(res=> {
            resolve(res.data)
        }).catch(err=> {
            console.log('http-login', err);
            reject(err.message);
        });
    });
}
//routes goes here
router.get('/api/sysusers', async(ctx, next)=> {
    var answer = await getSysUsers();
    if (answer.flag >= 0) {
        ctx.body = {success: true, result: answer.users};
    }
    else {
        ctx.body = {success: false, result: "something wrong"}
    }
    next();
})
router.post('/api/upload/:username', upload.single('photo'), async(ctx, next) => {
    var permissionObj = await getUserPermision(ctx.params.username);
    var permission = permissionObj.flag;
    if (permission >= 0) {
        var answer = '/uploads/' + ctx.req.file.filename;
        ctx.body = {success: true, result: answer};
    }
    else {
        ctx.body = {success: false, result: "need more permission for this user"}
    }
    next();
})
router.post('/api/login', async(ctx, next) => {
    var loginAnswer = await proxyLogin(JSON.stringify(ctx.request.body));
    if (loginAnswer.succeed == true) {
        try {
            var permissionObj = await getUserPermision(ctx.request.body.username);
            ctx.body = {success: true, result: permissionObj}
        }
        catch (err) {
            ctx.body = {success: false, result: err}
        }

    }
    else {
        ctx.body = {success: false, result: "username or password is wrong"}
    }
    next();
});

router.post('/api/edit/:type/:username/*', async(ctx, next) => {
    var permissionObj = await getUserPermision(ctx.params.username);
    var permission = permissionObj.flag;
    if (permission >= 0) {
        try {
            var answer = await proxyEdit(ctx.method, ctx.request.rawBody, ctx.params.type, ctx.search);
            ctx.body = {success: true, result: answer};
        }
        catch (err) {
            ctx.body = {success: false, result: err};
        }
    }
    else {
        ctx.body = {success: false, result: "need more permission for this user"}
    }
    next();
});
router.put('/api/edit/:type/:username/*', async(ctx, next) => {
    var permissionObj = await getUserPermision(ctx.params.username);
    var permission = permissionObj.flag;
    if (permission > 0) {
        try {
            var answer = await proxyEdit(ctx.method, ctx.request.rawBody, ctx.params.type, ctx.search);

            ctx.body = {success: true, result: answer};
        }
        catch (err) {
            ctx.body = {success: false, result: err};
        }
    }
    else {
        ctx.body = {success: false, result: "need more permission for this user"}
    }
    next();
});

router.delete('/api/edit/:type/:username/*', async(ctx, next) => {
    var permissionObj = await getUserPermision(ctx.params.username);
    var permission = permissionObj.flag;
    if (permission > 0) {
        try {
            var answer = await proxyEdit(ctx.method, ctx.request.rawBody, ctx.params.type, ctx.search);
            ctx.body = {success: true, result: answer};
        }
        catch (err) {
            ctx.body = {success: false, result: err};
        }
    }
    else {
        ctx.body = {success: false, result: "need more permission for this user"}
    }
    next();
});

router.get('/cron', async(ctx, next) => {

    var t = await apis.searchData();
    store.set("search", t);

    ctx.body = "cron ok";
});
router.get('/cron2', async(ctx, next) => {

    var simasda = await apis.simasda();

    console.log(simasda)

    store.set("simasda", simasda)
    ctx.body = "cron ok";
});

router.get('/test', async(ctx, next) => {
    console.log('test')

    ctx.body = await apis.myRequest(apis.mobilePositionUrl,apis.mobilePositionQuery)
    next();
});

router.get('/simasda', async(ctx, next) => {

    ctx.body = await apis.simasda();
    next();
});

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

router.get("/search/:text", async(ctx, next) => {
    var text = ctx.params.text;

    console.log(text)
    var myArr = [];

    if(text.length > 1){
        var arr = store.get("search");

        var myArr = apis.searchFunction(arr, text);
    }

    ctx.body = myArr;
});

router.get("/apis", async(ctx, next) => {

    var content = await apis.searchData();

    store.set("search", content)

    const jsonRender = {content: content};
    await ctx.render('test', {
        jsonRender
    });
});

router.get("/", async(ctx, next) => {

    const getData = store.get("simasda")

    console.log(getData)

    //var simasda = require("./build")(getData)
    const jsonRender = {simasda: getData}
    await ctx.render('content', {
        jsonRender
    });
});


//handle  final error
app.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = {
            success: false,
            code: err.code || 500,
            result: err.message
        }
    }
});
app.use(router.routes()).use(router.allowedMethods());

var cron = require('./cron');
//cron.task.start();
cron.crawl.start();

app.listen(8085);
console.log('server is running at 8085 port');
