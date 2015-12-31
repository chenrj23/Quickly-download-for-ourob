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
  try{
    $.get(OBTr.href, 'text').done(function(data){
      data = $('div[id^="post_"] > table:first > tbody > tr:first', data).html();
      for(let ReName in ReConfigs){
        let ReNameConfig = ReConfigs[ReName]
        if (ReNameConfig.Unique) {
          var unique =  new Set(data.match(ReNameConfig.Re));
          OBTr[ReName] = [...unique];
        }else{
          OBTr[ReName] = data.match(ReNameConfig.Re)
        }
      }
      callback(OBTr)
    })  
  }
  catch(e){
    console.log(OBTr)
  }
}

tr.prototype.addButton = function() {           
  $('th', this.node).append('<button type="button"></button>');
  var addedButton = $(':button:last', this.node);
  this.buttons.push(addedButton);
  return addedButton
};

tr.prototype.addImagesHidden = function() {
  for (var imageUrl of this.imageUrls) {                  
    $(this.node).after(`<img src ="${imageUrl}" hidden = "hidden" ></img>`);
  }
  return this.images = $('img:hidden', this.node.parentNode) 
};

tr.prototype.init = function(){
  this.getTitle();
  this.getHref();        
}