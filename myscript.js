var downloadUrlRe = /plugin\.php\?id=sikemi\:download\&amp\;tid=[0-9]+/;
var imageRe = /data\/attachment\/(?:forum|album)\/.+?(?:jpg|png|jpeg)/g;

var unique = function() {
  var n = [this[0]]; //结果数组
  for (var i = 1; i < this.length; i++) //从第二项开始遍历
  {
    //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
    //那么表示第i项是重复的，忽略掉。否则存入结果数组
    if (this.indexOf(this[i]) == i) n.push(this[i]);
  }
  return n;
}

var OBTrs = [];

function tr(node) {
  this.title = "";
  this.href = "";
  this.downloadUrl = [];
  this.imageUrls = [];
  this.imageNodes = [];
  this.node = node;
  // this.ok = false;
}

tr.prototype.getTitle = function() {
  this.title = $("th > a", this.node).text();
}

tr.prototype.getHref = function() {
  this.href = $("th > a", this.node).attr('href');
}

//done（），fail（），err()
tr.prototype.analysisAjax = function(name, Re, callback) {
  (function(OBTr) {
    // 自动补全url，不需要手动设置
    $.get(OBTr.href, function(data, status) {
      if (status != "success") {
        console.log(OBTr.title + "ajax 请求失败！");
      };
      data = $("div[id^='post_'] > table:first > tbody > tr:first",data).html();
      name.forEach(function(el, index) {
        OBTr[el] = unique.call(data.match(Re[index]));;
      });

      callback(OBTr);
    })
  })(this)
}

tr.prototype.addButton = function(callback) {
  $("th", this.node).append('<button type="button"></button>');
  if (typeof callback === "function") {
    callback.call(this);
  };
}

tr.prototype.addImagesHidden =function() {
  for (var i = 0; i <= this.imageUrls.length - 1; i++) {
    $(this.node).after('<img src =" ' + this.imageUrls[i] + '" hidden = "hidden" ></img>');
  };
    var addedImageNodes = $("img:hidden",this.node.parentNode);
    this.imageNodes = addedImageNodes;
}


$("[id^='normalthread'] > tr").each(function(index, element) {
  OBTr = new tr(element);
  OBTr.getTitle();
  OBTr.getHref();
  OBTr.analysisAjax(["downloadUrl", "imageUrls"], [downloadUrlRe, imageRe], function(OBTr) {             //合并，设置的初始化方法
    OBTr.addButton(function() {
      $(":button:last", OBTr.node).append('<a href=' + OBTr.downloadUrl[0] + '>Quickly download</a>')
    });
    OBTr.addImagesHidden();
    OBTr.addButton(function() {
      $(":button:last", OBTr.node).text('Show/Hide Image');
      $(":button:last", OBTr.node).click(function() {
          OBTr.imageNodes.toggle()
      });
    })
  });
});