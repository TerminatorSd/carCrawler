var fs = require('fs'); 
const { runCmd } = require('./cmd')

fs.readFile('res.txt', 'utf-8', function (err, data) {
  var imgList = data.split('\n');
  var imgNum = imgList.length;

  for(var i = 1; i <= imgNum; i++) {
    if(imgList[i]) {
      runCmd('start img_' + i,
        'cd res && wget ' + imgList[i] + ' -O img' ,
        'done img_' + i,
        i * 1000)
    }
  }
})

