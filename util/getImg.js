var fs = require('fs'); 
const { runCmd } = require('./cmd')

function getImg(txt, dir) {
  fs.readFile(txt, 'utf-8', function (err, data) {
    var imgList = data.split('\n');
    var imgNum = imgList.length;

    for(var i = 1; i <= imgNum; i++) {
      if(imgList[i]) {
        runCmd('start img_' + i,
          'cd ' + dir + ' && wget ' + imgList[i] + ' -O img_' + i + '.jpg' ,
          'done img_' + i,
          i * 10)
      }
    }
  })
}

module.exports = { getImg };


