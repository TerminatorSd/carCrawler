
var { getAllHtml } = require('./util/getUrl');

var urlBase = 'https://car.autohome.com.cn/pic/series/'

getAllHtml(urlBase, 2238, 3096, './res_2.txt')
