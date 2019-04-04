var fs = require('fs');

fileName = './res.txt';

fs.readFile(fileName, 'utf-8', function(err,data) {
  txtArr = data.split('\n');
  var resArr = remove(txtArr);
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
