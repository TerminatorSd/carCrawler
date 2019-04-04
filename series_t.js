var { getAllHtml } = require('./util/getUrl');

var urlBase = 'https://car.autohome.com.cn/pic/series-t/'

// console.log(getAllHtml)

getAllHtml(urlBase, 937, 2000, 'series-t_1.txt')