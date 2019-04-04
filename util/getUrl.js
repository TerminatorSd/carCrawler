var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs'); //用来操作文件
var urlBase = 'https://car.autohome.com.cn/pic/series/'
var url = 'https://car.autohome.com.cn/pic/series/2288-1-p1.html' //定义要爬的页面

saveDir = ''

function getAllHtml(urlBase, startIndex, maxIndex, txt) {
  var nowIndex = startIndex;
  saveDir = txt

  var intId = setInterval(function() {
    getHtmlAllPagesImg(urlBase, nowIndex)
    nowIndex++;
    if(nowIndex > maxIndex) {
      clearInterval(intId);
    }
  }, 4000)
}

// 获取一个html 下所有分页的img
function getHtmlAllPagesImg(url, nowIndex) {

  fullUrl = url + nowIndex + '-1' + '.html';

  console.log(fullUrl);

  https.get(fullUrl, function(res){
    var html = '',
        titles = [];

    res.setEncoding('utf-8') //防止中文乱码
    res.on('data', function(chunk){
      html += chunk;    //监听data事件 每次取一块数据
    })
    res.on('end', function() {
      var allStr = '';
      var $ = cheerio.load(html);  //获取数据完成后，解析html

      // console.log(nowIndex + ' box length: ' + $('.uibox-con.carpic-list03').length);

      // 如果存在车身外观图片则继续进行
      if($('.uibox-con.carpic-list03').length > 0) {
        console.log('Series_' + nowIndex + ' 有车身图片box，哈哈哈...')

        // 如果需要翻页的话
        if($('.pagecont .page').length > 0) {
          // 当前显示的图片总页数
          var pageNum = $('.pagecont .page').children().length - 2;
          // console.log(pageNum)
          if(pageNum > 0) {
            console.log('Series_' + nowIndex + '需要翻页...')
            for (var i = 1; i <= pageNum; i++) {
              getSinglePageImg(url + nowIndex + '-1' + '-p' + i + '.html');
            }
          } else {
            getSinglePageImg(fullUrl);
          }
        } else {
          getSinglePageImg(fullUrl);
        }
      }
      else {
        console.log('Series_' + nowIndex + '无车身图片box!');
        console.log('================')
        return;
      }
    })
  })
}

// 获取某个html 下单页的图片src
function getSinglePageImg(url) {

  https.get(url, function(res){
    var html = '',
        titles = [];

    res.setEncoding('utf-8') //防止中文乱码
    res.on('data', function(chunk){
      html += chunk;    //监听data事件 每次取一块数据
    })
    res.on('end', function() {
      var nowImgStr = '';
      var $ = cheerio.load(html);  //获取数据完成后，解析html

      // console.log(url + '......' + $('.uibox-con.carpic-list03 ul li').length)
      $('.uibox-con.carpic-list03 ul li').each(function(index, val) {
        nowImgStr += 'http:' + $(this).children('a').children('img').attr('src') + '\n'
      });

      if (nowImgStr) {
        console.log(url + ' 成功获取到图片...');
        fs.writeFile(saveDir, nowImgStr, { 'flag': 'a' }, function(err, data) {
          if(err) {
            console.log('Failure.');
          } else {
            console.log('Saved.')
          }
          console.log('****************************')
        })
      } else {
        console.log(url + ' 没有获取到图片!');
        console.log('----------------------')
      }

    })
  })
}

module.exports = { getAllHtml }
