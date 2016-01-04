"use strict"
function tr(node) {
  this.title = '';
  this.href = '';
  this.downloadUrl = [];
  this.imageUrls = [];
  this.images = [];
  this.buttons = [];
  this.torrrentStates = [];
  this.node = node;
}

tr.prototype.getTitle = function() {
  this.title = $('th > a', this.node).text();
};

tr.prototype.getHref = function() {
  this.href = $('th > a', this.node).attr('href');
};

tr.prototype.analysisAjax = function(callback){
  let OBTr = this;
  $.get(OBTr.href, 'text').done(function(data){
    OBTr.downloadUrl = data.match(ReConfigs.downloadUrl.Re);
    OBTr.torrrentStates = data.match(ReConfigs.torrrentStates.Re);
    //去重
    OBTr.imageUrls = new Set(data.match(ReConfigs.imageUrls.Re));
    //转数组  
    OBTr.imageUrls = [...OBTr.imageUrls]      
    return callback()
  })  
}

tr.prototype.addButton = function() {  
  let addedButton = $('<button type="button"></button>').appendTo($('th', this.node))
  this.buttons.push(addedButton);         
  return addedButton
};

tr.prototype.addImagesHidden = function() {
  for (var imageUrl of this.imageUrls) {                  
    $(this.node).after(`<img src ="${imageUrl}" hidden = "hidden" ></img>`);
    // this.images = $(`<img src ="${imageUrl}" hidden = "hidden" ></img>`).insertAfter($(this.node)))
  }
  return this.images = $('img:hidden', this.node.parentNode) 
};

tr.prototype.init = function(){
  this.getTitle();
  this.getHref();        
}