var express = require('express');
var swig = require('swig');
var path = require('path');
var deb=require('./dev.config');

let dir= deb.debuge==false ? 'src':'build';

// 导出入口函数
var app = express();
// 设置监听端口
var port = process.env.PORT || 8000;

// 获取数据
var appData=require('./data.json');
var uMsg=appData.uMsg;
var uCount=appData.uCount;

//创建一个路由
var apiRoutes=express.Router();

apiRoutes.get('/index', function(req, res) {
    res.json({
      data: uMsg
    })
});

apiRoutes.get('/uCount', function(req, res) {
    res.json({
      data: uCount
    })
});

app.use('/api',apiRoutes);

////设置swig页面不缓存
//swig.setDefaults({
//cache: false
//})
//app.set('view cache', false);
//// 设置模板文件的目录
//app.set('views','./src');
//// 设置视图引擎
//app.set('view engine','html');
//// 设置html引擎
//app.engine('html', swig.renderFile);

// 托管静态文件
app.use(express.static(path.join(__dirname, dir)));

// 监听端口
app.listen(port);

console.log('server is started at http://localhost:'+port);

////index page
//app.get('/index',function(req, res){
//  res.render('index',{
//      title:'期刊发布 ',  
//      content: 'hello swig'
//  })
//})
