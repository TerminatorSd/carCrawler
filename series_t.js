var { getAllHtml } = require('./util/getUrl');

var urlBase = 'https://car.autohome.com.cn/pic/series-t/'

// console.log(getAllHtml)

getAllHtml(urlBase, 1, 1000, 'series-t_1.txt')