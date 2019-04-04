
var { getAllHtml } = require('./util/getUrl');

var urlBase = 'https://car.autohome.com.cn/pic/series/'

getAllHtml(urlBase, 5378, 6000, './res_3.txt')
