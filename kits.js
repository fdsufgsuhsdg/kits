/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function () {
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000, 999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}

// 获取一个随机的16进制的颜色
kits.randomHexColor = function () {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  // 随机索引(0,15);
  let randomIndex = this.randomInt(0, 15);
  let hex = '';
  for (let i = 0; i < 6; i++) {
    hex += arr[randomIndex];
    randomIndex = this.randomInt(0, 15);
  }
  let hexColor = '#' + hex
  return hexColor;
}


// 获取一个随机的rgb格式的颜色
kits.randomRGBColor = function () {
  // 颜色是在0到255之间的随机整数；
  let r = this.randomInt(0, 255);
  let g = this.randomInt(0, 255);
  let b = this.randomInt(0, 255);
  let rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  return rgbColor;
}
// 从本地存储中读取复杂数据

/**
 * @description 从本地存储中读取复杂数据
 * @param {string} 要以哪个键从本地存储中读取数据
 * @returns {object} 读取出来的，镜JSON转换的复杂数据
 */
kits.getArray = kits.loadArrayFromLocalStorage = function (key) {
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr || [];
}


/**
 * @description 封装好的把复杂数据存储到本地里面的方法，默认是存储json格式字符串
 * @param {string} key 存储到本地里面的键
 * @param {object} obj 要存储的复杂数据
 * @returns undefined
 */
kits.setData = kits.saveArrayToLocalStorage = function (key,obj) {
  let json = JSON.stringify(obj);
  localStorage.setItem(key, json);
}
// 本地已经有 info: [{id:0,name:"aa"},{id:1,name:"aa"},{id:2,name:"aa"}]
// aa= [23,45,67]  ==> 
kits.appendDataIntoArray = function(key,data){
  // 从本地数据里面获取key对应的数据
  let arr = this.getArray(key);
  // 在数组里面追加data
  arr.unshift(data);
  // 把追加好的数组追加回本地
  this.setData(key,arr); // kits.setData(key,arr)

}
// var obj = {name:"haha"};
//  console.log(obj.name)
kits.modifyLocalDataById = function(key,id,data){
   // 从本地数据里面获取key对应的数据
   let arr = this.getArray(key);
  //  console.log(arr[1])
   for(i = 0; i < arr.length; i++){
    //  console.log(arr[i])
    // console.log(arr[i].id)
    if(arr[i].id == id){
      arr[i] = data;
    }
   }

   this.setData(key,arr); // kits.setData(key,arr)
}


kits.deleteLocalDataById = function(key,id){
   // 从本地数据里面获取key对应的数据
   let arr = this.getArray(key);
   for(i = 0; i < arr.length; i++){
     if(arr[i].id == id){
       arr[i] = id;  
     }
     this.remove(key,arr);
   }
   
}

