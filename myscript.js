const downloadUrlRe = /plugin\.php\?id=sikemi\:download\&amp\;tid=[0-9]+/;
const imageRe = /data\/attachment\/(?:forum|album)\/.+?(?:jpg|png|jpeg)/g;
const torrrentStateRe = /<span style="color: red;">.+<\/span>/g;


//let 代替 var， 单引号替换双引号
var unique = function() {
  var n = [this[0]]; //结果数组
  for (var i = 1; i < this.length; i++) //从第二项开始遍历
  {
    //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
    //那么表示第i项是重复的，忽略掉。否则存入结果数组
    if (this.indexOf(this[i]) == i) n.push(this[i]);
  }
  return n;
};

// var OBTrs = [];

function tr(node) {
  this.title = "";
  this.href = "";
  this.downloadUrl = [];
  this.imageUrls = [];
  this.imageNodes = [];
  this.torrrentStates = [];
  this.node = node;
  // this.ok = false;
}

tr.prototype.getTitle = function() {
  this.title = $("th > a", this.node).text();
};

tr.prototype.getHref = function() {
  this.href = $("th > a", this.node).attr('href');
};

//done（），fail（），err()
tr.prototype.analysisAjax = function(ReName, Re, uniques, callback) {    //重构，参数过多，将ajax与正则解析分离
  (function(OBTr) {
    // 自动补全url，不需要手动设置
    $.get(OBTr.href, function(data, status) {
      if (status != "success") {
        console.log(OBTr.title + "ajax 请求失败！");
      }
      data = $("div[id^='post_'] > table:first > tbody > tr:first", data).html();
      ReName.forEach(function(el, index) {
        if (uniques[index]) {
          OBTr[el] = unique.call(data.match(Re[index]));    //用set数据结构
        }
        else{
          OBTr[el] = data.match(Re[index]);
        }
      });
      // OBTr.ok = true;
      // OBTrs.push(OBTrs);
      callback(OBTr);
    });
  })(this);
};

tr.prototype.addButton = function(callback) {           //Promise
  $("th", this.node).append('<button type="button"></button>');
  if (typeof callback === "function") {
    callback.call(this);
  }
};

tr.prototype.addImagesHidden = function() {
  for (var i = 0; i <= this.imageUrls.length - 1; i++) {                  //用原生遍历方法Iterator接口  for...of 代替
    $(this.node).after('<img src =" ' + this.imageUrls[i] + '" hidden = "hidden" ></img>');
  }
  var addedImageNodes = $("img:hidden", this.node.parentNode);  
  this.imageNodes = addedImageNodes;
};

$("[id^='normalthread'] > tr").each(function(index, element) {    //=>
  OBTr = new tr(element);
  OBTr.getTitle();
  OBTr.getHref();
  OBTr.analysisAjax(["downloadUrl", "imageUrls", "torrrentStates"], [downloadUrlRe, imageRe, torrrentStateRe], [1, 1 ,0], function(OBTr) { //参数1：对象的属性，参数2：对应的正则表达式,参数3是否去重
    OBTr.addButton(function() {
      $(":button:last", OBTr.node).append('<a href=' + OBTr.downloadUrl[0] + '>Quickly download</a>');
    });
    if (OBTr.imageUrls[0]) {      
      OBTr.addImagesHidden();
      OBTr.imageNodes.click(function() {
        OBTr.imageNodes.toggle();
      });
      OBTr.addButton(function() {
        $(":button:last", OBTr.node).text('Show/Hide Image');
        $(":button:last", OBTr.node).click(function() {
          OBTr.imageNodes.toggle();
        });
      });      
    }
    //模板字符串
    $(":button:last", OBTr.node).after( " 种子: "         + OBTr.torrrentStates[0] 
                                    // +   " 下载中："       + OBTr.torrrentStates[1] 
                                    // +   " 完成： "        + OBTr.torrrentStates[2] 
                                    +   " 大小： "        + OBTr.torrrentStates[3] 
                                    // +   " 最近活动时间： "+ OBTr.torrrentStates[4] 
      );
  });
});