var fs = require('fs');

fileName = './series-t_1.txt';

fs.readFile(fileName, 'utf-8', function(err,data) {
  txtArr = data.split('\n');
  var resArr = remove(txtArr);

  fs.writeFile('./series-t_1.txt', resArr.join('\n'), function(err, data) {
    console.log('done');
  })
  console.log(txtArr.length)
  console.log(resArr.length)
})

function remove(array){
  var temp = []; //一个新的临时数组
  for(var i = 0; i < array.length; i++){
    if(temp.indexOf(array[i]) == -1){
        temp.push(array[i]);
    }
  }
  return temp;
}
