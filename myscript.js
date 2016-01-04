"use strict"

$('[id^="normalthread"] > tr').each(function(index, element) {    
  var OBTr = new tr(element);
  OBTr.init();
  OBTr.analysisAjax(function() { 
    if (0 in OBTr.downloadUrl){
      OBTr.addButton()
          .append(`<a href="${OBTr.downloadUrl[0]}">Quickly download</a>`);      
    }
    if (0 in OBTr.imageUrls) {      
      OBTr.addImagesHidden()
          .click(()=>{
                     OBTr.images.toggle();
                     });
      OBTr.addButton()
          .text('Show/Hide Image')
          .click(()=>{
                     OBTr.images.toggle();
                     });    
    }
    if(0 in OBTr.buttons){
      OBTr.buttons[OBTr.buttons.length - 1].after( ` 种子: ${OBTr.torrrentStates[0]} 大小：${OBTr.torrrentStates[3]}`); // 下载中：       OBTr.torrrentStates[1] 
    }                                                                                                                   // 完成：         OBTr.torrrentStates[2] 
  });                                                                                                                   // 最近活动时间： OBTr.torrrentStates[4] 
});                                                                                                              
                                  
