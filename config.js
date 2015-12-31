"use strict"
const downloadUrlRe = /plugin\.php\?id=sikemi\:download\&amp\;tid=[0-9]+/;
const imageRe = /data\/attachment\/(?:forum|album)\/.+?(?:jpg|png|jpeg)/g;
const torrrentStateRe = /<span style="color: red;">.+<\/span>/g;

let ReConfigs = {
  downloadUrl: {
    Re: downloadUrlRe,
    Unique: true
  },
  imageUrls: {
    Re: imageRe,
    Unique: true
  },
  torrrentStates: {
    Re: torrrentStateRe,
    Unique: false
  }
}